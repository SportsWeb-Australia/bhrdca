/* ============================================================================
 * BHRDCA Stats Worker
 * Pulls PlayHQ public-API cricket data, aggregates per-grade batting & bowling
 * leaderboards + totals, caches to KV, and serves JSON the homepage board reads.
 *
 * Output contract matches scoreboard-data.js:
 *   { grades:[{key,label}], data:{ key:{ label, totals:{runs,overs,wkts}, bat:[[name,sub,val]], bowl:[[...]] } }, meta:{...} }
 *
 * Secrets/vars (wrangler.toml + `wrangler secret put`):
 *   PLAYHQ_API_KEY   (secret)  — public API key, NEVER in the repo
 *   PHQ_TENANT       (var)     — "ca"
 *   PHQ_HOST         (var)     — "https://api.playhq.com"
 *   ORG_ID           (var)     — BHRDCA organisation UUID
 *   KV binding: STATS
 * ========================================================================== */

const DEFAULT_HOST = "https://api.playhq.com";

// tab key -> label + competition name matcher (case-insensitive substring on season.competition.name)
const TABS = [
  { key: "seniorMen",   label: "Senior Men's",   match: (n) => /senior competition/i.test(n) },
  { key: "seniorWomen", label: "Senior Women's", match: (n) => /senior women/i.test(n) },
  { key: "juniorBoys",  label: "Junior Boys",    match: (n) => /junior competition/i.test(n) },
  { key: "juniorGirls", label: "Junior Girls",   match: (n) => /junior girls/i.test(n) },
  { key: "veterans",    label: "Veterans",       match: (n) => /veteran/i.test(n) },
  { key: "t20",         label: "T20",            match: (n) => /t20/i.test(n) },
];

// FINAL games are cached forever (KV reads don't count as subrequests — only
// PlayHQ fetches do), so steady-state is tiny. ONE shared budget bounds EVERY
// PlayHQ call per run (season/grade/fixture listings + game summaries) so a cold
// run never exceeds Cloudflare's per-invocation subrequest cap (1000 on Paid).
// When the budget is spent the run stops cleanly and resumes from KV next run.
// Workers PAID plan: 900 lets a whole cold season rebuild in a single pass.
// (On the Free plan this MUST be <= ~45 — the per-invocation cap there is 50.)
const SUBREQUEST_BUDGET_PER_RUN = 900;
// how many tabs to actively backfill per run; the rest still serve from cache.
// Rotating the start point each run means every tab gets a turn at the budget.
const FETCH_CONCURRENCY = 6;
const LEADER_LIMIT = 10;

// run up to `limit` async fns at once
async function pMapLimit(items, limit, fn) {
  let i = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) { const idx = i++; await fn(items[idx]); }
  });
  await Promise.all(workers);
}

/* ---------------------------- PlayHQ client ---------------------------- */
function makeClient(env, budget) {
  const host = env.PHQ_HOST || DEFAULT_HOST;
  const headers = { "x-api-key": env.PLAYHQ_API_KEY, "x-phq-tenant": env.PHQ_TENANT || "ca" };
  async function get(path) {
    // Every network call draws from a single shared subrequest budget so a cold
    // run never exceeds Cloudflare's per-invocation cap. When exhausted we throw a
    // BUDGET sentinel; callers stop cleanly WITHOUT caching partial data, and the
    // next cron/refresh run resumes from where this one left off.
    if (budget) {
      if (budget.left <= 0) { const e = new Error("BUDGET"); e.budget = true; throw e; }
      budget.left--;
    }
    const res = await fetch(host + path, { headers });
    if (!res.ok) throw new Error(`PlayHQ ${res.status} ${path}`);
    return res.json();
  }
  get.isBudgetError = (e) => !!(e && e.budget);
  // follow cursor pagination, collecting `pick(json)` arrays
  async function getAll(path, pick) {
    let out = [], cursor = null, guard = 0;
    do {
      const sep = path.includes("?") ? "&" : "?";
      const json = await get(cursor ? `${path}${sep}cursor=${encodeURIComponent(cursor)}` : path);
      out = out.concat(pick(json) || []);
      cursor = json.metadata && json.metadata.hasMore ? json.metadata.nextCursor : null;
    } while (cursor && ++guard < 50);
    return out;
  }
  return { get, getAll };
}

