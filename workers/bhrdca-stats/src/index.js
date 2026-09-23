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

// Keep each scheduled run inside Worker subrequest/CPU limits. FINAL games are
// cached forever, so the first few runs backfill and steady-state is small.
const MAX_GAME_FETCHES_PER_RUN = 40;
const LEADER_LIMIT = 10;

/* ---------------------------- PlayHQ client ---------------------------- */
function makeClient(env) {
  const host = env.PHQ_HOST || DEFAULT_HOST;
  const headers = { "x-api-key": env.PLAYHQ_API_KEY, "x-phq-tenant": env.PHQ_TENANT || "ca" };
  async function get(path) {
    const res = await fetch(host + path, { headers });
    if (!res.ok) throw new Error(`PlayHQ ${res.status} ${path}`);
    return res.json();
  }
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

/* ------------- resolve the active season per competition --------------- */
// newest season with >=1 FINAL game, else newest COMPLETED (last-season-first).
async function resolveSeason(phq, seasons, tab) {
  const mine = seasons
    .filter((s) => tab.match(s.competition ? s.competition.name : ""))
    .sort((a, b) => String(b.name).localeCompare(String(a.name))); // "Summer 2026/27" > "2025/26"
  for (const s of mine) {
    if (s.status === "COMPLETED") return s;                 // completed always has finals
    // UPCOMING/ACTIVE: only use it once round 1 is FINAL
    const grades = await phq.getAll(`/v1/seasons/${s.id}/grades`, (j) => j.data);
    for (const g of grades.slice(0, 3)) {
      const fx = await phq.get(`/v2/grades/${g.id}/games`).catch(() => null);
      const hasFinal = fx && (fx.rounds || []).some((r) => (r.games || []).some((gm) => gm.status === "FINAL"));
      if (hasFinal) return s;
    }
  }
  return mine[0] || null;
}

/* ------------------------- build one grade group ----------------------- */
async function buildTab(phq, env, tab, seasons, budget) {
  const season = await resolveSeason(phq, seasons, tab);
  if (!season) return null;

  const grades = await phq.getAll(`/v1/seasons/${season.id}/grades`, (j) => j.data);
  const batAgg = {}, bowlAgg = {};
  let runs = 0, balls = 0, wkts = 0;

  for (const g of grades) {
    let fx;
    try { fx = await phq.get(`/v2/grades/${g.id}/games`); } catch { continue; }
    const finals = [];
    for (const r of fx.rounds || []) for (const gm of r.games || []) if (gm.status === "FINAL") finals.push(gm.id);

    for (const gid of finals) {
      const cacheKey = `game:${gid}`;
      let ex = await env.STATS.get(cacheKey, "json");
      if (!ex) {
        if (budget.left <= 0) continue;                     // stay within per-run budget; backfill next run
        budget.left--;
        const sum = await phq.get(`/v2/games/${gid}/summary`).catch(() => null);
        if (!sum) continue;
        ex = extractGame(sum);
        await env.STATS.put(cacheKey, JSON.stringify(ex));  // FINAL games are immutable
      }
      runs += ex.totals.runs; balls += ex.totals.balls; wkts += ex.totals.wkts;
      for (const b of ex.bat)  { const k = b.name + "|" + b.club; (batAgg[k]  ||= { ...b, runs: 0 }).runs += b.runs; }
      for (const b of ex.bowl) { const k = b.name + "|" + b.club; (bowlAgg[k] ||= { ...b, wkts: 0 }).wkts += b.wkts; }
    }
  }

  const topBat = Object.values(batAgg).sort((a, b) => b.runs - a.runs).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.div ? `${p.club} · ${p.div}` : p.club, String(p.runs)]);
  const topBowl = Object.values(bowlAgg).sort((a, b) => b.wkts - a.wkts).slice(0, LEADER_LIMIT)
    .map((p) => [p.name, p.div ? `${p.club} · ${p.div}` : p.club, String(p.wkts)]);

  return {
    label: `${tab.label}${/completed/i.test(season.status) ? "" : ""}`,
    seasonName: season.name,
    totals: { runs: runs.toLocaleString("en-US"), overs: ballsToOvers(balls), wkts: String(wkts) },
    bat: topBat,
    bowl: topBowl,
  };
}

/* ----------------------------- aggregate ------------------------------- */
async function aggregate(env) {
  const phq = makeClient(env);
  const seasons = await phq.getAll(`/v1/organisations/${env.ORG_ID}/seasons`, (j) => j.data);
  const budget = { left: MAX_GAME_FETCHES_PER_RUN };

  const data = {}, grades = [];
  for (const tab of TABS) {
    const built = await buildTab(phq, env, tab, seasons, budget).catch(() => null);
    if (!built || (!built.bat.length && !built.bowl.length)) continue;
    grades.push({ key: tab.key, label: tab.label });
    data[tab.key] = { label: tab.label, seasonName: built.seasonName, totals: built.totals, bat: built.bat, bowl: built.bowl };
  }
  const board = { grades, data, meta: { updatedAt: new Date().toISOString(), source: "playhq", live: false } };
  await env.STATS.put("board:current", JSON.stringify(board));
  return board;
}

/* ------------------------------ handlers ------------------------------- */
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Cache-Control": "public, max-age=120" };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (url.pathname === "/health") return json({ ok: true }, env);

    if (url.pathname === "/scoreboard") {
      // ?refresh=1 forces a rebuild (guard with a token in prod if you like)
      if (url.searchParams.get("refresh") === "1") {
        const board = await aggregate(env).catch((e) => ({ error: String(e) }));
        return json(board, env);
      }
      const cached = await env.STATS.get("board:current", "json");
      return json(cached || { grades: [], data: {}, meta: { empty: true } }, env);
    }
    return json({ error: "not_found", routes: ["/scoreboard", "/scoreboard?refresh=1", "/health"] }, env, 404);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(aggregate(env));
  },
};

function json(obj, _env, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...CORS } });
}
