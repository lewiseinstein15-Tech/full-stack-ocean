// Full-course lecture-video resources per course.
// Every YouTube playlist/video id was verified via YouTube oEmbed (exists +
// official or clearly-marked community channel) before being added here.
// Attached to Course documents by scripts/seedOssu.js.
//
// Fields:
//   title      — display name
//   url        — watch link (open on YouTube / the hub page)
//   playlistId — YouTube playlist id (embeddable in the app)
//   source     — channel / institution that published it
//   note       — provenance note when it is a community upload or partial

const yt = (playlistId) => `https://www.youtube.com/playlist?list=${playlistId}`;

const courseVideos = {
  'INTRO-CS': [
    {
      title: 'MIT 6.100L — full lecture series (Fall 2022)',
      playlistId: 'PLUl4u3cNGP62A-ynp6v6-LGBCzeH3VAQB',
      url: yt('PLUl4u3cNGP62A-ynp6v6-LGBCzeH3VAQB'),
      source: 'MIT OpenCourseWare',
    },
    {
      title: 'Previous edition: 6.0001 (Fall 2016)',
      playlistId: 'PLUl4u3cNGP63WbdFxL8giv4yhgdMGaZNA',
      url: yt('PLUl4u3cNGP63WbdFxL8giv4yhgdMGaZNA'),
      source: 'MIT OpenCourseWare',
      note: 'The earlier version of this course, kept as an alternative.',
    },
  ],

  CS50P: [
    {
      title: 'CS50P 2022 — all lectures',
      playlistId: 'PLhQjrBD2T3817j24-GogXmWqO5Q5vYy0V',
      url: yt('PLhQjrBD2T3817j24-GogXmWqO5Q5vYy0V'),
      source: 'CS50',
    },
  ],

  PY4E: [
    {
      title: 'Python for Everybody — all lesson videos',
      playlistId: 'PLlRFEj9H3Oj7Bp8-DfGpfAfDBiblRfl5p',
      url: yt('PLlRFEj9H3Oj7Bp8-DfGpfAfDBiblRfl5p'),
      source: 'Chuck Severance',
      note: 'The same videos embedded on each py4e.com lesson page, in one playlist.',
    },
  ],

  SPD: [
    {
      title: 'Extra videos (problem-bank walkthroughs)',
      playlistId: 'PL6NenTZG6KrqdcyTwGf09uBxjI5pbXuT7',
      url: yt('PL6NenTZG6KrqdcyTwGf09uBxjI5pbXuT7'),
      source: 'Systematic Program Design',
      note: 'Linked from the OSSU coursepage alongside the archived edX course.',
    },
    {
      title: 'Course videos channel (edX archive mirror)',
      url: 'https://www.youtube.com/@systematicprogramdesign7962/playlists',
      source: 'Systematic Program Design',
      note: 'Week-by-week playlists mirroring the videos in the archived edX course.',
    },
  ],

  'CLASS-BASED': [
    {
      title: 'Lecture 28 archive (QuickSort)',
      playlistId: 'PL_N7YxtCMPydJ-aBr4Ku9-q--D6vheOnp',
      url: yt('PL_N7YxtCMPydJ-aBr4Ku9-q--D6vheOnp'),
      source: 'LectureArchivesALIGN',
      note: 'The video on the course site is broken; YouTube archive linked by OSSU.',
    },
    {
      title: 'Lecture 30 archive (Shortest Path)',
      playlistId: 'PL_N7YxtCMPyea2YC3e-1s7SR_S3oWGjdb',
      url: yt('PL_N7YxtCMPyea2YC3e-1s7SR_S3oWGjdb'),
      source: 'LectureArchivesALIGN',
      note: 'The video on the course site is broken; YouTube archive linked by OSSU.',
    },
  ],

  CALC1A: [
    {
      title: 'MIT 18.01 Single Variable Calculus (Fall 2006)',
      playlistId: 'PL590CCC2BC5AF3BC1',
      url: yt('PL590CCC2BC5AF3BC1'),
      source: 'MIT OpenCourseWare',
      note: 'The differentiation lectures cover this first course; the 18.01SC sessions are the aligned materials.',
    },
  ],

  CALC1B: [
    {
      title: 'MIT 18.01 Single Variable Calculus (Fall 2006)',
      playlistId: 'PL590CCC2BC5AF3BC1',
      url: yt('PL590CCC2BC5AF3BC1'),
      source: 'MIT OpenCourseWare',
      note: 'The integration lectures (roughly the second half of the playlist) cover this course.',
    },
  ],

  CALC1C: [
    {
      title: 'MIT 18.01 Single Variable Calculus (Fall 2006)',
      playlistId: 'PL590CCC2BC5AF3BC1',
      url: yt('PL590CCC2BC5AF3BC1'),
      source: 'MIT OpenCourseWare',
      note: 'For coordinates/series, the 18.01SC sessions listed on the course page are the aligned materials.',
    },
  ],

  MATH4CS: [
    {
      title: 'MIT 6.042J — all lectures (Fall 2010)',
      playlistId: 'PLB7540DEDD482705B',
      url: yt('PLB7540DEDD482705B'),
      source: 'MIT OpenCourseWare',
    },
  ],

  'MISSING-SEMESTER': [
    {
      title: 'Missing Semester IAP 2020 — all lectures',
      playlistId: 'PLyzOVJj3bHQuloKGG59rS43e29ro7I57J',
      url: yt('PLyzOVJj3bHQuloKGG59rS43e29ro7I57J'),
      source: 'Missing Semester (MIT)',
      note: 'The classic lecture series the course site presents.',
    },
    {
      title: 'Missing Semester IAP 2026 — latest edition',
      playlistId: 'PLyzOVJj3bHQunmnnTXrNbZnBaCA-ieK4L',
      url: yt('PLyzOVJj3bHQunmnnTXrNbZnBaCA-ieK4L'),
      source: 'Missing Semester (MIT)',
    },
  ],

  NAND2T1: [
    {
      title: 'From Nand to Tetris, Part 1',
      playlistId: 'PLrDd_kMiAuNmSb-CKWQqq9oBFN_KNMTaI',
      url: yt('PLrDd_kMiAuNmSb-CKWQqq9oBFN_KNMTaI'),
      source: 'MakkuZjAileron (community)',
      note: 'Community upload — the official lectures are on nand2tetris.org and Coursera (free to audit).',
    },
  ],

  NAND2T2: [
    {
      title: 'From Nand to Tetris, Part 2',
      playlistId: 'PLrDd_kMiAuNmllp9vuPqCuttC1XL9VyVh',
      url: yt('PLrDd_kMiAuNmllp9vuPqCuttC1XL9VyVh'),
      source: 'MakkuZjAileron (community)',
      note: 'Community upload — the official lectures are on nand2tetris.org and Coursera (free to audit).',
    },
  ],

  OSTEP: [
    {
      title: 'Lecture videos (UW–Madison CS 537, Spring 2018)',
      url: 'https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/videos.html',
      source: 'UW–Madison / Remzi Arpaci-Dusseau',
      note: 'One page with every lecture video and the matching notes; plays on YouTube.',
    },
    {
      title: 'xv6 source-code walkthroughs',
      playlistId: 'PLbtzT1TYeoMhTPzyTZboW_j7TPAnjv9XB',
      url: yt('PLbtzT1TYeoMhTPzyTZboW_j7TPAnjv9XB'),
      source: 'YouTube (community)',
      note: 'Excellent video series walking through much of the xv6 code, as linked by OSSU.',
      embeddable: false,
    },
  ],

  NETWORKING: [
    {
      title: 'Computer Networking: A Top-Down Approach, 8e — chapter lectures',
      playlistId: 'PLvFG2xYBrYASIUH_y2hYaMCro8KUe_yL8',
      url: yt('PLvFG2xYBrYASIUH_y2hYaMCro8KUe_yL8'),
      source: 'Sharjeel Sayed (community)',
      note: 'Community playlist collecting the official per-chapter online lectures; the authoritative list is on the course page.',
    },
  ],

  ALGO1: [
    {
      title: 'Algorithms Illuminated, Part 1: The Basics',
      playlistId: 'PLEGCF-WLh2RLHqXx6-GZr_w7LgqKDXxN_',
      url: yt('PLEGCF-WLh2RLHqXx6-GZr_w7LgqKDXxN_'),
      source: 'Tim Roughgarden Lectures',
      note: 'The same material as the Stanford/edX course, published by the instructor himself.',
    },
  ],

  ALGO2: [
    {
      title: 'Algorithms Illuminated, Part 2: Graph Algorithms and Data Structures',
      playlistId: 'PLEGCF-WLh2RJ5W-pt-KE9GUArTDzVwL1P',
      url: yt('PLEGCF-WLh2RJ5W-pt-KE9GUArTDzVwL1P'),
      source: 'Tim Roughgarden Lectures',
    },
  ],

  'SW-DEBUGGING': [
    {
      title: 'Software Debugging — full course',
      playlistId: 'PLAwxTw4SYaPkxK63TiT88oEe-AIBhr96A',
      url: yt('PLAwxTw4SYaPkxK63TiT88oEe-AIBhr96A'),
      source: 'Udacity',
    },
  ],

  'SW-TESTING': [
    {
      title: 'Software Testing — full course',
      playlistId: 'PLAwxTw4SYaPkWVHeC_8aSIbSxE_NXI76g',
      url: yt('PLAwxTw4SYaPkWVHeC_8aSIbSxE_NXI76g'),
      source: 'Udacity',
    },
  ],

  'COMP-STRUCT-1': [
    {
      title: 'MIT 6.004 Computation Structures (Spring 2017)',
      playlistId: 'PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2',
      url: yt('PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2'),
      source: 'MIT OpenCourseWare',
      note: 'The full 6.004 sequence — the digital-circuits lectures cover this first course.',
    },
  ],

  'COMP-STRUCT-2': [
    {
      title: 'MIT 6.004 Computation Structures (Spring 2017)',
      playlistId: 'PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2',
      url: yt('PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2'),
      source: 'MIT OpenCourseWare',
      note: 'The full 6.004 sequence — the computer-architecture lectures cover this second course.',
    },
  ],

  'COMP-STRUCT-3': [
    {
      title: 'MIT 6.004 Computation Structures (Spring 2017)',
      playlistId: 'PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2',
      url: yt('PLUl4u3cNGP62WVs95MNq3dQBqY2vGOtQ2'),
      source: 'MIT OpenCourseWare',
      note: 'The full 6.004 sequence — the computer-organization lectures cover this third course.',
    },
  ],

  'THEORY-COMP': [
    {
      title: 'MIT 18.404J — all lectures (Fall 2020)',
      playlistId: 'PLUl4u3cNGP60_JNv2MmK3wkOt9syvfQWY',
      url: yt('PLUl4u3cNGP60_JNv2MmK3wkOt9syvfQWY'),
      source: 'MIT OpenCourseWare',
    },
    {
      title: 'Shai Simonson — Theory of Computation (AdUni)',
      playlistId: 'PLEE7DF8F5E0203A56',
      url: yt('PLEE7DF8F5E0203A56'),
      source: 'Leonardo Silveira (community)',
      note: 'The classic alternative series the OSSU repo lists for this course (community upload).',
    },
  ],

  'GAME-THEORY': [
    {
      title: 'Algorithmic Game Theory (Stanford CS364A, Fall 2013)',
      playlistId: 'PLEGCF-WLh2RJBqmxvZ0_ie-mleCFhi2N4',
      url: yt('PLEGCF-WLh2RJBqmxvZ0_ie-mleCFhi2N4'),
      source: 'Tim Roughgarden Lectures',
      note: 'The lectures of the very course whose page this curriculum links.',
    },
  ],

  'ESSENCE-LINALG': [
    {
      title: 'Essence of Linear Algebra — full series',
      playlistId: 'PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
      url: yt('PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab'),
      source: '3Blue1Brown',
    },
  ],

  LINALG: [
    {
      title: 'MIT 18.06 Linear Algebra — all lectures (Spring 2005)',
      playlistId: 'PLE7DDD91010BC51F8',
      url: yt('PLE7DDD91010BC51F8'),
      source: 'MIT OpenCourseWare',
      note: "Gilbert Strang's complete course, mirrored on the OCW site.",
    },
  ],

  'FORMAL-LOGIC': [
    {
      title: 'Exploring Mathematics: Set Theory',
      playlistId: 'PL5KkMZvBpo5AH_5GpxMiryJT6Dkj32H6N',
      url: yt('PL5KkMZvBpo5AH_5GpxMiryJT6Dkj32H6N'),
      source: 'Eddie Woo',
      note: 'The Set Theory video series the OSSU repo lists as this course\u2019s prerequisite.',
    },
  ],

  PROBABILITY: [
    {
      title: 'Statistics 110: Probability — all lectures',
      playlistId: 'PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo',
      url: yt('PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo'),
      source: 'Harvard University',
    },
  ],

  COMPILERS: [
    {
      title: 'Compilers (Stanford CS143) — lectures',
      playlistId: 'PLEAYkSg4uSQ3yc_zf_f1GOxl5CZo0LVBb',
      url: yt('PLEAYkSg4uSQ3yc_zf_f1GOxl5CZo0LVBb'),
      source: 'Rahul Madhavan (community)',
      note: 'Community re-upload of the archived Stanford/edX lectures by Alex Aiken.',
    },
  ],

  'DB-MODELING': [
    {
      title: 'Introduction to Databases (Stanford) — lectures',
      playlistId: 'PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0',
      url: yt('PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0'),
      source: 'xiaoyupan (community)',
      note: 'Community re-upload of Jennifer Widom\u2019s Stanford course; the data-modeling sections cover this mini-course.',
    },
  ],

  'DB-SQL': [
    {
      title: 'Introduction to Databases (Stanford) — lectures',
      playlistId: 'PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0',
      url: yt('PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0'),
      source: 'xiaoyupan (community)',
      note: 'Community re-upload of Jennifer Widom\u2019s Stanford course; the SQL sections cover this mini-course.',
    },
  ],

  'DB-SEMI': [
    {
      title: 'Introduction to Databases (Stanford) — lectures',
      playlistId: 'PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0',
      url: yt('PLroEs25KGvwzmvIxYHRhoGTz9w8LeXek0'),
      source: 'xiaoyupan (community)',
      note: 'Community re-upload of Jennifer Widom\u2019s Stanford course; the XML/JSON sections cover this mini-course.',
    },
  ],

  ML: [
    {
      title: 'Machine Learning Specialization — all lectures',
      playlistId: 'PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI',
      url: yt('PLkDaE6sCZn6FNC6YRfRQc_FbeQrF8BwGI'),
      source: 'DeepLearning.AI (official)',
    },
  ],

  'MODERN-ROBOTICS': [
    {
      title: 'Modern Robotics — course videos',
      playlistId: 'PLggLP4f-rq02hvwNGpSWJMqjZhLpuDM-Y',
      url: yt('PLggLP4f-rq02hvwNGpSWJMqjZhLpuDM-Y'),
      source: 'Northwestern Robotics (official)',
    },
  ],

  // ---------- v4.2 additions: the remaining 32 courses ----------
  'COMP-GEOMETRY': [
    {
      title: 'Computational Geometry — full lecture series',
      playlistId: 'PLubYOWSl9mIvTio-1bXWnhE9LdeXfox1z',
      url: yt('PLubYOWSl9mIvTio-1bXWnhE9LdeXfox1z'),
      source: 'Philipp Kindermann (Univ. of Trier)',
      note: 'The best-known full computational-geometry video course, taught by the professor himself and following the de Berg textbook.',
    },
    {
      title: 'MCS 481 Computational Geometry (UIC, Fall 2023)',
      playlistId: 'PLGMCOm5grOW6W532C12AemiZZfY6X1x2Q',
      url: yt('PLGMCOm5grOW6W532C12AemiZZfY6X1x2Q'),
      source: 'Jan Verschelde (UIC)',
      note: 'A university alternative: the full course prerecorded by the UIC professor.',
    },
  ],

  GRAPHICS: [
    {
      title: 'Lecture 1: Course Overview',
      playlistId: 'PLYf_yASCt-4Ucdqn12nWgYWGtDCz-4L95',
      url: yt('PLYf_yASCt-4Ucdqn12nWgYWGtDCz-4L95'),
      source: 'Ravi Ramamoorthi (UCSD)',
      note: 'The instructor\u2019s official online-lecture recordings — the course page links one playlist per lecture. They cover most, not all, lectures (curves are excluded).',
    },
    {
      title: 'Lecture 2: Basic Math',
      playlistId: 'PL9982345DE0AB0206',
      url: yt('PL9982345DE0AB0206'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 3: Transformations 1',
      playlistId: 'PLF32A317EFDEE096F',
      url: yt('PLF32A317EFDEE096F'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 4: Transformations 2',
      playlistId: 'PL12C75681BC090610',
      url: yt('PL12C75681BC090610'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 5: Viewing',
      playlistId: 'PLC4079DE35E8D6EC7',
      url: yt('PLC4079DE35E8D6EC7'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 6: OpenGL 1 (OpenGL 3+)',
      playlistId: 'PLYf_yASCt-4XrjVm8bZPs-3DxN8vUOuKt',
      url: yt('PLYf_yASCt-4XrjVm8bZPs-3DxN8vUOuKt'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 7: OpenGL Shading (OpenGL 3+)',
      playlistId: 'PLYf_yASCt-4UBnM3-iQJG5m0dY-Hniopr',
      url: yt('PLYf_yASCt-4UBnM3-iQJG5m0dY-Hniopr'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 8: OpenGL 2 (OpenGL 3+)',
      playlistId: 'PLYf_yASCt-4VmRbhT9njp3_dTGdJHR4La',
      url: yt('PLYf_yASCt-4VmRbhT9njp3_dTGdJHR4La'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 9: Raytracing 1',
      playlistId: 'PLYf_yASCt-4UO2D9B8By85A8-jEOSS2zF',
      url: yt('PLYf_yASCt-4UO2D9B8By85A8-jEOSS2zF'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
    {
      title: 'Lecture 10: Raytracing 2',
      playlistId: 'PLYf_yASCt-4XjD3w2lddi6BCAHyEnVNNF',
      url: yt('PLYf_yASCt-4XjD3w2lddi6BCAHyEnVNNF'),
      source: 'Ravi Ramamoorthi (UCSD)',
    },
  ],

  PROGLANG: [
    {
      title: 'Lecture videos — Unit 1',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit1.html',
      source: 'UW CSE 341 (official)',
      note: 'The course self-hosts its lecture videos (no YouTube); each unit page lists that unit\u2019s clips, unit 1 of 8.',
    },
    {
      title: 'Lecture videos — Unit 2',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit2.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 3',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit3.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 4',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit4.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 5',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit5.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 6',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit6.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 7',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit7.html',
      source: 'UW CSE 341 (official)',
    },
    {
      title: 'Lecture videos — Unit 8',
      url: 'https://courses.cs.washington.edu/courses/cse341/19sp/videos/unit8.html',
      source: 'UW CSE 341 (official)',
    },
  ],

  'SWE-INTRO': [
    {
      title: 'Software Engineering — full course (Prof. Rajib Mall)',
      playlistId: 'PLbRMhDVUMngf8oZR3DpKMvYhZKga90JVt',
      url: yt('PLbRMhDVUMngf8oZR3DpKMvYhZKga90JVt'),
      source: 'NPTEL IIT Kharagpur',
      note: 'UBC\u2019s own lectures are not public; this is the standard free university SE lecture series (requirements, modeling, design, testing, agile).',
    },
  ],

  HASKELL: [
    {
      title: 'Functional Programming in Haskell — full course',
      playlistId: 'PLF1Z-APd9zK7usPMx3LGMZEHrECUGodd3',
      url: yt('PLF1Z-APd9zK7usPMx3LGMZEHrECUGodd3'),
      source: 'Graham Hutton (Univ. of Nottingham)',
      note: '17 lectures by the author of Programming in Haskell — linked from Nottingham\u2019s own course page.',
    },
  ],

  PROLOG: [
    {
      title: 'Logical Foundations of Prolog',
      playlistId: 'PLEvH6T-1oh76mgfZm5QbLQoRsyr87BhiR',
      url: yt('PLEvH6T-1oh76mgfZm5QbLQoRsyr87BhiR'),
      source: 'The Power of Prolog (Markus Triska)',
      note: 'Markus Triska\u2019s systematic series — the recognized Prolog authority. A natural companion to the Learn Prolog Now! book.',
    },
    {
      title: 'Prolog Language: Syntax and Semantics',
      playlistId: 'PLEvH6T-1oh75UagVp5BqeOVageBljdmaC',
      url: yt('PLEvH6T-1oh75UagVp5BqeOVageBljdmaC'),
      source: 'The Power of Prolog (Markus Triska)',
    },
  ],

  'CYBERSEC-FUND': [
    {
      title: 'CS50\u2019s Introduction to Cybersecurity — all lectures',
      playlistId: 'PLhQjrBD2T383Cqo5I1oRrbC1EKRAKGKUE',
      url: yt('PLhQjrBD2T383Cqo5I1oRrbC1EKRAKGKUE'),
      source: 'CS50 (Harvard)',
      note: 'Harvard\u2019s full cybersecurity course (David Malan) — security fundamentals, crypto basics, passwords, network and web security, the same ground as the RITx course.',
    },
    {
      title: 'CompTIA Security+ (SY0-701) — full training course',
      playlistId: 'PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv',
      url: yt('PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv'),
      source: 'Professor Messer',
      note: 'Alternative: the most respected free intro-security training (~120 videos) — cert-track rather than academic.',
    },
  ],

  'SECURE-CODING': [
    {
      title: 'Vulnerabilities 1002: C-Family Software Implementation Vulnerabilities',
      playlistId: 'PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN',
      url: yt('PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN'),
      source: 'OpenSecurityTraining2',
      note: 'A full structured course (72 videos) on real CVE-based vulnerabilities and the defensive coding that prevents them; free exercises at ost2.fyi.',
    },
  ],

  'SEC-VULNS': [
    {
      title: 'MIT 6.566 Computer Systems Security (Spring 2026)',
      playlistId: 'PLA6Ht2dJt3SId7vE9P5mppWdj65_l6hl7',
      url: yt('PLA6Ht2dJt3SId7vE9P5mppWdj65_l6hl7'),
      source: 'Nickolai Zeldovich (MIT)',
      note: 'The full MIT semester on the professor\u2019s own channel: threat models, control hijacking, buffer overflows, sandboxing, web and network attacks.',
    },
    {
      title: 'Classic archive: MIT 6.858 (Fall 2014)',
      playlistId: 'PLA6Ht2dJt3SLQmKhygx8HfwV_hxuPPCea',
      url: yt('PLA6Ht2dJt3SLQmKhygx8HfwV_hxuPPCea'),
      source: 'Nickolai Zeldovich (MIT)',
    },
  ],

  'SEC-VULNS-C': [
    {
      title: 'Vulnerabilities 1002: C-Family Software Implementation Vulnerabilities',
      playlistId: 'PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN',
      url: yt('PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN'),
      source: 'OpenSecurityTraining2',
      note: 'Direct fit — CVE-based C/C++ memory-safety lessons (stack overflows, info disclosure, races) analyzed in a debugger.',
    },
  ],

  'WEB-SEC': [
    {
      title: 'Stanford CS253 Web Security (Spring 2020)',
      playlistId: 'PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-',
      url: yt('PL1y1iaEtjSYiiSGVlL1cHsXN_kvJOOhu-'),
      source: 'Feross Aboukhadijeh',
      note: '19 full lectures by the instructor himself (same-origin policy, XSS, CSRF, SQLi, sessions, crypto in web apps) — the strongest free web-security course.',
    },
  ],

  'SEC-GOV': [
    {
      title: 'Governance, Risk & Compliance (GRC) fundamentals',
      playlistId: 'PLarzZ7tJk-lG5qboJ5g3WFfODdswi7uPH',
      url: yt('PLarzZ7tJk-lG5qboJ5g3WFfODdswi7uPH'),
      source: 'Level Effect',
      note: 'A dedicated 12-video GRC module: why governance exists, risk management, framework compliance and auditing.',
    },
    {
      title: 'CISSP full course — Domain 1: Security & Risk Management',
      playlistId: 'PL7XJSuT7Dq_XPK_qmYMqfiBjbtHJRWigD',
      url: yt('PL7XJSuT7Dq_XPK_qmYMqfiBjbtHJRWigD'),
      source: 'Inside Cloud and Security (Pete Zerger)',
      note: 'Alternative: the governance/policy/compliance domain of a complete free CISSP course.',
    },
  ],

  'DIG-FORENSICS': [
    {
      title: 'Introduction to Digital Forensics (DFS101)',
      playlistId: 'PLJu2iQtpGvv-2LtysuTTka7dHt9GKUbxD',
      url: yt('PLJu2iQtpGvv-2LtysuTTka7dHt9GKUbxD'),
      source: 'DFIRScience (Brett Shavers)',
      note: 'A complete 44-video intro course: investigative process, acquisition, evidence handling, artifacts, reporting.',
    },
    {
      title: 'Follow-on: Introduction to Windows Forensics',
      playlistId: 'PLlv3b9B16ZadqDQH0lTRO4kqn2P1g9Mve',
      url: yt('PLlv3b9B16ZadqDQH0lTRO4kqn2P1g9Mve'),
      source: '13Cubed (Richard Davis)',
    },
  ],

  'SSD-REQ': [
    {
      title: 'Developing Secure Software (LFD121) — official course videos',
      url: 'https://training.linuxfoundation.org/training/developing-secure-software-lfd121/',
      source: 'OpenSSF / Linux Foundation',
      note: 'The course\u2019s own free video course — hosted on the Linux Foundation site (free account), not YouTube.',
    },
  ],

  'SSD-IMPL': [
    {
      title: 'Vulnerabilities 1002: C-Family Software Implementation Vulnerabilities',
      playlistId: 'PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN',
      url: yt('PLUFkSN0XLZ-kfxdnGt-UmwQzPpSEglLeN'),
      source: 'OpenSecurityTraining2',
      note: 'Implementation-phase secure coding is exactly what this course teaches (shared with the secure-coding courses).',
    },
  ],

  'SSD-VERIF': [
    {
      title: 'Fuzzing 1001: Introductory Fuzzing',
      playlistId: 'PLUFkSN0XLZ-loqkBTRkOSmYQUd2z8s1tJ',
      url: yt('PLUFkSN0XLZ-loqkBTRkOSmYQUd2z8s1tJ'),
      source: 'OpenSecurityTraining2',
      note: 'A full 29-video course on AFL++ white-box fuzzing — the security-testing / verification skillset.',
    },
  ],

  SOFTARCH: [
    {
      title: 'Software Architecture & Design — full course',
      playlistId: 'PLAwxTw4SYaPkMTetlG7xKWaI5ZAZFX8fL',
      url: yt('PLAwxTw4SYaPkMTetlG7xKWaI5ZAZFX8fL'),
      source: 'Udacity',
      note: 'Udacity\u2019s own free release of the full course. The channel playlist also holds other Udacity videos — the course content leads the list.',
    },
  ],

  'PARALLEL-PROG': [
    {
      title: 'Applications of Parallel Computers (Berkeley CS267, Spring 2025)',
      playlistId: 'PLnocShPlK-FtKEyUGGDVZNC328a80xbH9',
      url: yt('PLnocShPlK-FtKEyUGGDVZNC328a80xbH9'),
      source: 'UC Berkeley',
      note: 'The official semester recordings, linked from the course\u2019s own site — graduate-level parallel computing (CUDA/MPI/Spark) rather than Scala/JVM.',
    },
    {
      title: 'CMU 15-418 Parallel Computer Architecture and Programming (2016)',
      playlistId: 'PLpIxOj-HnDsO4Atvrp86c-4La9Mq3kMQZ',
      url: yt('PLpIxOj-HnDsO4Atvrp86c-4La9Mq3kMQZ'),
      source: 'Abhinav Maurya (community)',
      note: 'Community mirror of CMU\u2019s full course; CMU hosts the originals only on its own video server.',
    },
  ],

  'FULLSTACK-OPEN': [
    {
      title: 'CS50\u2019s Web Programming with Python and JavaScript',
      playlistId: 'PLhQjrBD2T380xvFSUmToMMzERZ3qB5Ueu',
      url: yt('PLhQjrBD2T380xvFSUmToMMzERZ3qB5Ueu'),
      source: 'CS50 (Harvard)',
      note: 'Fullstack Open itself has no videos; this is Harvard\u2019s full official web-dev series (Git, SQL, JS, testing, deployment) on the same material.',
    },
  ],

  'DATA-MINING': [
    {
      title: 'Mining Massive Data Sets (Stanford CS246) — full course',
      playlistId: 'PLLssT5z_DsK9JDLcT8T62VtzwyW9LNepV',
      url: yt('PLLssT5z_DsK9JDLcT8T62VtzwyW9LNepV'),
      source: 'Mining Massive Datasets (Stanford), via community playlist',
      note: 'Assembled from the official Stanford MMDS-channel videos — the current CS246 recordings sit behind Stanford\u2019s Canvas.',
    },
  ],

  'BIG-DATA': [
    {
      title: 'AMP Camp 5 — hands-on Spark training',
      playlistId: 'PLbDk7g7PotW149tgUaxX-5Fh10wP8NG6L',
      url: yt('PLbDk7g7PotW149tgUaxX-5Fh10wP8NG6L'),
      source: 'UC Berkeley AMPLab',
      note: 'Official training from Spark\u2019s birthplace (Spark core/SQL/MLlib/GraphX/Streaming); 2014-era tooling, but straight from the source.',
    },
  ],

  IOT: [
    {
      title: 'Introduction to Industry 4.0 and Industrial IoT (IIT Kharagpur)',
      playlistId: 'PLbRMhDVUMngdcLdH4-YF1uJI4IuhcDZPR',
      url: yt('PLbRMhDVUMngdcLdH4-YF1uJI4IuhcDZPR'),
      source: 'NPTEL IIT Kharagpur',
      note: 'A full university IoT lecture series (sensing/actuation, connectivity, protocols) with an industrial focus.',
    },
  ],

  'CLOUD-COMP': [
    {
      title: 'MIT 6.824 Distributed Systems (Spring 2020)',
      playlistId: 'PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB',
      url: yt('PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB'),
      source: 'MIT 6.824 (official course channel)',
      note: 'The full semester by Robert Morris et al. — Raft, GFS, fault tolerance, transactions; the distributed-systems core of cloud computing.',
    },
  ],

  'DATA-SCIENCE': [
    {
      title: 'R Programming (JHU) — official Coursera videos',
      playlistId: 'PLVext98k2evi8mDNRo4MwIgVgSmwM3cS8',
      url: yt('PLVext98k2evi8mDNRo4MwIgVgSmwM3cS8'),
      source: 'Coursera (JHU course videos)',
      note: 'Posted on Coursera\u2019s own channel — a partial subset of the course (23 videos).',
    },
    {
      title: 'R Programming (JHU) — full course mirror',
      playlistId: 'PL_bgmYHGITt-8Noh1fZpxTHJ-GrBb626R',
      url: yt('PL_bgmYHGITt-8Noh1fZpxTHJ-GrBb626R'),
      source: 'MOOC Lectures (community)',
      note: 'Community re-upload of the complete JHU course videos.',
    },
  ],

  'SCALA-FP': [
    {
      title: 'Week 1 (Odersky — Coursera course mirror)',
      playlistId: 'PLTeAcbOFvqaEk53dCLBDtHp_dADAFkpO0',
      url: yt('PLTeAcbOFvqaEk53dCLBDtHp_dADAFkpO0'),
      source: 'Functional Programming Principles in Scala (community)',
      note: 'Martin Odersky\u2019s Coursera lectures mirrored week by week; the official edition is free to audit on Coursera.',
    },
    {
      title: 'Week 2',
      playlistId: 'PLTeAcbOFvqaGpOBBV1QPL8LEWpT9-Yg10',
      url: yt('PLTeAcbOFvqaGpOBBV1QPL8LEWpT9-Yg10'),
      source: 'Functional Programming Principles in Scala (community)',
    },
    {
      title: 'Week 3',
      playlistId: 'PLTeAcbOFvqaEvsFehrBpAJwNXpHc8rvlx',
      url: yt('PLTeAcbOFvqaEvsFehrBpAJwNXpHc8rvlx'),
      source: 'Functional Programming Principles in Scala (community)',
    },
    {
      title: 'Week 4',
      playlistId: 'PLTeAcbOFvqaFbP-dikEl4xvlkfKEOGpvK',
      url: yt('PLTeAcbOFvqaFbP-dikEl4xvlkfKEOGpvK'),
      source: 'Functional Programming Principles in Scala (community)',
    },
    {
      title: 'Week 5',
      playlistId: 'PLTeAcbOFvqaFJrfCCJEelId7BFKW3UPj3',
      url: yt('PLTeAcbOFvqaFJrfCCJEelId7BFKW3UPj3'),
      source: 'Functional Programming Principles in Scala (community)',
    },
    {
      title: 'Week 6',
      playlistId: 'PLTeAcbOFvqaGtSMysJzzcYhrZyzpKyvKN',
      url: yt('PLTeAcbOFvqaGtSMysJzzcYhrZyzpKyvKN'),
      source: 'Functional Programming Principles in Scala (community)',
    },
  ],

  'GAME-DESIGN': [
    {
      title: 'CS50\u2019s Introduction to Game Development — all lectures',
      playlistId: 'PLhQjrBD2T383Vx9-4vJYFsJbvZ_D17Qzh',
      url: yt('PLhQjrBD2T383Vx9-4vJYFsJbvZ_D17Qzh'),
      source: 'CS50 (Harvard)',
      note: 'The full 2018 course (2D games in Lua, 3D in Unity + C#, VR) — the closest university-grade match to the MSU Unity specialization.',
    },
  ],

  'ETHICS-TECH': [
    {
      title: 'Ethics in Engineering Practice (IIT Kharagpur)',
      playlistId: 'PLbRMhDVUMngdL7ofhT7uH9_XBk4-2qsIL',
      url: yt('PLbRMhDVUMngdL7ofhT7uH9_XBk4-2qsIL'),
      source: 'NPTEL IIT Kharagpur',
      note: 'A full university engineering-ethics lecture series; framed on professional practice rather than the philosophy-of-technology angle.',
    },
  ],

  'IP-INTRO': [
    {
      title: 'CopyrightX (Harvard) — full lecture series',
      playlistId: 'PL4tmHsP5kT0H1l9RvXBQ7BaPto3WWrfM5',
      url: yt('PL4tmHsP5kT0H1l9RvXBQ7BaPto3WWrfM5'),
      source: 'William Fisher / Berkman Klein Center, via community playlist',
      note: 'Harvard\u2019s CopyrightX lectures (official uploads on the Berkman Klein channel, assembled here into one playlist). Covers copyright, not patents or trademarks.',
    },
  ],

  'DATA-PRIVACY': [
    {
      title: 'Privacy Enabling Techniques (IIT Kharagpur, 2026)',
      playlistId: 'PLE4Lz1WfZS60',
      url: yt('PLE4Lz1WfZS60'),
      source: 'NPTEL IIT Kharagpur',
      note: 'A current full course on privacy-enhancing techniques — anonymization and PETs for protecting sensitive data.',
    },
  ],
};

module.exports = { courseVideos };
