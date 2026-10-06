/* ============================================================================
   BHRDCA — shared chrome injector  (bhrdca-components.js)
   Renders the masthead (top bar + mobile menu + nav), a slim info ticker, the
   sponsor carousel and the footer into <div data-bhrdca="..."> mount points,
   so every inner page stays small and the chrome lives in ONE file.
   Set the active nav item with <body data-page="clubs">.
   ========================================================================== */
(function () {
  var LOGO = "/bhrdca-logo.svg";
  var FB = "https://www.facebook.com/bhrdca";
  var IG = "https://www.instagram.com/bhrdca1/";
  var PLAYHQ = "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/f8c1124c";

  /* --- Cloudflare Web Analytics (privacy-friendly, cookieless) ---------------
     GO-LIVE: paste the token from Cloudflare dashboard > Web Analytics > (site) >
     "JS snippet" between the quotes below. Empty = off.
     NOTE: if you instead enable Web Analytics with one click in the Cloudflare
     PAGES project, leave this empty — otherwise the page is counted twice. */
  var CF_ANALYTICS_TOKEN = "";
  if (CF_ANALYTICS_TOKEN && document.head) {
    var cfb = document.createElement("script");
    cfb.defer = true;
    cfb.src = "https://static.cloudflareinsights.com/beacon.min.js";
    cfb.setAttribute("data-cf-beacon", '{"token":"' + CF_ANALYTICS_TOKEN + '"}');
    document.head.appendChild(cfb);
  }

  /* --- Structured data (JSON-LD) for Google -------------------------------
     Site-wide SportsOrganization + WebSite on every page, plus a per-page
     BreadcrumbList built from the visible ".crumb" trail. One source of truth;
     Google renders this site's JS to read its (JS-injected) content anyway. */
  function injectSchema() {
    if (!document.head || document.getElementById("bhrdca-jsonld")) return;
    var ORIGIN = "https://bhrdca.com.au";
    var canon = (document.querySelector('link[rel="canonical"]') || {}).href ||
                (ORIGIN + location.pathname.replace(/index\.html$/, "").replace(/\.html$/, ""));
    var graph = [
      {
        "@type": "SportsOrganization",
        "@id": ORIGIN + "/#org",
        "name": "Box Hill Reporter District Cricket Association",
        "alternateName": "BHRDCA",
        "url": ORIGIN + "/",
        "logo": ORIGIN + "/icon-512.png",
        "image": ORIGIN + "/bhrdca-hero-sm.webp",
        "foundingDate": "1890",
        "sport": "Cricket",
        "areaServed": "Eastern suburbs of Melbourne, Victoria, Australia",
        "sameAs": [FB, IG, PLAYHQ]
      },
      {
        "@type": "WebSite",
        "@id": ORIGIN + "/#website",
        "url": ORIGIN + "/",
        "name": "BHRDCA — Box Hill Reporter District Cricket Association",
        "publisher": { "@id": ORIGIN + "/#org" }
      }
    ];
    var crumb = document.querySelector(".crumb");
    if (crumb) {
      // Walk the crumb nodes: each <a> is a navigable ancestor (Home, Honours,
      // Podcasts, Media...); the final text node is the current page. Plain-text
      // category labels (e.g. "Cricket", "BHRDCA") are non-navigable and dropped.
      var trail = [], lastText = "";
      for (var n = crumb.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n.tagName === "A") {
          var hv = n.getAttribute("href") || "";
          trail.push({ name: (n.textContent || "").trim(), item: hv.charAt(0) === "/" ? ORIGIN + hv : hv });
          lastText = "";
        } else if (n.nodeType === 3) {
          var t = n.textContent.replace(/\s+/g, " ").trim();
          if (t) lastText = t; // remember most recent text; final one is the current page
        }
      }
      var pageName = lastText ? lastText.split("·").pop().trim() : ""; // strip "Category ·" prefix
      if (pageName) trail.push({ name: pageName, item: canon });
      if (trail.length > 1) {
        graph.push({
          "@type": "BreadcrumbList",
          "itemListElement": trail.map(function (it, i) {
            return { "@type": "ListItem", "position": i + 1, "name": it.name, "item": it.item };
          })
        });
      }
    }
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "bhrdca-jsonld";
    s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(s);
  }

  // sponsor names for the moving carousel (static chrome, matches association wall)
  var SPONSORS = [
    ["Greg Chappell Cricket Centre","https://www.cricketcentre.com.au/","/sponsor-logos/century-cricket-centre.webp"],
    ["Kookaburra Sport","https://www.kookaburrasport.com.au/cricket/","/sponsor-logos/kookaburra-sport.webp",1],
    ["Cricket Victoria","https://www.cricketvictoria.com.au/","/sponsor-logos/cricket-victoria.webp"],
    ["Field of View Sports Photography","https://www.fieldofview.com.au/","/sponsor-logos/field-of-view.webp"],
    ["SportsWeb Australia","https://sportsweb.com.au","/sponsor-logos/sportsweb-cricket.webp"],
    ["Topline Cricket","https://www.toplinecricket.com.au/","/sponsor-logos/topline-cricket.webp"],
    ["Top Notch Trophies","https://www.topnotchtrophies.com.au/","/sponsor-logos/top-notch-trophies.webp"],
    ["Box Hill Indoor Sports","https://boxhillindoorsports.com.au/sports-and-activities/indoor-cricket/","/sponsor-logos/box-hill-indoor-sports.webp"],
    ["Geyer Accountants","https://geyeraccountants.com.au/","/sponsor-logos/geyer-accountants.webp",1],
    ["Community Bank Inner East · Bendigo Bank","https://www.bendigobank.com.au/","/sponsor-logos/bendigo-bank.webp"],
    ["Grant Professionals & Club Builder","https://www.club-builder.com.au/","/sponsor-logos/club-builder.webp",1],
    ["Club Connect","https://clubconnect.net.au","/sponsor-logos/club-connect.webp",1],
    ["Altegra","https://www.altegra.com.au/","/sponsor-logos/altegra.webp"],
    ["Good Sports","https://goodsports.com.au/","/sponsor-logos/good-sports.webp",1],
    ["Child Safe","https://www.childsafe.org.au/","/sponsor-logos/child-safe.svg",1],
    ["Compare & Connect","https://www.compareandconnect.com.au/","/sponsor-logos/compare-and-connect.webp"],
    ["LCF Linemarking & Logos","https://grassup.com.au/services","/sponsor-logos/lcf-linemarking.webp"],
    ["Modern Orthodontics","https://www.modernorthodontics.com.au/","/sponsor-logos/modern-orthodontics.webp"],
    ["3WBC Radio","https://www.3wbc.org.au/shows/the-cordon/","/sponsor-logos/3wbc-radio.webp",1]
  ];
  function scItems() {
    var set = SPONSORS.map(function (s) {
      var inner = s[2]
        ? '<img src="' + s[2] + '" alt="' + s[0] + '" loading="lazy" onerror="this.parentNode.classList.add(\'scitxt\');this.parentNode.classList.remove(\'sci-dark\');this.replaceWith(document.createTextNode(\'' + s[0].replace(/'/g, "\\'") + '\'))">'
        : s[0];
      if (s[4]) inner += '<span class="sci-cap">' + s[4] + '</span>';
      return '<a href="' + s[1] + '" target="_blank" rel="noopener" class="sci' + (s[2] ? '' : ' scitxt') + (s[3] ? ' sci-dark' : '') + (s[4] ? ' sci-cap-tile' : '') + '">' + inner + '</a>';
    }).join("");
    return set + set; // doubled for seamless loop
  }

  var T = {
    "topbar": '<div class="topbar">'
      + '<div style="display:flex;align-items:center;gap:18px">'
      + '<div class="tb-item"><i class="ti ti-map-pin"></i> Melbourne\'s Eastern Suburbs</div>'
      + '<div class="tb-item"><i class="ti ti-mail"></i> bhrdca.media@gmail.com</div>'
      + '<div class="tb-item"><i class="ti ti-ball-baseball"></i> Est. 1890 &middot; 139th Season</div>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'
      + '<div class="t-soc">'
      + '<a href="' + FB + '" target="_blank" rel="noopener" aria-label="BHRDCA on Facebook"><i class="ti ti-brand-facebook"></i></a>'
      + '<a href="' + IG + '" target="_blank" rel="noopener" aria-label="BHRDCA on Instagram"><i class="ti ti-brand-instagram"></i></a>'
      + '</div>'
      + '<a href="' + PLAYHQ + '" target="_blank" rel="noopener" style="background:var(--gold);color:var(--ink-gold);padding:4px 14px;border-radius:6px;font-size:11px;font-weight:700">Fixtures &amp; Ladders</a>'
      + '<div class="wx-widget" id="wx-widget"></div>'
      + '</div>'
      + '</div>',

    "mobile-menu": '<div class="mob-menu" id="mob-menu">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.1)">'
      + '<div style="display:flex;align-items:center;gap:10px"><img src="' + LOGO + '" alt="BHRDCA" style="width:38px;height:38px;object-fit:contain"><div style="font-family:\'Bebas Neue\',sans-serif;font-size:20px;color:#fff">BHRDCA</div></div>'
      + '<button onclick="document.getElementById(\'mob-menu\').classList.remove(\'open\')" style="background:rgba(255,255,255,.1);border:none;color:#fff;width:36px;height:36px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center"><i class="ti ti-x" style="font-size:18px"></i></button>'
      + '</div>'
      + '<a href="/" class="mob-link active"><i class="ti ti-home"></i> Home</a>'
      + '<a href="' + PLAYHQ + '" target="_blank" rel="noopener" class="mob-link"><i class="ti ti-scoreboard"></i> Fixtures, Results &amp; Ladders</a>'
      + '<div class="mob-group">Cricket</div>'
      + '<a href="/juniors" class="mob-link"><i class="ti ti-friends"></i> Juniors</a>'
      + '<a href="/seniors" class="mob-link"><i class="ti ti-trophy"></i> Senior Men</a>'
      + '<a href="/womens" class="mob-link"><i class="ti ti-cricket"></i> Senior Women</a>'
      + '<a href="/veterans" class="mob-link"><i class="ti ti-medal"></i> Veterans</a>'
      + '<a href="/umpires" class="mob-link"><i class="ti ti-gavel"></i> Umpires</a>'
      + '<div class="mob-group">Clubs &amp; Community</div>'
      + '<a href="/clubs" class="mob-link"><i class="ti ti-buildings"></i> Our Clubs</a>'
      + '<a href="/club-contacts" class="mob-link"><i class="ti ti-address-book"></i> Club Contacts</a>'
      + '<a href="/communications" class="mob-link"><i class="ti ti-broadcast"></i> Media</a>'
      + '<a href="/sponsors" class="mob-link"><i class="ti ti-heart-handshake"></i> Sponsors &amp; Partners</a>'
      + '<a href="/news" class="mob-link"><i class="ti ti-news"></i> News</a>'
      + '<a href="/podcasts" class="mob-link"><i class="ti ti-microphone"></i> Podcasts</a>'
      + '<div class="mob-group">The Association</div>'
      + '<a href="/about" class="mob-link"><i class="ti ti-info-circle"></i> About</a>'
      + '<a href="/contacts" class="mob-link"><i class="ti ti-users"></i> BHRDCA Contacts</a>'
      + '<a href="/rules" class="mob-link"><i class="ti ti-file-text"></i> Rules &amp; Regulations</a>'
      + '<a href="/child-safety" class="mob-link"><i class="ti ti-shield-check"></i> Child Safety</a>'
      + '<a href="/honours" class="mob-link"><i class="ti ti-award"></i> Honours &amp; History</a>'
      + '<a href="/contact" class="mob-link"><i class="ti ti-mail"></i> Contact</a>'
      + '<div style="margin-top:12px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1)">'
      + '<a class="btn btn-red" style="width:100%;justify-content:center" href="' + PLAYHQ + '" target="_blank" rel="noopener"><i class="ti ti-user-plus"></i> Register / Play</a>'
      + '</div>'
      + '</div>',

    "header-nav": '<nav class="nav-wrap">'
      + '<div class="nav-inner">'
      + '<a class="nav-brand" href="/"><img src="' + LOGO + '" alt="BHRDCA" class="nav-logo-img"><div><div class="brand-name">BHRDCA</div><div class="brand-sub">Box Hill Reporter District Cricket Association</div></div></a>'
      + '<div class="nav-links">'
      + '<a class="nav-link active" href="/">Home</a>'
      + '<div class="nav-item">'
      + '<a class="nav-link nav-drop-toggle" href="/seniors">Cricket <i class="ti ti-chevron-down" style="font-size:12px"></i></a>'
      + '<div class="nav-drop">'
      + '<a href="/juniors">Juniors</a>'
      + '<a href="/seniors">Senior Men</a>'
      + '<a href="/womens">Senior Women</a>'
      + '<a href="/veterans">Veterans</a>'
      + '<a href="/umpires">Umpires</a>'
      + '</div>'
      + '</div>'
      + '<a class="nav-link" href="/clubs">Clubs</a>'
      + '<a class="nav-link" href="/communications">Media</a>'
      + '<a class="nav-link" href="/news">News</a>'
      + '<a class="nav-link" href="/honours">Honours</a>'
      + '<a class="nav-link" href="/child-safety">Child Safety</a>'
      + '<div class="nav-item">'
      + '<a class="nav-link nav-drop-toggle" href="/about">Association <i class="ti ti-chevron-down" style="font-size:12px"></i></a>'
      + '<div class="nav-drop">'
      + '<a href="/about">About</a>'
      + '<a href="/contacts">BHRDCA Contacts</a>'
      + '<a href="/club-contacts">Club Contacts</a>'
      + '<a href="/rules">Rules &amp; Regulations</a>'
      + '<a href="/sponsors">Sponsors &amp; Partners</a>'
      + '<a href="/podcasts">Podcasts</a>'
      + '<a href="/contact">Contact</a>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div class="nav-actions">'
      + '<a class="nav-icon-btn" href="' + FB + '" target="_blank" rel="noopener" data-tip="Facebook" aria-label="Facebook"><i class="ti ti-brand-facebook" style="font-size:18px"></i></a>'
      + '<a class="nav-icon-btn" href="' + IG + '" target="_blank" rel="noopener" data-tip="Instagram" aria-label="Instagram"><i class="ti ti-brand-instagram" style="font-size:18px"></i></a>'
      + '<button class="nav-icon-btn hamburger" onclick="document.getElementById(\'mob-menu\').classList.add(\'open\')"><i class="ti ti-menu-2" style="font-size:18px"></i></button>'
      + '<a class="btn btn-red btn-sm" href="' + PLAYHQ + '" target="_blank" rel="noopener">Fixtures</a>'
      + '</div>'
      + '</div>'
      + '</nav>',

    "ticker": '<div class="bh-strip">'
      + '<div class="bh-strip-inner">'
      + '<a class="bh-strip-pill" href="' + PLAYHQ + '" target="_blank" rel="noopener"><i class="ti ti-scoreboard"></i> This Season</a>'
      + '<span class="bh-strip-tx">Fixtures, results &amp; ladders are live on PlayHQ &mdash; Juniors, Seniors, Women\'s &amp; Veterans.</span>'
      + '<a class="bh-strip-cta" href="' + PLAYHQ + '" target="_blank" rel="noopener">Open PlayHQ <i class="ti ti-external-link"></i></a>'
      + '</div>'
      + '</div>',

    "sponsor-carousel": '<div class="sc-wrap">'
      + '<div class="sc-inner">'
      + '<button class="sc-btn" id="sc-prev"><i class="ti ti-chevron-left" style="font-size:14px;pointer-events:none"></i></button>'
      + '<div class="sc-label-block"><span class="sc-label">Our Partners</span><span class="sc-label-sub">Proudly supporting BHRDCA cricket</span></div>'
      + '<div class="sc-scroll" id="sc-scroll"><div class="sc-track" id="sc-track">' + scItems() + '</div></div>'
      + '<button class="sc-btn" id="sc-next"><i class="ti ti-chevron-right" style="font-size:14px;pointer-events:none"></i></button>'
      + '</div>'
      + '</div>',

    "footer": '<footer class="footer">'
      + '<div class="footer-accent"></div>'
      + '<div class="footer-top">'
      + '<div>'
      + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">'
      + '<a href="/" aria-label="BHRDCA home" style="display:inline-flex"><img src="' + LOGO + '" alt="BHRDCA" style="width:54px;height:54px;object-fit:contain;filter:drop-shadow(0 2px 8px rgba(0,0,0,.3))"></a>'
      + '<div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:20px;color:#fff;letter-spacing:.5px">BHRDCA</div><div style="font-size:10px;color:rgba(255,255,255,.82)">Box Hill Reporter District Cricket Association</div></div>'
      + '</div>'
      + '<div style="font-size:12px;color:rgba(255,255,255,.85);line-height:1.7;max-width:250px;margin-bottom:14px">The longest-running cricket association in Victoria — proudly serving Melbourne\'s eastern suburbs since 1890.</div>'
      + '<div style="display:flex;gap:10px">'
      + '<a href="' + FB + '" target="_blank" rel="noopener" aria-label="BHRDCA on Facebook" class="f-soc"><i class="ti ti-brand-facebook"></i></a>'
      + '<a href="' + IG + '" target="_blank" rel="noopener" aria-label="BHRDCA on Instagram" class="f-soc"><i class="ti ti-brand-instagram"></i></a>'
      + '</div>'
      + '</div>'
      + '<div>'
      + '<div class="f-hd">Cricket</div>'
      + '<a class="f-link" href="/juniors">Juniors</a><a class="f-link" href="/seniors">Senior Men</a><a class="f-link" href="/womens">Senior Women</a><a class="f-link" href="/veterans">Veterans</a><a class="f-link" href="/umpires">Umpires</a>'
      + '</div>'
      + '<div>'
      + '<div class="f-hd">Clubs &amp; Community</div>'
      + '<a class="f-link" href="/clubs">Our Clubs</a><a class="f-link" href="/club-contacts">Club Contacts</a><a class="f-link" href="/communications">Media</a><a class="f-link" href="/sponsors">Sponsors &amp; Partners</a><a class="f-link" href="/news">News</a><a class="f-link" href="/podcasts">Podcasts</a>'
      + '</div>'
      + '<div>'
      + '<div class="f-hd">The Association</div>'
      + '<a class="f-link" href="/about">About</a><a class="f-link" href="/contacts">BHRDCA Contacts</a><a class="f-link" href="/rules">Rules &amp; Regulations</a><a class="f-link" href="/child-safety">Child Safety</a><a class="f-link" href="/honours">Honours &amp; History</a><a class="f-link" href="/contact">Contact</a>'
      + '</div>'
      + '</div>'
      + '<div style="border-top:1px solid rgba(255,255,255,.06);padding:14px 20px">'
      + '<div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">'
      + '<div style="font-size:11px;color:rgba(255,255,255,.62)">&copy; ' + (new Date().getFullYear()) + ' Box Hill Reporter District Cricket Association Inc. Reg. #A0032112P. All rights reserved.</div>'
      + '<div style="font-size:11px;color:rgba(255,255,255,.62)">Website and Club Operating System powered by <a href="https://sportsweb.com.au" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:none">SportsWeb Australia</a></div>'
      + '</div>'
      + '</div>'
      + '</footer>'
  };

  function html(key) {
    if (key === "masthead") return T["topbar"] + T["mobile-menu"] + T["header-nav"];
    return T[key] || "";
  }

  var ACTIVEMAP = {
    "home":"home","index":"home",
    "juniors":"cricket","seniors":"cricket","veterans":"cricket","womens":"cricket","umpires":"cricket",
    "clubs":"clubs","club-contacts":"clubs",
    "communications":"communications","news":"news","honours":"honours","history":"honours",
    "about":"association","contacts":"association","rules":"association","child-safety":"association",
    "sponsors":"association","podcasts":"association","contact":"association"
  };
  function wireNav() {
    var page = (document.body.getAttribute("data-page") || "").toLowerCase();
    var active = ACTIVEMAP[page] || page;
    var links = document.querySelectorAll(".nav-link");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var key = (a.textContent || "").trim().toLowerCase().replace(/\s+.*$/,"");
      a.classList.remove("active");
      if (key === active) a.classList.add("active");
    }
  }

  function initCarousel() {
    var el = document.getElementById("sc-scroll");
    var track = document.getElementById("sc-track");
    if (!el || !track) return;
    var half = 0, pos = 0, speed = 0.45, boost = 0, paused = false;
    function measure(){ half = track.scrollWidth / 2; }
    measure();
    window.addEventListener("resize", measure);
    setTimeout(measure, 600); setTimeout(measure, 2000);
    el.addEventListener("mouseenter", function(){ paused = true; });
    el.addEventListener("mouseleave", function(){ paused = false; });
    function group(){ return Math.max(el.clientWidth * 0.9, 240); }
    var prev = document.getElementById("sc-prev"), next = document.getElementById("sc-next");
    if (next) next.addEventListener("click", function(){ boost += group(); });
    if (prev) prev.addEventListener("click", function(){ boost -= group(); });
    function frame(){
      var step = paused ? 0 : speed;
      if (boost !== 0){
        var rush = Math.max(speed, group() / 20);
        var d = boost > 0 ? Math.min(boost, rush) : Math.max(boost, -rush);
        step += d; boost -= d;
      }
      pos += step;
      if (half > 0){ if (pos >= half) pos -= half; else if (pos < 0) pos += half; }
      el.scrollLeft = pos;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function mount() {
    var nodes = document.querySelectorAll("[data-bhrdca]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-bhrdca");
      nodes[i].outerHTML = html(key);
    }
    wireNav();
    initCarousel();
    injectSchema();
  }

  window.BHRDCA = window.BHRDCA || {};
  window.BHRDCA.mount = mount;
  window.BHRDCA.LOGO = LOGO;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
