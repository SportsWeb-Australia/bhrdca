/* ============================================================================
   BHRDCA — Association Scoreboard rotating banners.
   Up to 4 banners rotate in the slot above the totals on the homepage board,
   the same way the team line-up banners rotate.

   MANAGEMENT: for now, banners are set here. The homepage ALSO accepts a
   `banners` array from the live stats Worker (SportsWeb One-managed) — when the
   board JSON includes `banners`, those OVERRIDE this list, so SW1 can upload /
   change banners without a code change once that endpoint is wired.

   Each banner:
     { img: "/banners/xyz.webp", url: "https://…", alt: "Sponsor name" }   // image banner (preferred)
   or a text placeholder (used until real images are uploaded):
     { title: "…", sub: "…", cta: "…", url: "…" }
   `url` is optional (makes the banner clickable).
   ========================================================================== */
window.BHRDCA_SCOREBOARD_BANNERS = [
  { title: "Fixtures, Results & Ladders", sub: "Live all season on PlayHQ", cta: "Open PlayHQ",
    url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/f8c1124c" },
  { title: "139 Seasons of Cricket", sub: "Victoria's longest-running association · Est. 1890", cta: "Our story",
    url: "/about" },
  { title: "Find a Club Near You", sub: "29 clubs across Melbourne's east — Juniors to Veterans", cta: "Browse clubs",
    url: "/clubs" },
  { title: "Advertise Here", sub: "Put your brand in front of 3,500+ players & families — partner with the Association", cta: "Enquire now",
    url: "mailto:bhrdca.media@gmail.com?subject=Advertising%20%26%20Sponsorship%20Enquiry%20-%20BHRDCA" }
];
