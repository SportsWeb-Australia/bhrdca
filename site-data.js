/* ============================================================================
   BHRDCA — Box Hill Reporter District Cricket Association
   Content data layer. window.BHRDCA_DATA is read by bhrdca-render.js.
   Content sourced from the live Wix site (bhrdca.com.au) — 2026/27 season.
   ========================================================================== */
window.BHRDCA_DATA = (function () {

  var links = {
    playhq: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/f8c1124c",
    mycricket: "http://mycricket.cricket.com.au/home.aspx?entityid=57&save=0",
    facebook: "https://www.facebook.com/bhrdca",
    instagram: "https://www.instagram.com/bhrdca1/",
    cv: "https://www.cricketvictoria.com.au/",
    ca: "https://www.cricket.com.au/"
  };

  var assoc = {
    name: "Box Hill Reporter District Cricket Association",
    short: "BHRDCA",
    tagline: "Melbourne's east. 139 seasons of cricket.",
    established: "1890/91",
    reg: "Registered with Consumer Affairs Victoria — BOX HILL REPORTER DISTRICT CRICKET ASSOCIATION INC. Registered 26/9/1995, Registration #A0032112P.",
    postal: "PO Box 7017, Sth Croydon VIC 3136",
    blurb: "The BHRDCA is an amateur ‘hard wicket’ cricket association centred around Melbourne’s eastern suburbs, first established in 1890/91. It can lay claim to being the longest-running cricket association in Victoria, supporting Junior Boys & Girls, Senior, Women’s and Veterans (Over 40 & Over 50) competitions — more than 3,500 cricketers of all ages and abilities playing every week."
  };

  // Homepage headline stats (from the live site's "BHRDCA Community" band)
  var stats = [
    { n: "29",   label: "Clubs" },
    { n: "127",  label: "Men's & Women's Teams" },
    { n: "103",  label: "Boys & Girls Teams" },
    { n: "14",   label: "Veterans Teams" },
    { n: "3,500", label: "Overall Players" }
  ];

  // Association administration contacts (2026/27)
  var committee = [
    { role: "President", name: "Peter Rosenthal", phone: "enc:MzQ2IDQ0OCA3MDQw", email: "enc:bW9jLmxpYW1nQHRuZWRpc2VycC5hY2RyaGI=" },
    { role: "Vice President", name: "Ross Kainey", phone: "enc:NDc1IDgyOCA3NTQw", email: "enc:bW9jLmRub3BnaWJAeWVuaWFrLnNzb3I=" },
    { role: "Treasurer", name: "Lynda Richardson", phone: "enc:ODg4IDQ4NyA5OTQw", email: "enc:bW9jLmxpYW1nQHJlcnVzYWVydC5hY2RyaGI=" },
    { role: "Marketing & Sponsorship Manager", name: "Jo Fairy", phone: "enc:NDMzIDMxMyAxMTQw", email: "enc:dWEubW9jLndlaXZmb2RsZWlmQG9q" },
    { role: "Media Manager", name: "Paul Hooper", phone: "enc:MTE4IDk4NyAwMjQw", email: "enc:bW9jLmxpYW1nQGFpZGVtLmFjZHJoYg==" },
    { role: "Junior Section Manager", name: "Michael Crooks", phone: "enc:NzE3IDMwNiA0MTQw", email: "enc:bW9jLmxpYW1nQHJlZ2FuYW1yb2ludWouYWNkcmhi" },
    { role: "Veterans Section Manager", name: "Michael Whitehead", phone: "enc:MzgxIDMyNSA5MTQw", email: "enc:bW9jLm5zbUA5MTBfa2NpbQ==" },
    { role: "Competition Administrator", name: "Beau Nixon", phone: "enc:NjQ4OCA1ODA5IDMgMTY=", email: "enc:dWEubW9jLmFpcm90Y2l2dGVrY2lyY0Bub3hpbmI=" },
    { role: "Chairman, BHRDCA Umpires Assoc.", name: "Phil Hermann", phone: "enc:MjQ2IDQ4MyAyMDQw", email: "enc:bW9jLmxpYW10b2hAZW5uYWlkbm5hbXJlaA==" },
    { role: "Secretary, BHRDCA Umpires Assoc.", name: "Michael Moon", phone: "enc:MzgwIDk5MSAxODQw", email: "enc:bW9jLmxpYW1nQDUyMDJhdWNkcmhieXJhdGVyY2Vz" },
    { role: "Auditor", name: "David Woollard", phone: "", email: "" }
  ];

  var subCommittees = [
    { name: "Disciplinary Tribunal", members: ["David Cowell", "Don Edwards", "Andrew Gill", "Ross Kainey", "Michael Long", "Kevin Rose’meyer"] },
    { name: "Heritage Committee", members: ["Stephen Tully — Chairman", "Andy Lambert — Historian", "Tristan Davidson (ECA)", "Michael Dwyer", "Warren Earl", "John Toogood", "Nick Tsiotinas", "Michael Van Zuyden"] },
    { name: "Umpire Appointments Committee", members: ["Trevor McGary — Umpires Appointments"] }
  ];

  // Playing sections
  var sections = {
    juniors: {
      key: "juniors", name: "Juniors", icon: "ti-friends",
      blurb: "Boys & Girls cricket across more than 20 junior grades, playing Friday nights, Saturday and Sunday mornings. New players are always welcome — contact the Junior Section Manager or your local club.",
      contacts: [
        { role: "Junior Section Manager", name: "Michael Crooks", phone: "enc:NzE3IDMwNiA0MTQw", email: "enc:bW9jLmxpYW1nQHJlZ2FuYW1yb2ludWouYWNkcmhi" }
      ],
      resources: [
        { label: "Junior Competition Rules", url: "/documents/bhrdca-junior-competition-rules-2025-26.pdf" },
        { label: "Coaches Code of Behaviour", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_9ced7a2e55504257a291b053bc9b183f.pdf" },
        { label: "U12 Rules Summary", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_3e47dc29944f4aaf91a5e279d98e4b12.pdf" },
        { label: "U14 Rules Summary", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_569e03d05715420b90b2d1abeb46df64.pdf" },
        { label: "U16/U18 Rules Summary", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_40aa10fece5346adb0e3f8a6ecdc63d5.pdf" },
        { label: "Cricket Balls Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_11456fc48f1143edbf258809b8f16018.pdf" },
        { label: "Attire Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_e2b1db03d3ef4a0db42503a42e67f1f1.pdf" },
        { label: "Code of Conduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_349388776e5e43a388d75e40d44e2ca3.pdf" },
        { label: "Social Media Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_912cee1e6e4741c58bd9abd93c09caaf.pdf" },
        { label: "Tribunal Procedures", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_bfa25359e9824b2dbf2a0a281ff68df3.pdf" },
        { label: "Appeal Procedure", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_9651cf1343e2469ba7efde29f56bb08f.pdf" },
        { label: "Refund Policy", url: "https://www.bhrdca.com.au/_files/ugd/23872a_aadd89f9e6d3497fab7924f41e9e9679.docx?dn=BHRDCA%20Refund%20Policy.docx" },
        { label: "Tribunal Summary Sheet", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_0ba2afa322954774a132ab36fdad4998.pdf" },
        { label: "Extreme Weather Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9052c8216d2446129a3bf7f38118c93a.pdf" },
        { label: "eScoring Quick Reference", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0a48d47e86914ee4827dab65c048a9e1.pdf" },
        { label: "Child Safety Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_a5c18eda506246c7810af79585a2c228.pdf" },
        { label: "Conduct / Incident Form", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_077859f9c52b4e9699d8aada4fd2f586.pdf" },
        { label: "Procedure for Reports", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_5a4e2848560a423d8e086888abd99986.pdf" },
        { label: "Player Misconduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9d2adb3233c046f4915f8bcfb1f28f88.pdf" },
        { label: "Match Ratio Ladder", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_5f3fa6f25ba148d99f1d3effb27e364a.xlsx?dn=Match-Ratio-Ladder-22-23.xlsx" },
        { label: "Junior Dispensation Form", url: "https://forms.cloud.microsoft/pages/responsepage.aspx?id=0D83hL-_4EasEee-C1iddxsgAZ5m1TxIi_rcBtyQ2LZUNENHOUlCRVRUNDlHR01IV1lIR1NGTUtPSC4u&route=shorturl" },
        { label: "Player Registration Form", url: "/documents/bhrdca-player-registration-form.docx" }
      ]
    },
    seniors: {
      key: "seniors", name: "Seniors", icon: "ti-trophy", image: "/gallery/full/img-17-9-12-t20-a-glen-waverley-hawks-v-bhnsk18.webp",
      blurb: "More than 12 Senior grades on Saturdays, plus a mid-week twilight T20 competition. For information on Senior cricket, contact the Competition Assistant or your local club.",
      contacts: [ { role: "Senior Cricket", name: "Beau Nixon", phone: "enc:NjQ4OCA1ODA5IDMgMTY=", email: "enc:dWEubW9jLmFpcm90Y2l2dGVrY2lyY0Bub3hpbmI=" } ],
      resources: [
        { label: "Senior Playing Conditions", url: "/documents/bhrdca-senior-competition-playing-rules-2025-26.docx" },
        { label: "T20 Playing Conditions", url: "/documents/bhrdca-t20-rules-2025-26.pdf" },
        { label: "Cricket Balls Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_11456fc48f1143edbf258809b8f16018.pdf" },
        { label: "Attire Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_e2b1db03d3ef4a0db42503a42e67f1f1.pdf" },
        { label: "Code of Conduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_349388776e5e43a388d75e40d44e2ca3.pdf" },
        { label: "Social Media Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_912cee1e6e4741c58bd9abd93c09caaf.pdf" },
        { label: "Tribunal Procedures", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_bfa25359e9824b2dbf2a0a281ff68df3.pdf" },
        { label: "Appeal Procedure", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_9651cf1343e2469ba7efde29f56bb08f.pdf" },
        { label: "Refund Policy", url: "https://www.bhrdca.com.au/_files/ugd/23872a_aadd89f9e6d3497fab7924f41e9e9679.docx?dn=BHRDCA%20Refund%20Policy.docx" },
        { label: "Tribunal Summary Sheet", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_0ba2afa322954774a132ab36fdad4998.pdf" },
        { label: "Extreme Weather Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9052c8216d2446129a3bf7f38118c93a.pdf" },
        { label: "eScoring Quick Reference", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0a48d47e86914ee4827dab65c048a9e1.pdf" },
        { label: "Player Movement & Finals Eligibility", url: "https://www.bhrdca.com.au/_files/ugd/23872a_eb1c0f22c20046dea1a837e53dd9aaaa.pdf" },
        { label: "MCC Laws of Cricket", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
        { label: "Cricket Australia Rules & Regulations", url: "https://www.cricketaustralia.com.au/cricket/rules-and-regulations" },
        { label: "Conduct / Incident Form", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_8c354e48b16b4a07bfb8bf72fff6a6ac.pdf" },
        { label: "Player Misconduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9d2adb3233c046f4915f8bcfb1f28f88.pdf" },
        { label: "Procedure for Reports", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_5a4e2848560a423d8e086888abd99986.pdf" },
        { label: "Match Ratio Ladder", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_10d948ddf40a4866a52670774b88e5eb.pdf" },
        { label: "Set Penalty Table", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_3d02542eca8645d0906faf70e22a0136.pdf" },
        { label: "Captains Report — Umpires (PDF)", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_7d55ca1b533a47c6a8c032c3abb8b1b4.pdf" },
        { label: "Captains Report — Umpires (Word)", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_1a82fd1762734f3383631acfadb2c0d2.docx" },
        { label: "Player Permit Form — Senior Saturday (PDF)", url: "https://www.bhrdca.com.au/_files/ugd/23872a_adcac4869df9403796238023dcd2391b.pdf" },
        { label: "Player Permit Form — Senior Saturday (Word)", url: "https://www.bhrdca.com.au/_files/ugd/23872a_86e15ef497a846ed84f0c5a50e2d9e8f.docx" },
        { label: "Player Permit Form — Senior Tuesday (PDF)", url: "https://www.bhrdca.com.au/_files/ugd/23872a_d2d35a8336da44e591fac00078c70ebd.pdf" },
        { label: "Player Permit Form — Senior Tuesday (Word)", url: "https://www.bhrdca.com.au/_files/ugd/23872a_76f630719870446189b843d50794907a.docx" },
        { label: "Senior Dispensation Form", url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=0D83hL-_4EasEee-C1iddxsgAZ5m1TxIi_rcBtyQ2LZUREpUQTc3T0NYNURXR0xFT1lNU1M4OTRFRS4u" },
        { label: "Insurance — Make a Claim", url: "https://www.au.marsh.com/sport/make-a-claim.html" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" }
      ]
    },
    womens: {
      key: "womens", name: "Women's", icon: "ti-cricket",
      blurb: "Women’s and girls’ cricket is a growing part of the BHRDCA. For information on Women’s cricket, get in touch with our Women’s Cricket contact.",
      contacts: [ { role: "Women's Cricket", name: "Lynda Richardson", phone: "enc:ODg4IDQ4NyA5OTQw", email: "enc:bW9jLmxpYW1nQHRla2NpcmNlbGFtZWYuYWNkcmhi" } ],
      resources: [
        { label: "Senior Women's Rules (EGWC)", url: "https://egwc.au/images/documents/EGWC-S-2025_26-Senior-Womens-Rules.pdf" },
        { label: "Social Media Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0168cb7a77b84842a3da5136626c8378.pdf" },
        { label: "eScoring Quick Reference", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0a48d47e86914ee4827dab65c048a9e1.pdf" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" }
      ]
    },
    veterans: {
      key: "veterans", name: "Veterans", icon: "ti-medal", image: "/gallery/full/img-14-7-12-vets-action000000149.webp",
      blurb: "Over 40 & Over 50 Veterans cricket across 8 grades, played Sunday afternoons. A great way to keep playing the game you love.",
      contacts: [ { role: "Veterans Cricket", name: "Michael Whitehead", phone: "enc:MzgxIDMyNSA5MTQw", email: "enc:bW9jLm5zbUA5MTBfa2NpbQ==" } ],
      resources: [
        { label: "Veteran Playing Conditions", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_42cd9ab70d2d44f19f7218b26080d128.pdf" },
        { label: "Cricket Balls Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_11456fc48f1143edbf258809b8f16018.pdf" },
        { label: "Attire Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_e2b1db03d3ef4a0db42503a42e67f1f1.pdf" },
        { label: "Code of Conduct", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_bc36287868774147900c51df2b827756.pdf" },
        { label: "Social Media Policy", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0168cb7a77b84842a3da5136626c8378.pdf" },
        { label: "Tribunal Procedures", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_bfa25359e9824b2dbf2a0a281ff68df3.pdf" },
        { label: "Appeal Procedure", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_9651cf1343e2469ba7efde29f56bb08f.pdf" },
        { label: "Extreme Weather Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9052c8216d2446129a3bf7f38118c93a.pdf" },
        { label: "eScoring Quick Reference", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_0a48d47e86914ee4827dab65c048a9e1.pdf" },
        { label: "Conduct / Incident Form", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_6c854729034443cbb1e721c3a9652fd9.pdf" },
        { label: "Player Misconduct", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_1c5d5488f32548429f70137ca05d55ff.pdf" },
        { label: "Procedure for Reports", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_5a4e2848560a423d8e086888abd99986.pdf" },
        { label: "Match Ratio Ladder", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_5f3fa6f25ba148d99f1d3effb27e364a.xlsx?dn=Match-Ratio-Ladder-22-23.xlsx" },
        { label: "Set Penalty Table", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_3d02542eca8645d0906faf70e22a0136.pdf" }
      ]
    },
    umpires: {
      key: "umpires", name: "Umpires", icon: "ti-gavel",
      blurb: "The BHRDCA Umpires Association (BHRDCA UA) supports and appoints umpires across the competition. New umpires and officials are always welcome.",
      contacts: [
        { role: "UA President", name: "Phil Hermann", phone: "enc:MjQ2IDQ4MyAyMDQw", email: "enc:bW9jLmxpYW10b2hAZW5uYWlkbm5hbXJlaA==" },
        { role: "UA Secretary", name: "Mick Moon", phone: "enc:MzgwIDk5MSAxODQw", email: "enc:bW9jLmxpYW1nQDUyMDJhdWNkcmhieXJhdGVyY2Vz" },
        { role: "Umpires Appointments", name: "Trevor McGarry", phone: "enc:Njc2IDc4MiA4ODQw", email: "enc:bW9jLmxpYW1nQDZ5cmFnY21yb3ZlcnQ=" }
      ],
      resources: [
        { label: "Umpire Fees", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_28f8655c4480433980a6d9a94363414f.pdf" },
        { label: "Senior Playing Conditions", url: "/documents/bhrdca-senior-competition-playing-rules-2025-26.docx" },
        { label: "Veteran Playing Conditions", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_42cd9ab70d2d44f19f7218b26080d128.pdf" },
        { label: "Junior Playing Conditions", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_a32c999446a14cca9d265145f40d0e65.pdf" },
        { label: "T20 Playing Conditions", url: "/documents/bhrdca-t20-rules-2025-26.pdf" },
        { label: "Cricket Balls Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_965f34c8c0484aa5a24da7039a8dc84c.pdf" },
        { label: "Attire Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_61d2f33b1d524aaaa53feb075c71bf13.pdf" },
        { label: "Code of Conduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_d3549f8829e84d08a5b8c04ec8e4fc00.pdf" },
        { label: "Social Media Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_912cee1e6e4741c58bd9abd93c09caaf.pdf" },
        { label: "Appeal Procedure", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_9651cf1343e2469ba7efde29f56bb08f.pdf" },
        { label: "Tribunal Procedures", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_bfa25359e9824b2dbf2a0a281ff68df3.pdf" },
        { label: "Tribunal Summary Sheet", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_0ba2afa322954774a132ab36fdad4998.pdf" },
        { label: "Extreme Weather Policy", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9052c8216d2446129a3bf7f38118c93a.pdf" },
        { label: "MCC Laws of Cricket", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
        { label: "Cricket Australia Rules & Regulations", url: "https://www.cricketaustralia.com.au/cricket/rules-and-regulations" },
        { label: "Conduct / Incident Form", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_077859f9c52b4e9699d8aada4fd2f586.pdf" },
        { label: "Player Misconduct", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_9d2adb3233c046f4915f8bcfb1f28f88.pdf" },
        { label: "Procedure for Reports", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_5a4e2848560a423d8e086888abd99986.pdf" },
        { label: "Match Ratio Ladder", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_10d948ddf40a4866a52670774b88e5eb.pdf" },
        { label: "Set Penalty Table", url: "https://www.bhrdca.com.au/_files/ugd/c846e3_3d02542eca8645d0906faf70e22a0136.pdf" },
        { label: "Umpires Match Report (PDF)", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_1bca2301c0fb4e43987e7c4ab8de2cfa.pdf" },
        { label: "Umpires Match Report (Word)", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_0f3d380c322f4514836566beab32ca22.docx" },
        { label: "Insurance — Make a Claim", url: "https://au.marsh.com/sport/make-a-claim.html" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" }
      ]
    }
  };

  // Junior Rep Cricket — duplicates the Juniors section content under its own title.
  sections.juniorRep = Object.assign({}, sections.juniors, { key: "juniorRep", name: "Junior Rep" });

  // Member clubs (recognised on the association's "Our Clubs" wall) with websites.
  // NOTE: full 28-club member set + official club logos to be confirmed with BHRDCA.
  var clubs = [
    { name: "Blackburn", url: "https://www.blackburn.org.au/", logo: "/club-logos/blackburn.png", grades: ["M", "F", "J"] },
    { name: "Blackburn North", url: "http://blackburnnorth.vic.cricket.com.au/", logo: "/club-logos/blackburn-north.png", grades: ["M", "F", "J"] },
    { name: "Blackburn South", url: "http://blackburnsouthcc.com.au/", logo: "/club-logos/blackburn-south.png", grades: ["M", "F", "J"] },
    { name: "Box Hill North Super Kings", url: "https://www.facebook.com/BoxHillNorthSuperKingsCricketClub/", logo: "/club-logos/box-hill-north-super-kings.webp", grades: ["M"] },
    { name: "Bulleen-Templestowe", url: "https://www.bulleentemplestowecc.com/", logo: "/club-logos/bulleen-templestowe.png", grades: ["M", "J"] },
    { name: "Burwood District", url: "http://bdcc.vic.cricket.com.au/", logo: "/club-logos/burwood-district.webp", grades: ["M"] },
    { name: "Deakin", url: "http://deakin.vic.cricket.com.au/", logo: "/club-logos/deakin.webp", grades: ["M"] },
    { name: "Doncaster", url: "http://www.doncastercc.com.au/", logo: "/club-logos/doncaster.webp", grades: ["M", "J"] },
    { name: "East Box Hill", url: "http://eastboxhill.vic.cricket.com.au/", logo: "/club-logos/east-box-hill.png", grades: ["M", "F", "J"] },
    { name: "East Burwood", url: "http://ebcc.vic.cricket.com.au/", logo: "/club-logos/east-burwood.webp", grades: ["M", "F", "J"] },
    { name: "Forest Hill", url: "http://www.foresthillcc.com.au/", logo: "/club-logos/forest-hill.webp", grades: ["M", "F", "J"] },
    { name: "Glen Waverley", url: "https://www.glenwaverleycc.com", logo: "/club-logos/glen-waverley.jpg", grades: ["M", "F", "J"] },
    { name: "Glen Waverley Cougars", url: "https://cougars.net.au/?page_id=298", logo: "/club-logos/glen-waverley-cougars.jpeg", grades: ["M", "F", "J"] },
    { name: "Kerrimuir United", url: "http://kerrimuircc.com.au/", logo: "/club-logos/kerrimuir-united.webp", grades: ["M", "F", "J"] },
    { name: "Koonung Heights", url: "http://www.koonungheightscc.com/", logo: "/club-logos/koonung-heights.png", grades: ["M", "F", "J"] },
    { name: "Laburnum", url: "http://laburnumcc.vic.cricket.com.au/", logo: "/club-logos/laburnum.png", grades: ["M", "F", "J"] },
    { name: "Mitcham", url: "https://www.mitcham.cc/", logo: "/club-logos/mitcham.webp", grades: ["M", "F", "J"] },
    { name: "Mulgrave", url: "https://www.mulgravecricketclub.com.au/", logo: "/club-logos/mulgrave.png", grades: ["M", "J"] },
    { name: "Notting Hill / Brandon Park", url: "http://nhbpcc.vic.cricket.com.au/", logo: "/club-logos/notting-hill-brandon-park.webp", grades: ["M", "F", "J"] },
    { name: "Nunawading", url: "https://nunawadingcc.com/", logo: "/club-logos/nunawading.jpg", grades: ["M", "F", "J"] },
    { name: "Park Orchards", url: "https://pocc.com.au/", logo: "/club-logos/park-orchards.png", grades: ["M", "J"] },
    { name: "St David's", url: "https://www.stdavidscc.com/", logo: "/club-logos/st-davids.png", grades: ["M", "F", "J"] },
    { name: "Templestowe", url: "https://www.templestowecc.com/", logo: "/club-logos/templestowe.png", grades: ["M", "F", "J"] },
    { name: "Eley Park", url: "https://www.epcc.com.au/", logo: "/club-logos/eley-park.webp", grades: ["M"] },
    { name: "Glen Waverley Hawks", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/f8c1124c", logo: "/club-logos/glen-waverley-hawks.webp", grades: ["M", "F", "J"] },
    { name: "Monash Morrow", url: "https://monashmorrowcc.org/", logo: "/club-logos/monash-morrow.webp", grades: ["M", "F", "J"] },
    { name: "Mulgrave Wheelers Hill", url: "https://www.mwhcc.com.au/", logo: "/club-logos/mulgrave-wheelers-hill.webp", grades: ["M", "F", "J"] },
    { name: "Vermont South", url: "https://www.vscc.com.au/", logo: "/club-logos/vermont-south.webp", grades: ["M", "F", "J"] },
    { name: "Wyclif", url: "https://www.wyclif.com.au/", logo: "/club-logos/wyclif.webp", grades: ["M", "F", "J"] },
    { name: "Yarraleen", url: "https://www.yarraleencc.com.au/", logo: "/club-logos/yarraleen.webp", grades: ["M", "J"] }
  ];

  // Full club contact directory (all affiliated clubs — 2026/27). From live site.
  var clubContacts = [
    ["Ainslie Park","Karen Ridley","enc:MTI0IDg0NCA4NDQw",""],
    ["Blackburn","Amanda Crossland","enc:MTg1IDY1MyA5MTQw","enc:dWEuZ3JvLm5ydWJrY2FsYkBzcm9pbnVq"],
    ["Blackburn South","Sonya O'Farrell","enc:Njc0IDYyMSA2MTQw","enc:bW9jLmxpYW1nQGxsZXJyYWZvYXlub3M="],
    ["Box Hill North Super Kings","Jessie Fernando","enc:OTQxIDA4MyA5MTQw","enc:dWEubW9jLnltZWRhY2F0ZWtjaXJjc2duaWtyZXB1c0Byb3Rhbmlkcm9vY3JvaW51ag=="],
    ["Bulleen-Templestowe","Tim Moran","enc:OTM1IDIwNSA4MzQw","enc:bW9jLmxpYW1nQG5hcm9tLnMubWl0"],
    ["Burwood Districts","Abishek Pratap","enc:MjE2IDc1OSAyMDQw","enc:bW9jLmxpYW1nQDVoZ25pcy5wLmtlaHNpYmE="],
    ["Chirnside Park","David Hughes","enc:ODQ5IDEwNSA4MTQw","enc:bW9jLm1lZmZlQHNlaGd1aC5iLmRpdmFk"],
    ["Doncaster","Stephen Mears","enc:NjY0IDg3NyA4MzQw","enc:bW9jLmRub3BnaWJAc3JhZW10cw=="],
    ["Donvale","Steve Darmody","","enc:bW9jLmxpYW1nQHlyYXRlcmNlc2VsYXZub2Q="],
    ["East Box Hill","Paul Byrne","enc:NDk2IDc2NCA0MTQw","enc:bW9jLmNjaGJlQHNyb2ludWo="],
    ["East Burwood","Rob Robinson","enc:ODE1IDM3NyAzMzQw","enc:dWEubW9jLm9vaGF5QGxhY3Nhcm9zbmlib3Jmcg=="],
    ["East Ringwood","Ben Taylor","enc:ODE4IDQ0MyA3MDQw","enc:bW9jLmxpYW1nQGNjamRvb3dnbmlydHNhZQ=="],
    ["Eildon Park","Brad Wilkins","enc:NzA2IDM0MiAwOTQw","enc:bW9jLmxpYW1nQHNyb2ludWpjY3Bl"],
    ["Ferntree Gully Cricket Club","David Anstey","enc:MTAzIDI1MSA5MzQw","enc:dWEubW9jLnNtZXRzeXNhbW9AeWV0c25hLmRpdmFk"],
    ["Ferntree Gully Footballers Cricket Club","Thomas Searle","","enc:bW9jLmxpYW1nQGNjc3JlbGxhYnRvb2Z5cmF0ZXJjZXM="],
    ["Forest Hill","Marcus Ward","enc:NzAxIDIwOCAyMTQw","enc:dWEubW9jLmNjbGxpaHRzZXJvZkBzcm9pbnVq"],
    ["Glen Waverley","Paul Connaughton","enc:OTY5IDYzOSA4MDQw","enc:bW9jLmxpYW1nQGNjd2cuc3JvaW51ag=="],
    ["Glen Waverley Cougars","Graham Oppy","","enc:dWRlLmhzYW5vbUB5cHBvLm1haGFyZw=="],
    ["Glen Waverley Hawks","Cameron Hocart","enc:MjM4IDMzMSA5MTQw","enc:bW9jLmxpYW10b2hAdHJhY29obWFj"],
    ["Heatherdale","Justin Box","enc:NTE5IDIwNSA4MzQw","enc:dWEubW9jLmJ1bGN0ZWtjaXJjZWxhZHJlaHRhZWhAc3JvaW51ag=="],
    ["Heathmont","Trent Carr","enc:MDg0IDY5MiA0MTQw","enc:dWEuZ3JvLmNjdG5vbWh0YWVoQHNyb2ludWo="],
    ["Kerrimuir United","Michael Walsh","enc:MDc1IDU0NSA3NTQw","enc:bW9jLmxpYW1nQHNyb2ludWpjY3Vr"],
    ["Knox City","Naish Gadani","enc:Njk1IDY0MyAzMjQw","enc:bW9jLmxpYW1nQGluYWRhZy5oZGFoc2lhbg=="],
    ["Koonung Heights","Matthew Christensen","enc:OTAyIDIyMiAxMDQw","enc:bW9jLnRuZW10aXVyY2VyZXN1ZkBuZXNuZXRzaXJoY20="],
    ["Laburnum","Michaela Thompson","enc:MDE0IDAwNCA5MzQw","enc:bW9jLmxpYW1nQGJ1bGN0ZWtjaXJjbXVucnViYWwuc3JvaW51ag=="],
    ["Lysterfield","Michelle Doherty","","enc:bW9jLmxpYW1nQGJ1bGN0ZWtjaXJjbXVucnViYWwuc3JvaW51ag=="],
    ["Manningham","Liam O'Brien","enc:OTg2IDI5OSA5MzQw","enc:bW9jLmxpYW1nQG5laXJiby5yLm1haWw="],
    ["Mazenod","Simon Dresser","enc:MTQzIDczOCA0MjQw","enc:bW9jLmxpYW1nQHNyb2ludWpjY2NvbQ=="],
    ["Mitcham","Steve Tully","enc:NzYyIDI5MiAwMzQw","enc:Y2MubWFoY3RpbUBzcm9pbnVq"],
    ["Monash Cricket Club","David James","enc:MzgxIDU5MyA5MTQw","enc:bW9jLmxpYW10b2hAcmVwcG9jX2lrc19kaXZhZA=="],
    ["Monash Glen Waverley Junior Cricketers","","","enc:bW9jLmxpYW1nQHRla2NpcmNqd2c="],
    ["Mountain Gate Cricket Club","Nathan Giulieri","enc:MjMyIDk0OSA2MDQw","enc:bW9jLmxpYW10b2hAMTNub3RscG1ldA=="],
    ["Mulgrave - Wheelers Hill","Dilan Liyanage","enc:MTEzIDY4NSAyMzQw","enc:bW9jLmxpYW1nQHJvaW51amNjaHdt"],
    ["Mulgrave Cricket Club","Samuel Rupasinghe","","enc:dWEubW9jLmJ1bGN0ZWtjaXJjZXZhcmdsdW1AeXJhdGVyY2Vz"],
    ["North Ringwood","Mark Wilkie","enc:NzEwIDM2NSA4MzQw","enc:dWEubW9jLnRzZXRibGVtQGtyYW0="],
    ["Notting Hill / Brandon Park","Chris Hipwell","enc:OTAzIDMyOSA5OTQw","enc:bW9jLmxpYW10b2hAbGxld3BpaC5zaXJoYw=="],
    ["Nunawading","Rob Nurse","enc:MTY3IDM0MSAxNTQw","enc:bW9jLmNjZ25pZGF3YW51bkBzcm9pbnVq"],
    ["Park Orchards","Dean Kruger","enc:ODUyIDAxMSA3MTQw","enc:dWEubW9jLnByb2NyZWd1cmtAbmFlZA=="],
    ["South Warrandyte Hawks","Josh Exley","enc:Mzk0IDY2MCA2MDQw","enc:bW9jLmxpYW10b2hAeWVseGUuaHNvag=="],
    ["St Andrew's","Shane Mayoh","enc:MDI3IDY5MiA2MTQw","enc:bW9jLmxpYW1nQHJuai5jY3N3ZXJkbmF0cw=="],
    ["St David's","Paul Newman","enc:MTE3IDExNSA5MTQw","enc:dWEudGVuLmRub3BnaWJAMzN5bW1hcw=="],
    ["Surrey Hills","Barry Cull","","enc:bW9jLmxpYW1nQGxsdWNhenphYg=="],
    ["Templestowe","Gavin Dimitri","enc:MDgzIDgwMyAxNTQw","enc:bW9jLmtvb2x0dW9AaXJ0aW1pZC5uaXZhZw=="],
    ["Templeton","Steve Tasevski","enc:MTg4IDYxNSAwMTQw","enc:dWEubW9jLmNjbm90ZWxwbWV0QHNyb2ludWo="],
    ["Upway-Tecoma","Rebecca Jewell","enc:MTk4IDAyMSAyMDQw","enc:bW9jLmtvb2x0dW9AMTBsbGV3ZWphY2NlYmVy"],
    ["Vermont Cricket Club","Martin Doddrell","enc:ODI5IDgzMSA3MTQw","enc:dWEubW9jLnRla2NpcmN0bm9tcmV2QHNyb2ludWo="],
    ["Vermont South","Jason Seedy","enc:MjU2IDM0MCAyMTQw","enc:dWEubW9jLnRlbnN1dHBvQHlkZWVzbm9zYWo="],
    ["Warrandyte","Kris Trevena","enc:MzIyIDA2OCA5MDQw","enc:bW9jLmtvb2x0dW9AYW5ldmVydC5zaXJr"],
    ["Wyclif","Christina Griffin","enc:Njk5IDUwMyA3MTQw","enc:bW9jLmxpYW10b2hAMDJuaWZmaXJnYw=="],
    ["Yarraleen","Jack Dullard","enc:MTg2IDY3OCAyMTQw","enc:dWEubW9jLmNjbmVlbGFycmF5QHNyb2ludWo="]
  ].map(function (r) { return { club: r[0], contact: r[1], number: r[2], email: r[3] }; });

  // Sponsors & partners (from the association's sponsor wall)
  var sponsors = [
    { name: "Century Cricket Centre", url: "https://www.cricketcentre.com.au/", tier: "Premier", logo: "/sponsor-logos/century-cricket-centre.webp", plate: true },
    { name: "Kookaburra Sport", url: "https://www.kookaburrasport.com.au/cricket/", tier: "Premier", logo: "/sponsor-logos/kookaburra-sport.webp" },
    { name: "Cricket Victoria", url: "https://www.cricketvictoria.com.au/", tier: "Premier", logo: "/sponsor-logos/cricket-victoria.webp", plate: true },
    { name: "Field of View Sports Photography", url: "https://www.fieldofview.com.au/", tier: "Premier", logo: "/sponsor-logos/field-of-view.webp" },
    { name: "SportsWeb Australia", url: "https://sportsweb.com.au", tier: "Premier", logo: "/sponsor-logos/sportsweb-one.webp" },
    { name: "Topline Cricket", url: "https://www.toplinecricket.com.au/", tier: "Partner", logo: "/sponsor-logos/topline-cricket.webp", plate: true },
    { name: "Top Notch Trophies", url: "https://www.topnotchtrophies.com.au/", tier: "Partner", logo: "/sponsor-logos/top-notch-trophies.webp", plate: true },
    { name: "Box Hill Indoor Sports", url: "https://boxhillindoorsports.com.au/sports-and-activities/indoor-cricket/", tier: "Partner", logo: "/sponsor-logos/box-hill-indoor-sports.webp" },
    { name: "Geyer Accountants", url: "https://geyeraccountants.com.au/", tier: "Partner", logo: "/sponsor-logos/geyer-accountants.webp" },
    { name: "Community Bank Inner East · Bendigo Bank", url: "https://www.bendigobank.com.au/", tier: "Partner", logo: "/sponsor-logos/bendigo-bank.webp" },
    { name: "Grant Professionals & Club Builder", url: "https://www.club-builder.com.au/", tier: "Partner", logo: "/sponsor-logos/club-builder.webp", plate: true },
    { name: "Club Connect", url: "https://clubconnect.net.au", tier: "Partner", logo: "/sponsor-logos/club-connect.webp" },
    { name: "Altegra", url: "https://www.altegra.com.au/", tier: "Community", logo: "/sponsor-logos/altegra.webp", plate: true },
    { name: "Good Sports", url: "https://goodsports.com.au/", tier: "Community", logo: "/sponsor-logos/good-sports.webp" },
    { name: "Child Safe", url: "https://www.childsafe.org.au/", tier: "Community", logo: "/sponsor-logos/child-safe.svg" },
    { name: "Compare & Connect", url: "https://www.compareandconnect.com.au/", tier: "Premier", logo: "/sponsor-logos/compare-and-connect.webp" },
    { name: "LCF Linemarking & Logos", url: "https://grassup.com.au/services", tier: "Partner", logo: "/sponsor-logos/lcf-linemarking.webp", plate: true },
    { name: "Modern Orthodontics", url: "https://www.modernorthodontics.com.au/", tier: "Premier", logo: "/sponsor-logos/modern-orthodontics.webp" },
    { name: "3WBC Radio", url: "https://www.3wbc.org.au/shows/the-cordon/", tier: "Community", logo: "/sponsor-logos/3wbc-radio.webp" }
  ];

  var history = [
    { label: "Heritage", desc: "The BHRDCA story since 1890/91.", icon: "ti-books", url: "/documents/bhrdca-heritage.pdf" },
    { label: "Office Bearers", desc: "Past presidents, secretaries and officials.", icon: "ti-users", url: "https://www.bhrdca.com.au/_files/ugd/bad3dd_61d23488e3a74922a34e415c7f9dc0ac.pdf" },
    { label: "BHRDCA Records", desc: "Statistical and historical records, 1890/91 to 1985/86.", icon: "ti-chart-bar", url: "/documents/bhrdca-records-1890-1985-86.pdf" },
    { label: "BHRDCA Statistics", desc: "Batting, bowling and premiership records, 2008/09 to 2025/26.", icon: "ti-chart-histogram", url: "/documents/bhrdca-statistics-2008-2026.pdf" },
    { label: "Premiership Count", desc: "129 seasons of Top Grade premiership winners, since 1890/91.", icon: "ti-trophy-filled", url: "/documents/bhrdca-premiership-count.pdf" },
    { label: "Life Members", desc: "Those honoured for outstanding service.", icon: "ti-award", url: "https://www.bhrdca.com.au/_files/ugd/df7f61_583c74764c6a49b5bf64665cf87a8178.pdf" },
    { label: "Biographies", desc: "Profiles of the people who shaped the Association.", icon: "ti-user-star", url: "/biographies.html" },
    { label: "Hall of Fame", desc: "The BHRDCA's most celebrated cricketers.", icon: "ti-trophy", url: "https://www.bhrdca.com.au/_files/ugd/23872a_a728ad62055d40ae85fb29d05e7a8794.pdf" }
  ];

  var childSafety = {
    officer: { role: "Child Safety & Complaints Manager", name: "Ross Kainey", phone: "enc:NDc1IDgyOCA3NTQw", email: "enc:bW9jLmRub3BnaWJAeWVuaWFrLnNzb3I=" },
    complaints: null,
    policies: [
      { label: "Australian Cricket’s Policy for Safeguarding Children & Young People", url: "https://resources.playcommunity.pulselive.com/playcommunity/document/2024/11/27/9ddd3384-e1e0-4488-9d3a-dc25eaeefa71/Australian-Cricket-s-Policy-for-Safeguarding-Children-Young-People.pdf" },
      { label: "Australian Cricket’s ‘Looking After Our Kids’ Code of Behaviour", url: "https://resources.playcommunity.pulselive.com/playcommunity/document/2024/11/27/7587ce1b-83d1-4c80-aa92-8d085ec1faf0/Australian-Cricket-s-Looking-After-Our-Kids-Code-of-Behaviour.pdf" },
      { label: "Australian Cricket’s Commitment to Safeguarding Children & Young People", url: "https://resources.playcommunity.pulselive.com/playcommunity/document/2024/11/27/850b4058-29f6-4d85-a3d8-b44202221d7c/Australian-Cricket-s-Statement-of-Commitment-for-Safeguarding-Children-and-Young-People.pdf" },
      { label: "Cricket Victoria’s Member Protection Policy", url: "https://www.cricketvictoria.com.au/wp-content/uploads/2024/11/2024-Member-Protection-Policy.pdf" },
      { label: "Child Safe & Member Protection — Cricket Victoria", url: "https://www.cricketvictoria.com.au/child-safe-member-protection/" }
    ]
  };

  return {
    assoc: assoc, links: links, stats: stats,
    committee: committee, subCommittees: subCommittees,
    sections: sections, clubs: clubs, clubContacts: clubContacts,
    sponsors: sponsors, history: history, childSafety: childSafety,
    clubsNote: "Member clubs shown with their websites and logos where available. Full member list and any remaining crests to be confirmed with the BHRDCA."
  };
})();
