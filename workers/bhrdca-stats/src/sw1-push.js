/* Push normalised PlayHQ facts into SportsWeb One.
   ----------------------------------------------------------------------------
   THIS FILE IS ADDITIVE. It does not import, wrap or modify anything the
   leaderboard uses. index.js calls it once, at the END of the scheduled run,
   after `board:current` has already been written, inside its own try/catch and
   with whatever request budget is left over. With SW1_PUSH_ENABLED unset, none
   of it runs and the Worker behaves exactly as it did before.

   The Worker holds no Supabase credential. It holds one signing secret, and the
   signature is what the endpoint trusts:

       HMAC-SHA256(secret, `${timestamp}.${nonce}.${body}`)

   It also never says which SportsWeb club the data belongs to -- it sends
   PlayHQ's organisation id and lets SW1 resolve the tenant. A Worker that could
   name the tenant is a Worker that could write into the wrong one.

   Retry lives here, not in SW1: a failed push is kept in KV with an attempt
   count and retried on the next cron, backing off, capped. A push that fails
   forever is visible at /health rather than silently dropped.

   Secrets / vars:
     SW1_PUSH_ENABLED      "true" to switch it on. Absent = off.
     SW1_INGEST_URL        the endpoint
     PLAYHQ_INGEST_SECRET  the shared signing secret
     SW1_PUSH_GRADE_LIMIT  how many grades per run (default 2, small on purpose)
*/

const SCHEMA_VERSION = 1;
const WORKER_VERSION = 'bhrdca-stats@2026-09-23';
const PENDING_KEY = 'sw1push:pending';
const MAX_ATTEMPTS = 8;

const hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');

async function sign(secret, timestamp, nonce, body) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${nonce}.${body}`)));
}

async function post(env, payload) {
  const body = JSON.stringify(payload);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomUUID();
  const signature = await sign(env.PLAYHQ_INGEST_SECRET, timestamp, nonce, body);

  const res = await fetch(env.SW1_INGEST_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-playhq-timestamp': timestamp,
      'x-playhq-nonce': nonce,
      'x-playhq-signature': `v1=${signature}`,
    },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`SW1 ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}

/* Normalise PlayHQ's shapes into the contract SW1 speaks. Nothing is invented
   here: a field PlayHQ does not give us is absent, not guessed.

   Written against the real responses, not against an assumption. A fixture is
   `{ rounds, teams, playingSurfaces }`: team NAMES live at the top level, not on
   the game, and a game carries only team ids, a schedule entry and its innings.
   The first version of this file guessed `game.home.team.name` and quietly
   imported 41 games with no team, no score and no date -- which is exactly the
   failure mode the review queue and these counts exist to surface. */

const statsOf = (holder) => {
  const out = {};
  ((holder && holder.statistics) || []).forEach((s) => { out[s.type] = Number(s.value); });
  return out;
};

/** Runs, wickets and overs per team, summed across innings. */
function inningsTotals(game) {
  const totals = {};
  for (const period of game.periods || []) {
    for (const team of period.teams || []) {
      if (team.discipline !== 'BATTING') continue;
      const st = statsOf(team.outcome);
      const cur = totals[team.id] || (totals[team.id] = { runs: 0, wickets: 0, overs: null });
      cur.runs += st.TOTAL_SCORE ?? st.TOTALS ?? 0;
      cur.wickets += st.TOTAL_OUTS ?? 0;
      if (st.TOTAL_OVERS != null) cur.overs = String(st.TOTAL_OVERS);
    }
  }
  return totals;
}

