# bhrdca-stats — PlayHQ → Scoreboard Worker

Scheduled Cloudflare Worker that aggregates BHRDCA cricket stats from the PlayHQ **public** API and
serves JSON the homepage board reads. See `../../docs/playhq-integration.md` for the full design.

## What it does
- On a cron, resolves the active season per competition (**last season until round 1 of the new one
  is FINAL**, then auto-switches), lists grades → FINAL games, and aggregates per-player batting &
  bowling into top-10 leaderboards + totals, per grade tab.
- Caches each FINAL game summary in KV (`game:{id}`, immutable) and the computed board
  (`board:current`), so steady-state runs are cheap and visitor traffic hits KV only.
- Serves `GET /scoreboard` → the board JSON (same shape as `scoreboard-data.js`).

## Endpoints
- `GET /scoreboard` — cached board JSON (CORS-enabled).
- `GET /scoreboard?refresh=1` — force a rebuild now (handy first-run / testing).
- `GET /health` — `{ ok: true }`.

## Deploy (needs a Cloudflare account; run from this folder)
```bash
cd workers/bhrdca-stats
npx wrangler login                       # once per machine
npx wrangler kv namespace create STATS   # copy the returned id into wrangler.toml
npx wrangler secret put PLAYHQ_API_KEY   # paste the PlayHQ public key — NEVER commit it
npx wrangler deploy
# first build (backfills over a few cron runs due to the per-run fetch budget):
curl "https://bhrdca-stats.<your-subdomain>.workers.dev/scoreboard?refresh=1"
```

## Wire the homepage to it
Set the deployed URL in `index.html` (near the scoreboard script):
```html
<script>window.BHRDCA_STATS_API = "https://bhrdca-stats.<your-subdomain>.workers.dev/scoreboard";</script>
```
If that var is unset or the fetch fails, the board falls back to the bundled demo data
(`scoreboard-data.js`) — nothing breaks pre-deploy.

## Notes / knobs (top of `src/index.js`)
- `MAX_GAME_FETCHES_PER_RUN` — per-run PlayHQ fetch budget (keeps within Worker subrequest limits;
  first runs backfill, then only new FINAL games each run). Raise once PlayHQ confirms rate limits.
- `TABS` — competition-name matchers for each board tab (edit if BHRDCA renames competitions).
- Hidden players (PlayHQ visibility) can't be named, so they're excluded from leaderboards.
- **Live in-play scores** are NOT covered here (public API is pre/post game only). True live scoring
  needs the PlayHQ partner webhook — tracked in the integration doc.
