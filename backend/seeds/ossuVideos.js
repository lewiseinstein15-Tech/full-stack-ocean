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
};

module.exports = { courseVideos };
