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
        { title: "Episode 18 — 23/2/2026", date: "24 Feb 2026", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast-Ep-18-2526---23-2-2026-e3fifhh" },
        { title: "Episode 15 — 2/2/2026", date: "4 Feb 2026", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Ep15--2-2-2026-e3ek4n8" },
        { title: "Episode 13", date: "4 Feb 2026", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Ep13-2526-e3ek5ah" },
        { title: "Episode 7", date: "12 Nov 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Ep7-2526-e3asuon" },
        { title: "Episode 6", date: "4 Nov 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon---Ep6-2526-e3agl85" },
        { title: "Episode 5", date: "30 Oct 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Ep5-2526-e3a9k2u" },
        { title: "Episode 4", date: "30 Oct 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Ep4-2526-e3a9k6t" },
        { title: "Episode 3", date: "30 Oct 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Ep3-2526-e3a9jtn" },
        { title: "Episode 1", date: "30 Oct 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Ep1-2526-e3a9jm7" }
      ]
    },
    {
      season: "2024/25",
      note: "The Cordon Radio Show, hosted by Paul Hooper — live on 3WBC 94.1FM.",
      episodes: [
        { title: "The Cordon Radio Show & Podcast", date: "19 Mar 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast-e30cdrq" },
        { title: "8th March, 2025", date: "19 Mar 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---8th-March--2025-e30cdpn" },
        { title: "1.3.2025", date: "7 Mar 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---1-3-2025-e2vr4ah" },
        { title: "Episode 20 — 22nd Feb, 2025", date: "24 Feb 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Ep-20--22nd-Feb--2025-e2val3s" },
        { title: "Sat, 15th Feb, 2025 — Wk 19", date: "17 Feb 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Sat--15th-Feb--2025---Wk-19-e2uvseg" },
        { title: "Episode 17 — Sat, 1st Feb, 2025", date: "5 Feb 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/Cordon-Radio-Show--Podcast---Sat--1st-February--2025-Ep-17-e2uehs8" },
        { title: "25.1.2025", date: "27 Jan 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Program--Podcast---25-1-2025-e2u2jl9" },
        { title: "Sat, 18th January, 2025", date: "20 Jan 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Sat--18th-January--2025-e2tnoi3" },
        { title: "11th January, 2025", date: "20 Jan 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---11th-January--2025-e2tnodr" },
        { title: "Week 13 — 4th January, 2025", date: "7 Jan 2025", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-13---4th-January--2025-e2t5r1q" },
        { title: "Week 12 — 21.12.2024", date: "23 Dec 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-12---21-12-2024-e2smjs0" },
        { title: "Week 11 — 14th Dec, 2024", date: "18 Dec 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-11---14th-Dec--2024-e2sfmfn" },
        { title: "Week 9 — 30 Nov, 2024", date: "5 Dec 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-9---30-Nov--2024-e2ru3ev" },
        { title: "November 30, 2024 — Week 9", date: "5 Dec 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---November-30--2024-Week-9-e2ru2l7" },
        { title: "Week 8 — 23 Nov, 2024", date: "25 Nov 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-8---23-Nov--2024-e2rg5ce" },
        { title: "Week 7 — 16.11.2024", date: "19 Nov 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-7---16-11-2024-e2r623c" },
        { title: "Week 6 — 9th Nov, 2024", date: "12 Nov 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Show--Podcast---Week-6---9th-Nov--2024-e2qs78n" },
        { title: "Week 5 — 2nd November, 2024", date: "3 Nov 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Program---Week-5---2nd-November--2024-e2qfrr6" },
        { title: "Week 4 — 26.10.2024", date: "28 Oct 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon-Radio-Program---Week-4---26-10-2024-e2q7sbf" },
        { title: "Week 3 — 19th October, 2024", date: "23 Oct 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/Week-3-The-Cordon-19th-October--2024-e2q2crg" },
        { title: "Week 2 — 12th October, 2024", date: "15 Oct 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon---Week-2---12th-October--2024-e2pmcq4" },
        { title: "Week 1 — 5th October, 2024", date: "6 Oct 2024", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/The-Cordon---Week-1---5th-October--2024-e2p9fof" }
      ]
    },
    {
      season: "2023/24",
      note: "Player and club interviews with host Paul Hooper.",
      episodes: [
        { title: "Peter Lausch Interview", date: "14 Dec 2023", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/Peter-Lausch-Interview-14-December--2023-e2dbat1" },
        { title: "One Day Kings Interview", date: "7 Dec 2023", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/TNL-December-7--2023-One-Day-Kings-Interview-e2db9vf" },
        { title: "Pat Lazzaro Interview", date: "30 Nov 2023", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/TNL-November-30-2023-Pat-Lazzaro-Interview-e2db954" },
        { title: "Steve Ayton Interview", date: "16 Nov 2023", url: "https://creators.spotify.com/pod/profile/paul-hooper2/episodes/TNL-November-16--2023-Steve-Ayton-Interview-e2c6lij" }
      ]
    }
  ]
};