/* ------------------------------ helpers -------------------------------- */
// cricket overs: "2.5" = 2 overs + 5 balls. sum precisely via balls.
const oversToBalls = (o) => { o = Number(o) || 0; const w = Math.floor(o); return w * 6 + Math.round((o - w) * 10); };
const ballsToOvers = (b) => `${Math.floor(b / 6)}.${b % 6}`;
const statMap = (arr) => { const m = {}; (arr || []).forEach((s) => { m[s.type] = Number(s.value) || 0; }); return m; };
const initials = (first, last) => `${(first || "").trim().charAt(0)}${last ? " " + last : ""}`.trim();
// "Blackburn - 1st XI" -> { club:"Blackburn", div:"1st XI" }
function splitTeam(name) {
  const parts = String(name || "").split(/\s[-–]\s/);
  return { club: (parts[0] || name || "").trim(), div: (parts[1] || "").trim() };
}

/* ---- extract per-player contributions + team totals from one game summary ---- */
function extractGame(summary) {
  const d = summary.data || {};
  const nameById = {}, teamById = {};
  (d.appearances || []).forEach((a) => { nameById[a.id] = { first: a.firstName, last: a.lastName, visible: a.visible, teamId: a.teamId }; });
  (d.teams || []).forEach((t) => { teamById[t.id] = t.name; });

  const bat = {}, bowl = {}; // profileId -> {name, club, div, runs}/{... wkts}
  let totalRuns = 0, totalBalls = 0, totalWkts = 0;

  for (const p of d.periods || []) {
    for (const tm of p.teams || []) {
      const teamName = teamById[tm.id] || "";
      const tset = statMap(tm.statistics);
      if (tm.discipline === "BATTING") {
        totalRuns += tset.TOTAL_SCORE || tset.TOTALS || 0;
        totalBalls += oversToBalls(tset.TOTAL_OVERS);
      }
      for (const ap of tm.appearances || []) {
        const meta = nameById[ap.id] || {};
        if (meta.visible === false || !meta.first) continue; // can't name hidden players
        const st = statMap(ap.statistics);
        const { club, div } = splitTeam(teamName);
        const nm = initials(meta.first, meta.last);
        if (tm.discipline === "BATTING" && ("TOTAL_RUNS" in st)) {
          const e = (bat[ap.id] ||= { name: nm, club, div, runs: 0 });
          e.runs += st.TOTAL_RUNS;
        }
        if (tm.discipline === "BOWLING" && ("WICKETS" in st)) {
          const e = (bowl[ap.id] ||= { name: nm, club, div, wkts: 0 });
          e.wkts += st.WICKETS || 0;
          totalWkts += st.WICKETS || 0;
        }
      }
    }
  }
  return { bat: Object.values(bat), bowl: Object.values(bowl), totals: { runs: totalRuns, balls: totalBalls, wkts: totalWkts } };
}

// listing rarely changes; cache it so each run isn't dominated by slow PlayHQ
// list calls. Completed seasons are static; live-season lag ≤ TTL (acceptable).
// Listings (seasons, grades, fixture lists, resolved season) are cached this long
// so warm runs spend their whole subrequest budget on game summaries, not re-listing.
// Long is safe for completed seasons; shorten when a LIVE season needs fresh results.
const LIST_TTL = 21600; // 6 hours

/* ------------- resolve the active season per competition --------------- */
// newest season with >=1 FINAL game, else newest COMPLETED (last-season-first).
async function resolveSeason(phq, env, seasons, tab) {
  const ck = `season:${tab.key}`;
  const cached = await env.STATS.get(ck, "json");
  if (cached) return cached;
  const mine = seasons
    .filter((s) => tab.match(s.competition ? s.competition.name : ""))
    .sort((a, b) => String(b.name).localeCompare(String(a.name))); // "Summer 2026/27" > "2025/26"
  let chosen = null;
  for (const s of mine) {
    if (s.status === "COMPLETED") { chosen = s; break; }     // completed always has finals
    const grades = await phq.getAll(`/v1/seasons/${s.id}/grades`, (j) => j.data);
    let hasFinal = false;
    for (const g of grades.slice(0, 3)) {
      let fx = null;
      try { fx = await phq.get(`/v2/grades/${g.id}/games`); }
      catch (e) { if (phq.get.isBudgetError(e)) throw e; }  // budget: abort tab, resume next run
      if (fx && (fx.rounds || []).some((r) => (r.games || []).some((gm) => gm.status === "FINAL"))) { hasFinal = true; break; }
    }
    if (hasFinal) { chosen = s; break; }
  }
  chosen = chosen || mine[0] || null;
  if (chosen) await env.STATS.put(ck, JSON.stringify({ id: chosen.id, name: chosen.name, status: chosen.status }), { expirationTtl: LIST_TTL });
  return chosen;
}

