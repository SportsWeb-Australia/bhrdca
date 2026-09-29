/* ============================================================================
   BHRDCA - SportsWeb One connection.
   Photos (albums) and the podcast are managed in SportsWeb One - by BHRDCA,
   or by Skip with a BHRDCA admin approving. This file reads what SW1 has
   PUBLISHED, and nothing else: the key below is a publishable key, made to sit
   in a web page, and it can only read what SW1 opens to the public.

   Nothing here can break a page: if SW1 is off, slow (over 2.5 seconds) or
   down, each loader answers null and the page shows what is written into this
   site's own files, exactly as before.

   On only on localhost, or with ?sw1=1 in the address, until "everywhere" is
   set to true. Currently pointed at SW1's DEVELOP database, for proving it.
   ========================================================================== */
(function () {
  var SW1 = {
    url: "https://jgziqwowavhuqpbmzxhs.supabase.co",
    anonKey: "sb_publishable_sntqtPKA3_B151T9cGrMUw_Fn_9Im5D",
    clubId: "b4dca000-0000-4000-8000-000000000001",   // BHRDCA (develop)
    everywhere: false
  };
  var TIMEOUT_MS = 2500;

  function enabled() {
    if (!SW1.url || !SW1.anonKey || !SW1.clubId) return false;
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return true;
    try {
      if (new URLSearchParams(location.search).get("sw1") === "1") sessionStorage.setItem("sw1", "1");
      return sessionStorage.getItem("sw1") === "1" || SW1.everywhere === true;
    } catch (e) { return SW1.everywhere === true; }
  }

  function get(path, params) {
    if (!enabled() || typeof fetch !== "function") return Promise.resolve(null);
    var ctl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, TIMEOUT_MS);
    var q = new URLSearchParams(params);
    return fetch(SW1.url + "/rest/v1/" + path + "?" + q.toString(), {
      signal: ctl ? ctl.signal : undefined,
      headers: { apikey: SW1.anonKey, authorization: "Bearer " + SW1.anonKey }
    }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rows) { return Array.isArray(rows) ? rows : null; })
      .catch(function () { return null; })
      .then(function (v) { clearTimeout(timer); return v; });
  }
  /* Only ever a secure web address - anything else from SW1 is ignored. */
  function httpsOnly(u) { return typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u) ? u : null; }

  /* "2026-02-24" -> "24 Feb 2026", as the site already writes dates. */
  function niceDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    if (!m) return "";
    var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return Number(m[3]) + " " + MON[Number(m[2]) - 1] + " " + m[1];
  }

  /* Photo albums in their display order, each with its published photos. */
  function albums() {
    return get("gallery_albums", {
      select: "id,title,description,album_date,cover_url,display_order,gallery_photos(url,thumb_url,caption,status,position)",
      club_id: "eq." + SW1.clubId, status: "eq.published", order: "display_order.asc,album_date.desc.nullslast", limit: "60"
    }).then(function (rows) {
      if (!rows) return null;
      return rows.map(function (a) {
        var photos = (a.gallery_photos || []).filter(function (p) { return p && p.status === "published" && httpsOnly(p.url); })
          .sort(function (x, y) { return (x.position || 0) - (y.position || 0); })
          .map(function (p) { return { full: p.url, thumb: httpsOnly(p.thumb_url) || p.url, caption: String(p.caption || a.title || "") }; });
        return { id: String(a.id), title: String(a.title || ""), text: String(a.description || ""), photos: photos };
      }).filter(function (a) { return a.title && a.photos.length; });
    });
  }

  /* The podcast in the shape podcasts-data.js has always had, so the pages
     draw it the same way: the current season's episodes, and past seasons. */
  function podcast() {
    return get("podcast_shows", {
      select: "id,title,description,host_line,listen_url,current_season,podcast_episodes(title,blurb,season,episode_date,url,status)",
      club_id: "eq." + SW1.clubId, status: "eq.published", order: "created_at.asc", limit: "1"
    }).then(function (rows) {
      if (!rows || !rows.length) return null;
      var s = rows[0];
      var eps = (s.podcast_episodes || []).filter(function (e) { return e && e.status === "published" && httpsOnly(e.url) && e.title; })
        .sort(function (x, y) { return String(y.episode_date || "").localeCompare(String(x.episode_date || "")); })
        .map(function (e) { return { title: String(e.title), date: niceDate(e.episode_date), blurb: e.blurb ? String(e.blurb) : "", url: e.url, season: e.season || "" }; });
      var current = s.current_season || "";
      var bySeason = {};
      eps.forEach(function (e) { if (e.season !== current) (bySeason[e.season] = bySeason[e.season] || []).push(e); });
      var note = [s.title, s.host_line].filter(Boolean).join(" — ");
      return {
        title: String(s.title || ""),
        about: s.description ? String(s.description) : "",
        currentSeason: current,
        spotifyShow: httpsOnly(s.listen_url),
        host: s.host_line ? String(s.host_line) : "",
        episodes: eps.filter(function (e) { return e.season === current; }),
        archive: Object.keys(bySeason).sort().reverse().map(function (k) { return { season: k, note: note, episodes: bySeason[k] }; })
      };
    });
  }

  window.bhrdcaSW1 = { enabled: enabled, albums: albums, podcast: podcast };
})();
