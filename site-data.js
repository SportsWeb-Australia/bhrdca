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
    { role: "President", name: "Peter Rosenthal", phone: "0407 844 643", email: "bhrdca.president@gmail.com" },
    { role: "Vice President", name: "Ross Kainey", phone: "0457 828 574", email: "ross.kainey@bigpond.com" },
    { role: "Treasurer", name: "Lynda Richardson", phone: "0499 784 888", email: "bhrdca.treasurer@gmail.com" },
    { role: "Marketing & Sponsorship Manager", name: "Jo Fairy", phone: "0411 313 334", email: "jo@fieldofview.com.au" },
    { role: "Media Manager", name: "Paul Hooper", phone: "0420 789 811", email: "bhrdca.media@gmail.com" },
    { role: "Junior Section Manager", name: "Michael Crooks", phone: "0414 603 717", email: "bhrdca.juniormanager@gmail.com" },
    { role: "Veterans Section Manager", name: "Michael Whitehead", phone: "0419 523 183", email: "mick_019@msn.com" },
    { role: "Competition Administrator", name: "Beau Nixon", phone: "61 3 9085 8846", email: "bnixon@cricketvictoria.com.au" },
    { role: "Chairman, BHRDCA Umpires Assoc.", name: "Phil Hermann", phone: "0402 384 642", email: "hermanndianne@hotmail.com" },
    { role: "Secretary, BHRDCA Umpires Assoc.", name: "Michael Moon", phone: "0481 199 083", email: "secretarybhrdcua2025@gmail.com" }
  ];

  var subCommittees = [
    { name: "Disciplinary Tribunal", members: ["David Cowell", "Don Edwards", "Andrew Gill", "Ross Kainey", "Michael Long", "Kevin Rose’meyer"] },
    { name: "Heritage Committee", members: ["Stephen Tully — Chairman", "Andy Lambert — Historian", "Tristan Davidson (ECA)", "Michael Dwyer", "Warren Earl", "John Toogood", "Nick Tsiotinas", "Michael Van Zuyden"] }
  ];

  // Playing sections
  var sections = {
    juniors: {
      key: "juniors", name: "Juniors", icon: "ti-friends", image: "/sections/juniors-field.webp", imagePos: "center 50%",
      fixtures: [
        { label: "Junior Competition — Fixtures & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/bhrdca-junior-competition-summer-202627/383bad37" },
        { label: "Junior Girls — Fixtures & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/bhrdca-junior-girls-summer-202627/dc6ca9e3" }
      ],
      blurb: "Boys & Girls cricket across more than 20 junior grades, playing Friday nights, Saturday and Sunday mornings. New players are always welcome — contact the Junior Section Manager or your local club.",
      contacts: [
        { role: "Junior Section Manager", name: "Michael Crooks", phone: "0414 603 717", email: "bhrdca.juniormanager@gmail.com" }
      ],
      resources: [
        { label: "Coaches Code of Behaviour", url: "/documents/bhrdca-coaches-code-of-behaviour.pdf" },
        { label: "U12 Rules Summary", url: "/documents/bhrdca-u12-rules-summary.pdf" },
        { label: "U14 Rules Summary", url: "/documents/bhrdca-u14-rules-summary.pdf" },
        { label: "U16/U18 Rules Summary", url: "/documents/bhrdca-u16-u18-rules-summary.pdf" },
        { label: "Cricket Balls Policy", url: "/documents/bhrdca-cricket-balls-2026.pdf" },
        { label: "Attire Policy", url: "/documents/bhrdca-attire-policy.pdf" },
        { label: "2026 Competition Rules", url: "/documents/bhrdca-2026-competition-rules.pdf" },
        { label: "Code of Conduct", url: "/documents/bhrdca-code-of-conduct.pdf" },
        { label: "Social Media Policy", url: "/documents/bhrdca-social-media-policy.pdf" },
        { label: "Refund Policy", url: "/documents/bhrdca-refund-policy.docx" },
        { label: "Extreme Conditions Policy", url: "/documents/bhrdca-extreme-conditions-policy-oct2026.pdf" },
        { label: "eScoring Quick Reference", url: "/documents/bhrdca-escoring-quick-reference.pdf" },
        { label: "Child Safety Policy", url: "/documents/bhrdca-child-safety-policy.pdf" },
        { label: "Player Misconduct", url: "/documents/bhrdca-player-misconduct.pdf" },
        { label: "Tribunal Procedures", url: "/documents/bhrdca-tribunal-procedures.pdf" },
        { label: "Appeal Procedure", url: "/documents/bhrdca-appeal-procedure.pdf" },
        { label: "Procedure for Reports", url: "/documents/bhrdca-procedure-for-reports.pdf" },
        { label: "Set Penalty Table", url: "/documents/bhrdca-set-penalty-table.pdf" },
      ]
    },
    seniors: {
      key: "seniors", name: "Seniors", icon: "ti-trophy", image: "/gallery/full/img-17-9-12-t20-a-glen-waverley-hawks-v-bhnsk18.webp",
      fixtures: [{ label: "Fixtures, Results & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/bhrdca-senior-competition-summer-202627/77fbfe27" }],
      blurb: "More than 12 Senior grades on Saturdays, plus a mid-week twilight T20 competition. For information on Senior cricket, contact the Competition Assistant or your local club.",
      contacts: [ { role: "Senior Cricket", name: "Beau Nixon", phone: "61 3 9085 8846", email: "bnixon@cricketvictoria.com.au" } ],
      resources: [
        { label: "T20 Playing Conditions", url: "/documents/bhrdca-t20-rules-2025-26.pdf" },
        { label: "Cricket Balls Policy", url: "/documents/bhrdca-cricket-balls-2026.pdf" },
        { label: "Attire Policy", url: "/documents/bhrdca-attire-policy.pdf" },
        { label: "2026 Competition Rules", url: "/documents/bhrdca-2026-competition-rules.pdf" },
        { label: "Code of Conduct", url: "/documents/bhrdca-code-of-conduct.pdf" },
        { label: "Social Media Policy", url: "/documents/bhrdca-social-media-policy.pdf" },
        { label: "Tribunal Procedures", url: "/documents/bhrdca-tribunal-procedures.pdf" },
        { label: "Appeal Procedure", url: "/documents/bhrdca-appeal-procedure.pdf" },
        { label: "Refund Policy", url: "/documents/bhrdca-refund-policy.docx" },
        { label: "Extreme Conditions Policy", url: "/documents/bhrdca-extreme-conditions-policy-oct2026.pdf" },
        { label: "eScoring Quick Reference", url: "/documents/bhrdca-escoring-quick-reference.pdf" },
        { label: "MCC Laws of Cricket", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
        { label: "Cricket Australia Rules & Regulations", url: "https://www.cricketaustralia.com.au/cricket/rules-and-regulations" },
        { label: "Player Misconduct", url: "/documents/bhrdca-player-misconduct.pdf" },
        { label: "Procedure for Reports", url: "/documents/bhrdca-procedure-for-reports.pdf" },
        { label: "Set Penalty Table", url: "/documents/bhrdca-set-penalty-table.pdf" },
        { label: "Insurance — Make a Claim", url: "https://www.au.marsh.com/sport/make-a-claim.html" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" }
      ]
    },
    womens: {
      key: "womens", name: "Women's", icon: "ti-cricket", image: "/sections/womens-helmet.webp",
      fixtures: [
        { label: "Senior Women — Fixtures & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/bhrdca-senior-women-summer-202627/2b81babd" },
        { label: "Women's Smash Series — Fixtures & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/bhrdca-womens-smash-series-summer-202627/0caf79ce" }
      ],
      blurb: "Women’s and girls’ cricket is a growing part of the BHRDCA. For information on Women’s cricket, get in touch with our Women’s Cricket contact.",
      contacts: [ { role: "Women's Cricket", name: "Lynda Richardson", phone: "0499 784 888", email: "bhrdca.femalecricket@gmail.com" } ],
      resources: [
        { label: "Social Media Policy", url: "/documents/bhrdca-social-media-policy-0168cb.pdf" },
        { label: "eScoring Quick Reference", url: "/documents/bhrdca-escoring-quick-reference.pdf" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" },
        { label: "2026 Competition Rules", url: "/documents/bhrdca-2026-competition-rules.pdf" },
        { label: "Code of Conduct", url: "/documents/bhrdca-code-of-conduct.pdf" },
        { label: "Extreme Conditions Policy", url: "/documents/bhrdca-extreme-conditions-policy-oct2026.pdf" },
        { label: "Cricket Balls Policy", url: "/documents/bhrdca-cricket-balls-2026.pdf" },
        { label: "Attire Policy", url: "/documents/bhrdca-attire-policy.pdf" },
        { label: "Player Misconduct", url: "/documents/bhrdca-player-misconduct.pdf" },
        { label: "Tribunal Procedures", url: "/documents/bhrdca-tribunal-procedures.pdf" },
        { label: "Appeal Procedure", url: "/documents/bhrdca-appeal-procedure.pdf" },
        { label: "Procedure for Reports", url: "/documents/bhrdca-procedure-for-reports.pdf" },
        { label: "Set Penalty Table", url: "/documents/bhrdca-set-penalty-table.pdf" },
        { label: "Refund Policy", url: "/documents/bhrdca-refund-policy.docx" },
      ]
    },
    veterans: {
      key: "veterans", name: "Veterans", icon: "ti-medal", image: "/gallery/full/img-14-7-12-vets-action000000149.webp",
      fixtures: [{ label: "Eastern Vets — Fixtures & Ladders", url: "https://www.playhq.com/cricket-australia/org/box-hill-reporter-district-cricket-association/eastern-veterans-competition-bhrdcardca-summer-202627/72fc8a77" }],
      blurb: "Over 40 & Over 50 Veterans cricket across 8 grades, played Sunday afternoons. A great way to keep playing the game you love.",
      contacts: [ { role: "Veterans Cricket", name: "Michael Whitehead", phone: "0419 523 183", email: "mick_019@msn.com" } ],
      resources: [
        { label: "Veteran Playing Conditions", url: "/documents/bhrdca-veteran-playing-conditions.pdf" },
        { label: "Cricket Balls Policy", url: "/documents/bhrdca-cricket-balls-2026.pdf" },
        { label: "Attire Policy", url: "/documents/bhrdca-attire-policy.pdf" },
        { label: "2026 Competition Rules", url: "/documents/bhrdca-2026-competition-rules.pdf" },
        { label: "Code of Conduct", url: "/documents/bhrdca-code-of-conduct.pdf" },
        { label: "Social Media Policy", url: "/documents/bhrdca-social-media-policy-0168cb.pdf" },
        { label: "Tribunal Procedures", url: "/documents/bhrdca-tribunal-procedures.pdf" },
        { label: "Appeal Procedure", url: "/documents/bhrdca-appeal-procedure.pdf" },
        { label: "Extreme Conditions Policy", url: "/documents/bhrdca-extreme-conditions-policy-oct2026.pdf" },
        { label: "eScoring Quick Reference", url: "/documents/bhrdca-escoring-quick-reference.pdf" },
        { label: "Conduct / Incident Form", url: "/documents/bhrdca-conduct-incident-form.pdf" },
        { label: "Player Misconduct", url: "/documents/bhrdca-player-misconduct-1c5d54.pdf" },
        { label: "Procedure for Reports", url: "/documents/bhrdca-procedure-for-reports.pdf" },
        { label: "Match Ratio Ladder", url: "/documents/bhrdca-match-ratio-ladder.xlsx" },
        { label: "Set Penalty Table", url: "/documents/bhrdca-set-penalty-table.pdf" },
        { label: "Refund Policy", url: "/documents/bhrdca-refund-policy.docx" },
      ]
    },
    umpires: {
      key: "umpires", name: "Umpires", icon: "ti-gavel", image: "/sections/umpires.webp", imagePos: "center 32%",
      blurb: "The BHRDCA Umpires Association (BHRDCA UA) supports and appoints umpires across the competition. New umpires and officials are always welcome.",
      contacts: [
        { role: "UA President", name: "Phil Hermann", phone: "0402 384 642", email: "hermanndianne@hotmail.com" },
        { role: "UA Secretary", name: "Mick Moon", phone: "0481 199 083", email: "secretarybhrdcua2025@gmail.com" }
      ],
      resources: [
        { label: "Umpire Fees", url: "/documents/bhrdca-umpire-fees.pdf" },
        { label: "Veteran Playing Conditions", url: "/documents/bhrdca-veteran-playing-conditions.pdf" },
        { label: "Junior Playing Conditions", url: "/documents/bhrdca-junior-playing-conditions.pdf" },
        { label: "T20 Playing Conditions", url: "/documents/bhrdca-t20-rules-2025-26.pdf" },
        { label: "Cricket Balls Policy", url: "/documents/bhrdca-cricket-balls-2026.pdf" },
        { label: "Attire Policy", url: "/documents/bhrdca-attire-policy-61d2f3.pdf" },
        { label: "2026 Competition Rules", url: "/documents/bhrdca-2026-competition-rules.pdf" },
        { label: "Code of Conduct", url: "/documents/bhrdca-code-of-conduct.pdf" },
        { label: "Social Media Policy", url: "/documents/bhrdca-social-media-policy.pdf" },
        { label: "Appeal Procedure", url: "/documents/bhrdca-appeal-procedure.pdf" },
        { label: "Tribunal Procedures", url: "/documents/bhrdca-tribunal-procedures.pdf" },
        { label: "Tribunal Summary Sheet", url: "/documents/bhrdca-tribunal-summary-sheet.pdf" },
        { label: "Extreme Conditions Policy", url: "/documents/bhrdca-extreme-conditions-policy-oct2026.pdf" },
        { label: "MCC Laws of Cricket", url: "https://www.lords.org/mcc/the-laws-of-cricket" },
        { label: "Cricket Australia Rules & Regulations", url: "https://www.cricketaustralia.com.au/cricket/rules-and-regulations" },
        { label: "Conduct / Incident Form", url: "/documents/bhrdca-conduct-incident-form-077859.pdf" },
        { label: "Player Misconduct", url: "/documents/bhrdca-player-misconduct.pdf" },
        { label: "Procedure for Reports", url: "/documents/bhrdca-procedure-for-reports.pdf" },
        { label: "Match Ratio Ladder", url: "/documents/bhrdca-match-ratio-ladder.pdf" },
        { label: "Set Penalty Table", url: "/documents/bhrdca-set-penalty-table.pdf" },
        { label: "Umpires Match Report (PDF)", url: "/documents/bhrdca-umpires-match-report-pdf.pdf" },
        { label: "Umpires Match Report (Word)", url: "/documents/bhrdca-umpires-match-report-word.docx" },
        { label: "Insurance — Make a Claim", url: "https://au.marsh.com/sport/make-a-claim.html" },
        { label: "Insurance — Game Day Checklist", url: "https://info-pacific.marsh.com/acton/media/44357/cricket-check-list-marsh" }
      ]
    }
  };

  // Junior Rep Cricket — duplicates the Juniors section content under its own title.
  sections.juniorRep = Object.assign({}, sections.juniors, { key: "juniorRep", name: "Junior Rep", image: "/sections/juniors-rep.webp", imagePos: "center top" });

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
    { name: "East Box Hill", url: "http://eastboxhill.vic.cricket.com.au/", logo: "/club-logos/east-box-hill.png", grades: ["M", "F", "J", "JG"] },
    { name: "East Burwood", url: "http://ebcc.vic.cricket.com.au/", logo: "/club-logos/east-burwood.webp", grades: ["M", "F", "J"] },
    { name: "Forest Hill", url: "http://www.foresthillcc.com.au/", logo: "/club-logos/forest-hill.webp", grades: ["M", "F", "J"] },
    { name: "Glen Waverley", url: "https://www.glenwaverleycc.com", logo: "/club-logos/glen-waverley.jpg", grades: ["M", "F", "J", "JG"] },
    { name: "Glen Waverley Cougars", url: "https://cougars.net.au/?page_id=298", logo: "/club-logos/glen-waverley-cougars.jpeg", grades: ["M", "F", "J"] },
    { name: "Kerrimuir United", url: "http://kerrimuircc.com.au/", logo: "/club-logos/kerrimuir-united.webp", grades: ["M", "F", "J", "JG"] },
    { name: "Koonung Heights", url: "http://www.koonungheightscc.com/", logo: "/club-logos/koonung-heights.png", grades: ["M", "F", "J"] },
    { name: "Laburnum", url: "http://laburnumcc.vic.cricket.com.au/", logo: "/club-logos/laburnum.png", grades: ["M", "F", "J"] },
    { name: "Mitcham", url: "https://www.mitcham.cc/", logo: "/club-logos/mitcham.webp", grades: ["M", "F", "J"] },
    { name: "Notting Hill / Brandon Park", url: "http://nhbpcc.vic.cricket.com.au/", logo: "/club-logos/notting-hill-brandon-park.webp", grades: ["M", "F", "J", "JG"] },
    { name: "Nunawading", url: "https://nunawadingcc.com/", logo: "/club-logos/nunawading.jpg", grades: ["M", "F", "J", "JG"] },
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
    ["Ainslie Park","Karen Ridley","0448 448 421",""],
    ["Blackburn","Amanda Crossland","0419 356 581","juniors@blackburn.org.au"],
    ["Blackburn South","Sonya O'Farrell","0416 126 476","sonyaofarrell@gmail.com"],
    ["Box Hill North Super Kings","Jessie Fernando","0419 380 149","juniorcoordinator@superkingscricketacademy.com.au"],
    ["Bulleen-Templestowe","Tim Moran","0438 502 539","tim.s.moran@gmail.com"],
    ["Burwood Districts","Abishek Pratap","0402 957 612","abishek.p.singh5@gmail.com"],
    ["Chirnside Park","David Hughes","0418 501 948","david.b.hughes@effem.com"],
    ["Doncaster","Stephen Mears","0438 778 466","stmears@bigpond.com"],
    ["Donvale","Steve Darmody","","donvalesecretary@gmail.com"],
    ["East Box Hill","Paul Byrne","0414 467 694","juniors@ebhcc.com"],
    ["East Burwood","Rob Robinson","0433 773 518","rfrobinsorascal@yahoo.com.au"],
    ["East Ringwood","Ben Taylor","0407 344 818","eastringwoodjcc@gmail.com"],
    ["Eildon Park","Brad Wilkins","0490 243 607","epccjuniors@gmail.com"],
    ["Ferntree Gully Cricket Club","David Anstey","0439 152 301","david.anstey@omasystems.com.au"],
    ["Ferntree Gully Footballers Cricket Club","Thomas Searle","","secretaryfootballerscc@gmail.com"],
    ["Forest Hill","Marcus Ward","0412 802 107","juniors@foresthillcc.com.au"],
    ["Glen Waverley","Paul Connaughton","0408 936 969","juniors.gwcc@gmail.com"],
    ["Glen Waverley Cougars","Graham Oppy","","graham.oppy@monash.edu"],
    ["Glen Waverley Hawks","Cameron Hocart","0419 133 832","camhocart@hotmail.com"],
    ["Heatherdale","Justin Box","0438 502 915","juniors@heatherdalecricketclub.com.au"],
    ["Kerrimuir United","Michael Walsh","0457 545 570","kuccjuniors@gmail.com"],
    ["Knox City","Naish Gadani","0423 346 596","naishadh.gadani@gmail.com"],
    ["Koonung Heights","Matthew Christensen","0401 222 209","mchristensen@fuserecruitment.com"],
    ["Laburnum","Michaela Thompson","0439 400 410","juniors.laburnumcricketclub@gmail.com"],
    ["Lysterfield","Michelle Doherty","","juniors.laburnumcricketclub@gmail.com"],
    ["Manningham","Liam O'Brien","0439 992 689","liam.r.obrien@gmail.com"],
    ["Mazenod","Simon Dresser","0424 837 341","mocccjuniors@gmail.com"],
    ["Mitcham","Steve Tully","0430 292 267","juniors@mitcham.cc"],
    ["Monash Cricket Club","David James","0419 395 183","david_ski_copper@hotmail.com"],
    ["Monash Glen Waverley Junior Cricketers","","","gwjcricket@gmail.com"],
    ["Mulgrave - Wheelers Hill","Dilan Liyanage","0432 586 311","mwhccjunior@gmail.com"],
    ["Mountain Gate Cricket Club","Nathan Giulieri","0406 949 232","templton31@hotmail.com"],
    ["North Ringwood","Mark Wilkie","0438 563 017","mark@melbtest.com.au"],
    ["Notting Hill / Brandon Park","Chris Hipwell","0499 923 309","chris.hipwell@hotmail.com"],
    ["Nunawading","Rob Nurse","0451 143 761","juniors@nunawadingcc.com"],
    ["Park Orchards","Dean Kruger","0417 110 258","dean@krugercorp.com.au"],
    ["South Warrandyte Hawks","Josh Exley","0406 066 493","josh.exley@hotmail.com"],
    ["St Andrew's","Shane Mayoh","0416 296 720","standrewscc.jnr@gmail.com"],
    ["St David's","Paul Newman","0419 511 711","sammy33@bigpond.net.au"],
    ["Surrey Hills","Barry Cull","","bazzacull@gmail.com"],
    ["Templestowe","Gavin Dimitri","0451 308 380","gavin.dimitri@outlook.com"],
    ["Templeton","Steve Tasevski","0410 516 881","juniors@templetoncc.com.au"],
    ["Upway-Tecoma","Rebecca Jewell","0402 120 891","rebeccajewell01@outlook.com"],
    ["Vermont Cricket Club","Martin Doddrell","0417 138 928","juniors@vermontcricket.com.au"],
    ["Vermont South","Jason Seedy","0412 043 652","jasonseedy@optusnet.com.au"],
    ["Warrandyte","Kris Trevena","0409 860 223","kris.trevena@outlook.com"],
    ["Wyclif","Christina Griffin","0417 305 996","cgriffin20@hotmail.com"],
    ["Yarraleen","Jack Dullard","0412 876 681","juniors@yarraleencc.com.au"]
  ].map(function (r) { return { club: r[0], contact: r[1], number: r[2], email: r[3] }; });

  // Sponsors & partners (from the association's sponsor wall)
  var sponsors = [
    { name: "Greg Chappell Cricket Centre", url: "https://www.cricketcentre.com.au/", tier: "Premier", logo: "/sponsor-logos/century-cricket-centre.webp", plate: true },
    { name: "Kookaburra Sport", url: "https://www.kookaburrasport.com.au/cricket/", tier: "Premier", logo: "/sponsor-logos/kookaburra-sport.webp" },
    { name: "Cricket Victoria", url: "https://www.cricketvictoria.com.au/", tier: "Premier", logo: "/sponsor-logos/cricket-victoria.webp", plate: true },
    { name: "Field of View Sports Photography", url: "https://www.fieldofview.com.au/", tier: "Premier", logo: "/sponsor-logos/field-of-view.webp" },
    { name: "SportsWeb Australia", url: "https://sportsweb.com.au", tier: "Premier", logo: "/sponsor-logos/sportsweb-cricket.webp", plate: true, tag: "Cricket Websites" },
    { name: "Topline Cricket", url: "https://www.toplinecricket.com.au/", tier: "Premier", logo: "/sponsor-logos/topline-cricket.webp", plate: true },
    { name: "Top Notch Trophies", url: "https://www.topnotchtrophies.com.au/", tier: "Partner", logo: "/sponsor-logos/top-notch-trophies.webp", plate: true },
    { name: "Box Hill Indoor Sports", url: "https://boxhillindoorsports.com.au/sports-and-activities/indoor-cricket/", tier: "Partner", logo: "/sponsor-logos/box-hill-indoor-sports.webp" },
    { name: "Geyer Accountants", url: "https://geyeraccountants.com.au/", tier: "Partner", logo: "/sponsor-logos/geyer-accountants.webp" },
    { name: "Community Bank Inner East · Bendigo Bank", url: "https://www.bendigobank.com.au/", tier: "Partner", logo: "/sponsor-logos/bendigo-bank.webp" },
    { name: "Grant Professionals & Club Builder", url: "https://www.club-builder.com.au/", tier: "Partner", logo: "/sponsor-logos/club-builder.webp", plate: true },
    { name: "Club Connect", url: "https://clubconnect.net.au", tier: "Partner", logo: "/sponsor-logos/club-connect.webp" },
    { name: "Altegra", url: "https://www.altegra.com.au/", tier: "Community", logo: "/sponsor-logos/altegra.webp", plate: true },
    { name: "Good Sports", url: "https://goodsports.com.au/", tier: "Community", logo: "/sponsor-logos/good-sports.webp" },
    { name: "Child Safe", url: "https://www.childsafe.org.au/", tier: "Community", logo: "/sponsor-logos/child-safe.svg" },
    { name: "Compare & Connect", url: "https://www.compareandconnect.com.au/", tier: "Premier", logo: "/sponsor-logos/compare-and-connect.webp", plate: true },
    { name: "LCF Linemarking & Logos", url: "https://grassup.com.au/services", tier: "Partner", logo: "/sponsor-logos/lcf-linemarking.webp", plate: true },
    { name: "Modern Orthodontics", url: "https://www.modernorthodontics.com.au/", tier: "Premier", logo: "/sponsor-logos/modern-orthodontics.webp", plate: true },
    { name: "3WBC Radio", url: "https://www.3wbc.org.au/shows/the-cordon/", tier: "Community", logo: "/sponsor-logos/3wbc-radio.webp" }
  ];

  var history = [
    { label: "Heritage", desc: "The BHRDCA story since 1890/91.", icon: "ti-books", url: "/documents/bhrdca-heritage.pdf" },
    { label: "Office Bearers", desc: "Past presidents, secretaries and officials.", icon: "ti-users", url: "/documents/bhrdca-office-bearers-2026.pdf" },
    { label: "BHRDCA Records", desc: "Statistical and historical records, 1890/91 to 1985/86.", icon: "ti-chart-bar", url: "/documents/bhrdca-records-1890-1985-86.pdf" },
    { label: "BHRDCA Statistics", desc: "Batting, bowling and premiership records, 2008/09 to 2025/26.", icon: "ti-chart-histogram", url: "/documents/bhrdca-statistics-2008-2026.pdf" },
    { label: "Premiership Count", desc: "129 seasons of Top Grade premiership winners, since 1890/91.", icon: "ti-trophy-filled", url: "/documents/bhrdca-premiership-count.pdf" },
    { label: "Life Members", desc: "Those honoured for outstanding service.", icon: "ti-award", url: "/documents/bhrdca-life-members-2026.pdf" },
    { label: "Biographies", desc: "Profiles of the people who shaped the Association.", icon: "ti-user-star", url: "/biographies" },
    { label: "Hall of Fame", desc: "The BHRDCA's most celebrated cricketers.", icon: "ti-trophy", url: "/documents/bhrdca-hall-of-fame.pdf" }
  ];

  var childSafety = {
    officer: { role: "Child Safety & Complaints Manager", name: "Ross Kainey", phone: "0457 828 574", email: "ross.kainey@bigpond.com" },
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