async function gradesForSeason(phq, env, seasonId) {
  const ck = `grades:${seasonId}`;
  const hit = await env.STATS.get(ck, "json");
  if (hit) return hit;
  const g = await phq.getAll(`/v1/seasons/${seasonId}/grades`, (j) => j.data);
  await env.STATS.put(ck, JSON.stringify(g), { expirationTtl: LIST_TTL });
  return g;
}

// returns { ids:[FINAL game ids], lastRound:"Round N" } for a grade (cached)
async function finalGames(phq, env, gradeId) {
  const ck = `gids2:${gradeId}`;
  const hit = await env.STATS.get(ck, "json");
  if (hit) return hit;
  const ids = []; let lastRound = null;
  // let a BUDGET error propagate so we never cache a partial fixture list
  const fx = await phq.get(`/v2/grades/${gradeId}/games`);
  for (const r of fx.rounds || []) {            // rounds are in order
    let any = false;
    for (const gm of r.games || []) if (gm.status === "FINAL") { ids.push(gm.id); any = true; }
    if (any) lastRound = r.name || lastRound;    // keep the latest round with a FINAL game
  }
  const val = { ids, lastRound };
  await env.STATS.put(ck, JSON.stringify(val), { expirationTtl: LIST_TTL });
  return val;
}
const roundNum = (n) => { const m = String(n || "").match(/(\d+)/); return m ? +m[1] : 0; };

/* ------------------------- build one grade group ----------------------- */
async function buildTab(phq, env, tab, seasons, budget) {
  const season = await resolveSeason(phq, env, seasons, tab);
  if (!season) return null;

  const grades = await gradesForSeason(phq, env, season.id);

  // FINAL game ids + latest round per grade (cached) — listing fetched in parallel.
  // If the shared budget runs out mid-listing, that grade is simply skipped this
  // run (its fixtures list is cached once fetched); the tab still surfaces with the
  // grades we DID list, and the rest fill in on the next cron/refresh run.
  const fgs = new Array(grades.length);
  await pMapLimit(grades.map((g, i) => ({ g, i })), FETCH_CONCURRENCY, async ({ g, i }) => {
    try { fgs[i] = await finalGames(phq, env, g.id); }
    catch { fgs[i] = null; }
  });
  const gameIds = [];
  let latestRound = null;
  for (const fg of fgs) {
    if (!fg) continue;
    gameIds.push(...fg.ids);
    if (fg.lastRound && roundNum(fg.lastRound) > roundNum(latestRound)) latestRound = fg.lastRound;
  }
  // only surface a round for a live/upcoming season, not a finished one
  const roundName = /completed/i.test(season.status || "") ? null : latestRound;

  // read existing game caches in parallel (KV reads are not subrequests)
  const cache = {};
  await pMapLimit(gameIds, 16, async (id) => { cache[id] = await env.STATS.get(`game:${id}`, "json"); });
  // fetch summaries not yet cached, in parallel, bounded by the shared budget
  // (the client decrements it per call, so slice to what's left as an upper bound)
  const toFetch = gameIds.filter((id) => !cache[id]).slice(0, Math.max(0, budget.left));
  await pMapLimit(toFetch, FETCH_CONCURRENCY, async (id) => {
    let sum = null;
    try { sum = await phq.get(`/v2/games/${id}/summary`); }
    catch (e) { if (phq.get.isBudgetError(e)) return; /* out of budget: resume next run */ }
    if (sum) { const ex = extractGame(sum); cache[id] = ex; await env.STATS.put(`game:${id}`, JSON.stringify(ex)); } // FINAL games are immutable
  });

  // aggregate from the in-memory cache map
  const batAgg = {}, bowlAgg = {};
  let runs = 0, balls = 0, wkts = 0;
  for (const gid of gameIds) {
    const ex = cache[gid];
    if (!ex) continue;
    runs += ex.totals.runs; balls += ex.totals.balls; wkts += ex.totals.wkts;
    for (const b of ex.bat)  { const k = b.name + "|" + b.club; (batAgg[k]  ||= { ...b, runs: 0 }).runs += b.runs; }
    for (const b of ex.bowl) { const k = b.name + "|" + b.club; (bowlAgg[k] ||= { ...b, wkts: 0 }).wkts += b.wkts; }
  }

  const topBat = Object.values(batAgg).sort((a, b) => b.runs - a.runs).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.div ? `${p.club} · ${p.div}` : p.club, String(p.runs)]);
  const topBowl = Object.values(bowlAgg).sort((a, b) => b.wkts - a.wkts).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.div ? `${p.club} · ${p.div}` : p.club, String(p.wkts)]);

  return {
    label: tab.label,
    seasonName: season.name,
    roundName: roundName,
    totals: { runs: runs.toLocaleString("en-US"), overs: ballsToOvers(balls), wkts: String(wkts) },
    totalsRaw: { runs, balls, wkts },                  // for the combined "All Grades" tab
    bat: topBat,
    bowl: topBowl,
    batAgg: Object.values(batAgg),                     // full per-player aggregates
    bowlAgg: Object.values(bowlAgg),                   // (merged across comps for "All")
  };
}

