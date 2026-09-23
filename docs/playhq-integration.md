# BHRDCA × PlayHQ — Stats & Scoreboard Integration

Status: **Public API key issued and validated** (2026‑09). Leaderboards/fixtures/results/ladders
confirmed working against real BHRDCA data. Live in‑play scores are the one open item (see below).

---

## 1. Credentials & access

- **Tier:** Public API (read‑only, honours PlayHQ visibility settings — hidden grades/teams/
  participants are omitted; hidden players return with `firstName`/`lastName` null and `visible:false`).
- **Host (AU/NZ):** `https://api.playhq.com`  (UAT, if granted: `https://api.uat.playhq.com`)
- **Headers on every request:** `x-api-key: <KEY>` and `x-phq-tenant: ca`
- **BHRDCA Organisation ID:** `f8c1124c-c0cd-4b6f-b513-0e2c1340978b`
- **API key:** **NOT stored in this repo.** It lives only as a Worker secret named `PLAYHQ_API_KEY`
  (`npx wrangler secret put PLAYHQ_API_KEY`). Never put it in client‑side JS or commit it.
  (If the key issued over email needs rotating, ask PlayHQ support.)

Only endpoints **without** an `Authorization: Bearer` requirement work with this key. Anything under
`/partner/*` or needing a JWT is the **partner tier** (not us).

---

## 2. Verified data pipeline (all public, all returned 200 against our data)

```
GET /v1/organisations/{ORG}/seasons          → seasons (grouped by competition)
GET /v1/seasons/{seasonId}/grades            → grades in a season
GET /v2/grades/{gradeId}/games               → fixture incl. game IDs + statuses + teams   (v2 = cricket)
GET /v2/games/{gameId}/summary               → per-player batting & bowling scorecard       (v2 = cricket)
GET /v2/grades/{gradeId}/ladder              → ladder/standings                             (v2 = cricket)
```

Pagination is cursor-based: when `metadata.hasMore` is true, repeat with `?cursor=<metadata.nextCursor>`
until false. Page size ≤ 100.

**Leaderboards are computed by us** from `/v2/games/{id}/summary` — there is **no** pre-aggregated
cricket leaderboard endpoint (`Player Stats by Grade V1` is "non-cricket sports only", confirmed by
PlayHQ). Batting stats per appearance include `TOTAL_RUNS`, `BALLS_FACED`, `FOURS`, `SIXES`,
`STRIKE_RATE`; bowling includes `WICKETS`, `OVERS`, `RUNS`, `ECONOMY`, `MAIDENS`, `WIDES`, `NO_BALLS`.

### Real IDs captured during validation (Summer seasons)
| Competition (tab)              | 2026/27 season (UPCOMING)              | 2025/26 season (COMPLETED)            |
|--------------------------------|----------------------------------------|----------------------------------------|
| Senior Competition (Sr Men)    | `77fbfe27-2d48-43c9-ad80-87d06ffc72db` | `96c2bfd6-67a9-40b7-8546-58612ff1671d` |
| Senior Women                   | `2b81babd-d546-4688-a54f-5c7cf0a4ccbb` | —                                      |
| Junior Competition (Jr Boys)   | `383bad37-cd1d-4ecc-a154-c897f4e47c5f` | `efa283cd-b4b9-4758-be87-5b5f1fb74b0f` |
| Junior Girls                   | `dc6ca9e3-745b-40ab-be93-e8834795be50` | —                                      |
| T20 Competition                | (see seasons call)                     | `355ee9c2-2f2f-47ae-b827-77635522801c` |

Season/grade IDs are **not** hardcoded in the Worker — it resolves them each run from the seasons
call (IDs above are for reference/debugging only).

Sample verified scorecard (2025/26 Senior, a FINAL game): batter *Mitch Fitton 4 (14)*, bowler
*Matthew Herschell 1/28 off 11* — real names, `visible:true`.

---

## 3. "Last season first, then switch at round 1"

Per competition, the Worker resolves the **active** season:
- Take the newest season for that competition. If it has **≥1 `FINAL` game**, use it.
- Otherwise fall back to the previous **COMPLETED** season.

So right now (all 2026/27 games `UPCOMING`) the board shows **2025/26** stats; each grade flips to
2026/27 automatically once its round‑1 games are scored `FINAL`. No manual switch.

---

## 4. Live scores ticker — open item

Evidence says **true in‑play live scores are the partner/webhook tier, not the public key**:
- Public game summary is documented "pre and post game" (not *during*).
- The public games list exposes only `PENDING / UPCOMING / FINAL / CANCELLED / ABANDONED` — no
  `IN_PROGRESS`. `IN_PROGRESS` + ball‑by‑ball live only appear in **webhooks**
  (`LIVE_GAME.SCORECARD_UPDATED`, "Live Scoreboard Integration"), which need partner onboarding.

**Plan:**
1. **Now (public key):** ticker = latest `FINAL` results + upcoming fixtures, refreshed every few
   minutes. Looks live, no extra approval.
2. **True in‑play live:** needs the PlayHQ **partner webhook**. Follow‑up sent to PlayHQ; also
   test empirically at season start (Oct) — if the public summary updates in‑play we can poll for
   near‑live and skip the partner requirement for the ticker.

---

## 5. Refresh frequency & limits

- **Rate limits: TBC** — not in the OpenAPI spec or support article; follow‑up question sent to
  PlayHQ. Until confirmed, stay conservative.
- Aggregation runs **server‑side on a Cron**, writes computed JSON to **KV**; the site reads only
  the KV blob (visitor traffic → zero PlayHQ calls).
- FINAL game summaries are immutable → each game is fetched **once** and cached in KV
  (`game:{id}`), so steady‑state each run only fetches newly‑finalised games. A per‑run fetch
  budget keeps us inside Worker subrequest limits; the first runs backfill.
- Suggested cadence: every ~10–15 min during match windows (Fri night juniors, Sat/Sun mornings,
  midweek T20), hourly/daily off‑season. Tune once PlayHQ confirms limits.

---

## 6. Where the code lives

- `workers/bhrdca-stats/` — the Cloudflare Worker (scheduled aggregation + JSON API). See its
  `README.md` for deploy steps.
- Output contract matches `scoreboard-data.js` (`{ grades, data, meta }`) so the homepage board
  renders live data with no template change; if the Worker URL is unset/unreachable the board
  falls back to the bundled demo data.
