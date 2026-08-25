/* ============================================================================
   BHRDCA — Podcasts data (The Cordon Radio Show).
   window.BHRDCA_PODCASTS is read by podcasts.html and podcasts-archive.html.

   TO ADD A NEW EPISODE (2026/27 season): copy this shape into the
   `episodes` array below — newest first. Nothing else needs to change,
   the page picks it up automatically:

     { title: "Ep 1 — [guest names]", date: "2026-10-03",
       blurb: "One line on what the episode covers.",
       url: "https://open.spotify.com/episode/..." }

   AT SEASON'S END: move the current `episodes` array into a new entry
   at the top of `archive` (season: "2026/27"), then empty `episodes`
   ready for the next season.
   ========================================================================== */
window.BHRDCA_PODCASTS = {
  currentSeason: "2026/27",
  spotifyShow: "https://tinyurl.com/yw39ksoy",
  host: "Hosted by Paul Hooper, live on 3WBC 94.1FM.",

  episodes: [
    // Add 2026/27 episodes here as they're released — see format above.
  ],

  archive: [
    {
      season: "2025/26",
      note: "The Cordon Radio Show, hosted by Paul Hooper — live on 3WBC 94.1FM.",
      episodes: [
        { title: "Episode 18 — 23/2/2026", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast-Ep-18-2526---23-2-2026-e3fifhh/a-acga2hg" }
      ]
    }
  ]
};