// build the association-wide "All Grades" tab by merging every competition's full
// per-player aggregates (a player who bats in Seniors + T20 has their runs summed)
function buildAllTab(built) {
  const allBat = {}, allBowl = {};
  let runs = 0, balls = 0, wkts = 0, seasonName = null;
  for (const b of built) {
    seasonName = seasonName || b.seasonName;
    runs += b.totalsRaw.runs; balls += b.totalsRaw.balls; wkts += b.totalsRaw.wkts;
    for (const p of b.batAgg)  { const k = p.name + "|" + p.club; (allBat[k]  ||= { name: p.name, club: p.club, runs: 0 }).runs += p.runs; }
    for (const p of b.bowlAgg) { const k = p.name + "|" + p.club; (allBowl[k] ||= { name: p.name, club: p.club, wkts: 0 }).wkts += p.wkts; }
  }
  const topBat = Object.values(allBat).sort((a, b) => b.runs - a.runs).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.club, String(p.runs)]);   // club only (spans formats — no single division)
  const topBowl = Object.values(allBowl).sort((a, b) => b.wkts - a.wkts).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.club, String(p.wkts)]);
  return {
    label: "All Grades", seasonName, roundName: null,
    totals: { runs: runs.toLocaleString("en-US"), overs: ballsToOvers(balls), wkts: String(wkts) },
    bat: topBat, bowl: topBowl,
  };
}

