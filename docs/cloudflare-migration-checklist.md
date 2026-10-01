# BHRDCA — Cloudflare cutover checklist (→ bhrdca.com.au)

Target: move the static site from Vercel staging to **Cloudflare Pages**, live on **bhrdca.com.au** (replacing the current Wix site), **indexable at cutover**.

## Done in the repo (ready)
- **SEO tags on all 21 pages:** `<link rel="canonical" href="https://bhrdca.com.au/…">`, meta description, Open Graph + Twitter card. Canonicals use clean URLs (`/clubs`, `/juniors`, …; home = `/`).
- **sitemap.xml** — 21 pages, absolute bhrdca.com.au URLs.
- **robots.txt** — `Sitemap:` line added; normal search engines allowed; AI/harvester crawlers opted out.
- **_redirects** — 35 legacy Wix URLs 301 → matching new pages (Cloudflare Pages reads this file natively).
- **404.html** — branded, `noindex`; Cloudflare Pages serves it automatically.
- **Mobile:** sticky nav fixed (overflow-x clip), tap targets ≥ ~40px, totals collapse on small phones. Full sweep (21 pages @ 375/768/1024) = zero horizontal overflow.
- **Structured data (JSON-LD):** site-wide SportsOrganization + WebSite on every page, plus a per-page BreadcrumbList (navigable ancestors only), injected from `bhrdca-components.js`.
- **Clean internal links:** all internal links use clean URLs (`/juniors`, home = `/`) — match the canonicals, no redirect hop. External links + `sw.js` precache untouched.
- **SitePulse feedback widget:** REMOVED from all pages (was `data-website-status="draft"`).
- **Archive page:** `archive/index-classic-scoreboard.html` set `noindex` + canonical → `/` (was a crawlable homepage-title duplicate).
- **Meta descriptions:** all pages now in the ~120-160 char range.

## Cutover steps (do at migration)
1. **Create the Cloudflare Pages project** from the `SportsWeb-Australia/bhrdca` GitHub repo (production branch = `main`, no build command, output dir = repo root). It auto-picks up `_redirects` and `404.html`.
2. **Verify on the pages.dev URL first:** clean URLs resolve (`/clubs`, `/juniors`), a legacy path 301s (`/rules-regulations` → `/rules`), 404 page shows, sitemap + robots load.
3. **Add the custom domain** `bhrdca.com.au` (and `www`) to the Pages project. Decide bare vs www as primary — canonicals are set to **bare `bhrdca.com.au`**, so make bare the primary and **301 www → bare** (Pages/Cloudflare redirect rule).
4. **DNS:** point `bhrdca.com.au` (and `www`) to Cloudflare Pages (CNAME/flattening). This is the moment Wix stops serving — have the DNS TTL low beforehand.
5. **Google Search Console:** add/verify `bhrdca.com.au`, **submit `https://bhrdca.com.au/sitemap.xml`**. Use "Change of Address" only if the domain itself changes (it doesn't — same domain, new host), so not needed here.
6. **Confirm HTTPS** (Cloudflare universal SSL) and that HTTP → HTTPS.
7. **Post-cutover checks:** spot-check 5–6 legacy Wix URLs 301 correctly; confirm no page still references `vercel.app` except the SitePulse widget; run a mobile pass.

## Still to decide / do (flagged separately)
- **Analytics** — Cloudflare Web Analytics beacon is wired into `bhrdca-components.js` (const `CF_ANALYTICS_TOKEN`, off until set). At go-live pick ONE of:
  (a) **One-click** in the Pages project → Analytics → enable Web Analytics (no code, no token) — recommended; leave `CF_ANALYTICS_TOKEN` empty; or
  (b) paste the token from Cloudflare dashboard → Web Analytics → JS snippet into `CF_ANALYTICS_TOKEN`.
  Do NOT do both (double-counts). *(task chip created.)*
- **Google Search Console** — after DNS cutover, add `bhrdca.com.au` and submit `https://bhrdca.com.au/sitemap.xml`. Same domain, new host → do NOT use Change of Address. *(reminder chip created.)*
- **PWA push samples (non-blocker)** — `pwa.js` sample notifications reference placeholder pages `/notices.html` and `/competition.html` that don't exist. Push isn't wired to a real sender, so these never fire and aren't crawlable. Point them at real pages if/when push goes live.
- **Three contact pages (minor)** — `contact.html`, `contacts.html`, `club-contacts.html` all index with distinct titles; topically close. Consider consolidating later; not a cutover blocker.
- **Old Wix URLs not in the sitemap** (e.g. individual blog posts / dynamic items) — if any had traffic, add extra 301s to `_redirects`.
- **PlayHQ stats Worker** stays on Cloudflare (already there); no change needed.
