# BHRDCA — Cloudflare cutover checklist (→ bhrdca.com.au)

Target: move the static site from Vercel staging to **Cloudflare Pages**, live on **bhrdca.com.au** (replacing the current Wix site), **indexable at cutover**.

## Done in the repo (ready)
- **SEO tags on all 21 pages:** `<link rel="canonical" href="https://bhrdca.com.au/…">`, meta description, Open Graph + Twitter card. Canonicals use clean URLs (`/clubs`, `/juniors`, …; home = `/`).
- **sitemap.xml** — 21 pages, absolute bhrdca.com.au URLs.
- **robots.txt** — `Sitemap:` line added; normal search engines allowed; AI/harvester crawlers opted out.
- **_redirects** — 35 legacy Wix URLs 301 → matching new pages (Cloudflare Pages reads this file natively).
- **404.html** — branded, `noindex`; Cloudflare Pages serves it automatically.
- **Mobile:** sticky nav fixed (overflow-x clip), tap targets ≥ ~40px, totals collapse on small phones.

## Cutover steps (do at migration)
1. **Create the Cloudflare Pages project** from the `SportsWeb-Australia/bhrdca` GitHub repo (production branch = `main`, no build command, output dir = repo root). It auto-picks up `_redirects` and `404.html`.
2. **Verify on the pages.dev URL first:** clean URLs resolve (`/clubs`, `/juniors`), a legacy path 301s (`/rules-regulations` → `/rules`), 404 page shows, sitemap + robots load.
3. **Add the custom domain** `bhrdca.com.au` (and `www`) to the Pages project. Decide bare vs www as primary — canonicals are set to **bare `bhrdca.com.au`**, so make bare the primary and **301 www → bare** (Pages/Cloudflare redirect rule).
4. **DNS:** point `bhrdca.com.au` (and `www`) to Cloudflare Pages (CNAME/flattening). This is the moment Wix stops serving — have the DNS TTL low beforehand.
5. **Google Search Console:** add/verify `bhrdca.com.au`, **submit `https://bhrdca.com.au/sitemap.xml`**. Use "Change of Address" only if the domain itself changes (it doesn't — same domain, new host), so not needed here.
6. **Confirm HTTPS** (Cloudflare universal SSL) and that HTTP → HTTPS.
7. **Post-cutover checks:** spot-check 5–6 legacy Wix URLs 301 correctly; confirm no page still references `vercel.app` except the SitePulse widget; run a mobile pass.

## Still to decide / do (flagged separately)
- **Analytics** — not yet installed. Add Cloudflare Web Analytics (or GA4 + Search Console) **before** go-live so traffic is captured from cutover. *(task chip created.)*
- **SitePulse widget** — every page loads `sportsweb-one-v1.vercel.app/sitepulse-widget.js` with `data-website-status="draft"`. Decide whether to keep it live and flip to "published", or remove for launch.
- **Internal links use `/foo.html`** — Cloudflare Pages 301s these to `/foo`, so they work with one extra hop. Optional polish: rewrite internal links to clean URLs.
- **Old Wix URLs not in the sitemap** (e.g. individual blog posts / dynamic items) — if any had traffic, add extra 301s to `_redirects`.
- **PlayHQ stats Worker** stays on Cloudflare (already there); no change needed.