/* ----------------------------- aggregate ------------------------------- */
async function aggregate(env) {
  // ONE shared subrequest budget for the whole run (see SUBREQUEST_BUDGET_PER_RUN)
  const budget = { left: SUBREQUEST_BUDGET_PER_RUN };
  const phq = makeClient(env, budget);
  let seasons = await env.STATS.get("seasons:all", "json");
  if (!seasons) {
    seasons = await phq.getAll(`/v1/organisations/${env.ORG_ID}/seasons`, (j) => j.data);
    await env.STATS.put("seasons:all", JSON.stringify(seasons), { expirationTtl: LIST_TTL });
  }
  // seed from the previous board so a partial run never wipes finished tabs
  const prev = (await env.STATS.get("board:current", "json")) || { grades: [], data: {} };
  const data = { ...(prev.data || {}) };
  const seen = {};
  // rotate which tab is processed first each run, so the shared budget doesn't
  // always get spent on the same early tabs — every tab gets its turn to backfill.
  const rot = ((await env.STATS.get("rot", "text")) | 0) % TABS.length;
  await env.STATS.put("rot", String((rot + 1) % TABS.length));
  const order = TABS.slice(rot).concat(TABS.slice(0, rot));
  const builtFull = [];
  for (const tab of order) {
    const built = await buildTab(phq, env, tab, seasons, budget).catch((e) => (phq.get.isBudgetError(e) ? "BUDGET" : null));
    if (built === "BUDGET") continue;   // out of budget: this tab resumes next run
    if (!built || (!built.bat.length && !built.bowl.length)) continue;
    seen[tab.key] = true;
    data[tab.key] = { label: tab.label, seasonName: built.seasonName, roundName: built.roundName, totals: built.totals, bat: built.bat, bowl: built.bowl };
    builtFull.push(built);
  }
  // Combined "All Grades" tab — merges every competition's full aggregates. Only
  // (re)build it when every competition present on the board was rebuilt this run,
  // so a partial (budget-limited) run never overwrites it with undercounted totals.
  const rebuiltEvery = TABS.filter((t) => data[t.key]).every((t) => seen[t.key]);
  if (builtFull.length && rebuiltEvery) data.all = buildAllTab(builtFull);
  // one write per run (Paid budget rebuilds every tab in a single pass, so the
  // tab-by-tab progressive writes are no longer needed — keeps KV writes minimal)
  const grades = [];
  if (data.all) grades.push({ key: "all", label: "All Grades" });   // association-wide, shown first
  TABS.forEach((t) => { if (data[t.key]) grades.push({ key: t.key, label: t.label }); });
  const board = { grades, data, meta: { updatedAt: new Date().toISOString(), source: "playhq", live: false } };
  await env.STATS.put("board:current", JSON.stringify(board));
  return board;
}

import { pushToSw1 } from "./sw1-push.js";

/* ------------------------------ handlers ------------------------------- */
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Cache-Control": "public, max-age=120" };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (url.pathname === "/health") {
      // The push is additive and can fail on its own; say so here rather than
      // letting a stuck queue be invisible.
      const [pending, stuck] = await Promise.all([
        env.STATS.get("sw1push:pending", "json"),
        env.STATS.get("sw1push:stuck", "json"),
      ]);
      return json({
        ok: true,
        sw1Push: {
          enabled: env.SW1_PUSH_ENABLED === "true",
          pendingRetry: pending ? { attempts: pending.attempts, lastError: pending.last_error } : null,
          gaveUp: stuck || null,
        },
      }, env);
    }

    // Manual, bounded push. Runs the same code the cron runs, so what is tested
    // by hand is what runs unattended.
    if (url.pathname === "/sw1-push") {
      const budget = { left: SUBREQUEST_BUDGET_PER_RUN };
      const out = await pushToSw1(env, makeClient(env, budget), budget).catch((e) => ({ error: String(e.message) }));
      return json(out, env);
    }

    if (url.pathname === "/scoreboard") {
      // ?refresh=1 runs a bounded rebuild inline (backfills a batch of new games,
      // writing tabs progressively). Call repeatedly to backfill fully.
      if (url.searchParams.get("refresh") === "1") {
        const board = await aggregate(env).catch((e) => ({ error: String(e) }));
        return json(board, env);
      }
      const cached = await env.STATS.get("board:current", "json");
      return json(cached || { grades: [], data: {}, meta: { empty: true } }, env);
    }
    return json({ error: "not_found", routes: ["/scoreboard", "/scoreboard?refresh=1", "/health", "/sw1-push"] }, env, 404);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil((async () => {
      // The board first, and on its own. Whatever happens after this point,
      // the leaderboard has already been built and saved exactly as before.
      await aggregate(env);

      // Then, and only then, the SportsWeb push -- with the budget that is
      // left, inside its own catch. It cannot delay, starve or break the board.
      try {
        const budget = { left: Math.max(0, Math.floor(SUBREQUEST_BUDGET_PER_RUN / 3)) };
        const out = await pushToSw1(env, makeClient(env, budget), budget);
        if (out && !out.skipped) console.log("sw1 push", JSON.stringify(out));
      } catch (err) {
        console.error("sw1 push threw", err && err.message);
      }
    })());
  },
};

function json(obj, _env, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS } });
}