function normaliseGame(game, gradeId, teamNames, surfaces) {
  const totals = inningsTotals(game);
  const side = (isHome) => {
    const entry = (game.teams || []).find((t) => Boolean(t.isHomeTeam) === isHome);
    if (!entry) return {};
    const score = totals[entry.id] || {};
    return {
      team_id: entry.id,
      name: teamNames[entry.id] || null,
      runs: score.runs ?? null,
      wickets: score.wickets ?? null,
      overs: score.overs ?? null,
    };
  };
  const home = side(true);
  const away = side(false);
  const winner = (game.teams || []).find((t) => t.outcome === 'WON');
  const slot = (game.schedule || [])[0] || {};
  return {
    id: game.id,
    grade_id: gradeId,
    round: null,
    status: game.status,
    scheduled_at: slot.dateTime || null,
    venue: surfaces[slot.playingSurfaceId] || null,
    home,
    away,
    result_summary: winner && teamNames[winner.id] ? `${teamNames[winner.id]} won` : null,
    source_updated_at: game.updatedAt || null,
  };
}

export async function pushToSw1(env, phq, budget, log = console) {
  if (env.SW1_PUSH_ENABLED !== 'true') return { skipped: 'disabled' };
  if (!env.SW1_INGEST_URL || !env.PLAYHQ_INGEST_SECRET) return { skipped: 'not configured' };

  // A push that failed earlier goes first: order matters less than not losing it.
  const pending = await env.STATS.get(PENDING_KEY, 'json');
  if (pending) {
    try {
      const out = await post(env, pending.payload);
      await env.STATS.delete(PENDING_KEY);
      return { retried: true, attempts: pending.attempts, result: out };
    } catch (err) {
      const attempts = (pending.attempts || 1) + 1;
      if (attempts <= MAX_ATTEMPTS) {
        await env.STATS.put(PENDING_KEY, JSON.stringify({ ...pending, attempts, last_error: String(err.message) }));
        return { retryFailed: true, attempts, error: String(err.message) };
      }
      // Kept, not dropped: /health reports it and a person decides.
      await env.STATS.put('sw1push:stuck', JSON.stringify({ at: new Date().toISOString(), attempts, error: String(err.message) }));
      await env.STATS.delete(PENDING_KEY);
      return { gaveUp: true, attempts, error: String(err.message) };
    }
  }

  const seasons = await env.STATS.get('seasons:all', 'json');
  if (!seasons) return { skipped: 'no season list cached yet' };

  const gradeLimit = Number(env.SW1_PUSH_GRADE_LIMIT || 2);
  const data = { seasons: [], grades: [], teams: [], games: [], scorecards: [], ladders: [] };
  let complete = true;
  let incompleteReason = null;

  try {
    // Completed seasons first: their scorecards are final, which is what a
    // match report needs. An upcoming season has nothing to report on yet.
    const ordered = [...seasons].sort((a, b) => (a.status === 'COMPLETED' ? -1 : 1));
    const season = ordered[0];
    if (!season) return { skipped: 'no seasons' };

    data.seasons.push({
      id: season.id,
      name: season.name,
      competition: season.competition ? season.competition.name : null,
      status: season.status,
    });

    const grades = await phq.getAll(`/v1/seasons/${season.id}/grades`, (j) => j.data);
    for (const grade of grades.slice(0, gradeLimit)) {
      data.grades.push({ id: grade.id, season_id: season.id, name: grade.name });

      const fixture = await phq.get(`/v2/grades/${grade.id}/games`);
      const teamNames = {};
      (fixture.teams || []).forEach((t) => { teamNames[t.id] = t.name; });
      const surfaces = {};
      (fixture.playingSurfaces || []).forEach((p) => { surfaces[p.id] = p.name; });

      Object.entries(teamNames).forEach(([id, name]) => {
        data.teams.push({ id, grade_id: grade.id, name });
      });

      for (const round of fixture.rounds || []) {
        for (const game of round.games || []) {
          const normalised = normaliseGame(game, grade.id, teamNames, surfaces);
          normalised.round = round.name || null;
          data.games.push(normalised);
        }
      }

      try {
        /* A ladder is `{ ladders: [ { headers, standings } ] }`, and a standing
           is `{ team, values: [...] }` -- the values are positional, and the
           headers say what each position means. Read by name, never by index:
           a competition that counts byes differently would otherwise silently
           file "byes" as "points". */
        const ladder = await phq.get(`/v2/grades/${grade.id}/ladder`);
        const table = (ladder.ladders || [])[0];
        const rows = (table && table.standings) || [];
        if (rows.length) {
          const at = {};
          ((table && table.headers) || []).forEach((h, i) => { at[h.key] = i; });
          const val = (r, key) => (at[key] == null ? null : r.values[at[key]] ?? null);
          data.ladders.push({
            grade_id: grade.id,
            rows: rows.map((r, i) => ({
              position: i + 1,
              team_id: r.team && r.team.id,
              team_name: r.team && r.team.name,
              played: val(r, 'played'), won: val(r, 'won'), lost: val(r, 'lost'),
              drawn: val(r, 'drawn'),
              points: val(r, 'competitionPoints'),
              percentage: val(r, 'quotient'),
            })),
          });
        }
      } catch (err) {
        // A ladder failing must not cost us the games we already have.
        complete = false;
        incompleteReason = `ladder ${grade.id}: ${err.message}`;
      }

      const finals = data.games.filter((g) => g.grade_id === grade.id && g.status === 'FINAL').slice(0, 4);
      for (const game of finals) {
        const summary = await phq.get(`/v2/games/${game.id}/summary`);
        const d = summary.data || {};
        const nameById = {};
        (d.appearances || []).forEach((a) => { nameById[a.id] = a; });
        const appearances = [];
        for (const period of d.periods || []) {
          for (const team of period.teams || []) {
            for (const ap of team.appearances || []) {
              const who = nameById[ap.id] || {};
              if (who.visible === false || !who.firstName) continue;   // hidden players are not stored
              const stats = {};
              (ap.statistics || []).forEach((s) => { stats[s.type] = Number(s.value) || 0; });
              const entry = appearances.find((x) => x.id === ap.id) || { id: ap.id, team_id: team.id, name: `${who.firstName} ${who.lastName || ''}`.trim(), visible: true };
              if (team.discipline === 'BATTING' && 'TOTAL_RUNS' in stats) {
                entry.batting = { runs: stats.TOTAL_RUNS, balls: stats.BALLS_FACED ?? null, fours: stats.FOURS ?? null, sixes: stats.SIXES ?? null };
              }
              if (team.discipline === 'BOWLING' && 'WICKETS' in stats) {
                entry.bowling = { wickets: stats.WICKETS, runs: stats.RUNS ?? null, overs: stats.OVERS != null ? String(stats.OVERS) : null, maidens: stats.MAIDENS ?? null };
              }
              if (!appearances.includes(entry)) appearances.push(entry);
            }
          }
        }
        if (appearances.length) data.scorecards.push({ game_id: game.id, appearances });
      }
    }
  } catch (err) {
    // Out of budget, or PlayHQ refused. Send what we have and SAY it is partial:
    // SW1 will then only insert and update, and will never read the gap as a
    // deletion.
    complete = false;
    incompleteReason = String(err.message);
  }

  // De-duplicate teams; the fixture repeats them on every game.
  const seen = new Set();
  data.teams = data.teams.filter((t) => t.id && !seen.has(t.id) && seen.add(t.id));

  const payload = {
    schema_version: SCHEMA_VERSION,
    org_id: env.ORG_ID,
    worker_version: WORKER_VERSION,
    generated_at: new Date().toISOString(),
    window: { complete, reason: incompleteReason },
    data,
  };

  try {
    const out = await post(env, payload);
    return { pushed: true, complete, counts: out.applied, run_id: out.run_id, review_items: out.review_items };
  } catch (err) {
    await env.STATS.put(PENDING_KEY, JSON.stringify({ payload, attempts: 1, last_error: String(err.message) }));
    log.error('sw1 push failed, queued for retry', err.message);
    return { queued: true, error: String(err.message) };
  }
}

