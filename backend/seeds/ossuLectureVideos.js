// Per-lecture video data, scraped from the official course pages
// (MIT OCW 6-100L lecture pages, the official CS50 and PY4E YouTube
// channels) and verified via YouTube oEmbed on 2026-11-03.
// Attached to study items by scripts/seedOssu.js — do not hand-edit ids.

const introCs = [
  {
    "slug": "intro-cs-l1",
    "title": "Lecture 1: Introduction",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-1-introduction/",
    "videoId": "xAcTmDO6NTI"
  },
  {
    "slug": "intro-cs-l2",
    "title": "Lecture 2: Strings, Input/Output, Branching",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-2-strings-inputoutput-branching/",
    "videoId": "UdEX0E9lIQM"
  },
  {
    "slug": "intro-cs-l3",
    "title": "Lecture 3: Iteration",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-3-iteration/",
    "videoId": "lzYrMcI92kw"
  },
  {
    "slug": "intro-cs-l4",
    "title": "Lecture 4: Loops over Strings, Guess-and-Check, Binary",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-4-loops-over-strings-guess-and-check-binary/",
    "videoId": "fWNZAw5Bmco"
  },
  {
    "slug": "intro-cs-l5",
    "title": "Lecture 5: Floats and Approximation Methods",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-5-floats-and-approximation-methods/",
    "videoId": "OF2sr5e7PrY"
  },
  {
    "slug": "intro-cs-l6",
    "title": "Lecture 6: Bisection Search",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-6-bisection-search/",
    "videoId": "PJ_5VNvJGtA"
  },
  {
    "slug": "intro-cs-l7",
    "title": "Lecture 7: Decomposition, Abstraction, Functions",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/",
    "videoId": "Qf6OVR8MLnU"
  },
  {
    "slug": "intro-cs-l8",
    "title": "Lecture 8: Functions as Objects",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-8-functions-as-objects/",
    "videoId": "0fEJFRKJN4U"
  },
  {
    "slug": "intro-cs-l9",
    "title": "Lecture 9: Lambda Functions, Tuples, and Lists",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/",
    "videoId": "h5abkZ_Ch6c"
  },
  {
    "slug": "intro-cs-l10",
    "title": "Lecture 10: Lists, Mutability",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-10-lists-mutability/",
    "videoId": "Z4bm7xzYpKM"
  },
  {
    "slug": "intro-cs-l11",
    "title": "Lecture 11: Aliasing, Cloning",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-11-aliasing-cloning/",
    "videoId": "hpsp-LQurco"
  },
  {
    "slug": "intro-cs-l12",
    "title": "Lecture 12: List Comprehension, Functions as Objects, Testing, Debugging",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/",
    "videoId": "AZBxs3OvFrY"
  },
  {
    "slug": "intro-cs-l13",
    "title": "Lecture 13: Exceptions, Assertions",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/",
    "videoId": "qT3_7FMuv-U"
  },
  {
    "slug": "intro-cs-l14",
    "title": "Lecture 14: Dictionaries",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-14-dictionaries/",
    "videoId": "lTgLOuaQsvk"
  },
  {
    "slug": "intro-cs-l15",
    "title": "Lecture 15: Recursion",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-15-recursion/",
    "videoId": "Bbyp4VRbmyY"
  },
  {
    "slug": "intro-cs-l16",
    "title": "Lecture 16: Recursion on Non-Numerics",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/",
    "videoId": "2XxGplWqXVQ"
  },
  {
    "slug": "intro-cs-l17",
    "title": "Lecture 17: Python Classes",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/",
    "videoId": "tsMrUdynbQQ"
  },
  {
    "slug": "intro-cs-l18",
    "title": "Lecture 18: More Python Class Methods",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-18-more-python-class-methods/",
    "videoId": "gLnCmUkgUQk"
  },
  {
    "slug": "intro-cs-l19",
    "title": "Lecture 19: Inheritance",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-19-inheritance/",
    "videoId": "rgM7Z9BNm1s"
  },
  {
    "slug": "intro-cs-l20",
    "title": "Lecture 20: Fitness Tracker Object-Oriented Programming Example",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-20-fitness-tracker-object-oriented-programming-example/",
    "videoId": "-wyc5FwzkcM"
  },
  {
    "slug": "intro-cs-l21",
    "title": "Lecture 21: Timing Programs, Counting Operations",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-21-timing-programs-counting-operations/",
    "videoId": "lvp4NfED6K4"
  },
  {
    "slug": "intro-cs-l22",
    "title": "Lecture 22: Big Oh and Theta",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-22-big-oh-and-theta/",
    "videoId": "RJhoT5PEf_0"
  },
  {
    "slug": "intro-cs-l23",
    "title": "Lecture 23: Complexity Classes Examples",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-23-complexity-classes-examples/",
    "videoId": "loX34ct0hxs"
  },
  {
    "slug": "intro-cs-l24",
    "title": "Lecture 24: Sorting Algorithms",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-24-sorting-algorithms/",
    "videoId": "R8Rw9mIa7JQ"
  },
  {
    "slug": "intro-cs-l25",
    "title": "Lecture 25: Plotting",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-25-plotting/",
    "videoId": "Jov7G7IpuLo"
  },
  {
    "slug": "intro-cs-l26",
    "title": "Lecture 26: List Access, Hashing, Simulations, and Wrap-Up",
    "url": "https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-26-list-access-hashing-simulations-and-wrap-up/",
    "videoId": "4H0GXzQ41t0"
  }
];

const cs50p = {
  "cs50p-w0": {
    "videoId": "JP7ITIXGpHk",
    "videoTitle": "CS50P - Lecture 0 - Functions, Variables"
  },
  "cs50p-w1": {
    "videoId": "_b6NgY_pMdw",
    "videoTitle": "CS50P - Lecture 1 - Conditionals"
  },
  "cs50p-w2": {
    "videoId": "-7xg8pGcP6w",
    "videoTitle": "CS50P - Lecture 2 - Loops"
  },
  "cs50p-w3": {
    "videoId": "LW7g1169v7w",
    "videoTitle": "CS50P - Lecture 3 - Exceptions"
  },
  "cs50p-w4": {
    "videoId": "MztLZWibctI",
    "videoTitle": "CS50P - Lecture 4 - Libraries"
  },
  "cs50p-w5": {
    "videoId": "tIrcxwLqzjQ",
    "videoTitle": "CS50P - Lecture 5 - Unit Tests"
  },
  "cs50p-w6": {
    "videoId": "KD-Yoel6EVQ",
    "videoTitle": "CS50P - Lecture 6 - File I/O"
  },
  "cs50p-w7": {
    "videoId": "hy3sd9MOAcc",
    "videoTitle": "CS50P - Lecture 7 - Regular Expressions"
  },
  "cs50p-w8": {
    "videoId": "e4fwY9ZsxPw",
    "videoTitle": "CS50P - Lecture 8 - Object-Oriented Programming"
  },
  "cs50p-w9": {
    "videoId": "6pgodt1mezg",
    "videoTitle": "CS50P - Lecture 9 - Et Cetera"
  }
};

const py4e = {
  "py4e-intro": {
    "videoId": "fvhNadKjE8g",
    "videoTitle": "PY4E - Introduction (Chapter 1 Part 1)"
  },
  "py4e-memory": {
    "videoId": "yf95LLCbmLs",
    "videoTitle": "PY4E - Introduction (Chapter 2 Part 1)"
  },
  "py4e-logic": {
    "videoId": "DmzEdsqxTbU",
    "videoTitle": "PY4E - Conditionals (Chapter 3 Part 1)"
  },
  "py4e-functions": {
    "videoId": "5Kzw-0-DQAk",
    "videoTitle": "PY4E - Functions (Chapter 4 Part 1)"
  },
  "py4e-loops": {
    "videoId": "FzpurxjwmsM",
    "videoTitle": "PY4E - Loops and Iteration (Chapter 5 Part 1)"
  },
  "py4e-strings": {
    "videoId": "dr98iM4app8",
    "videoTitle": "PY4E - Strings (Chapter 6 Part 1)"
  },
  "py4e-files": {
    "videoId": "9KJ-XeQ6ZlI",
    "videoTitle": "PY4E - Files (Chapter 7 Part 1)"
  },
  "py4e-lists": {
    "videoId": "oVOcqQNpOFM",
    "videoTitle": "PY4E - Python Lists (Chapter 8 Part 1)"
  },
  "py4e-dictionary": {
    "videoId": "hoH7fTkmnWY",
    "videoTitle": "PY4E - Dictionaries (Chapter 9 Part 1)"
  },
  "py4e-tuples": {
    "videoId": "CaVhM65wD6g",
    "videoTitle": "PY4E - Tuples (Chapter 10 Part 1)"
  },
  "py4e-regex": {
    "videoId": "ovZsvN67Glc",
    "videoTitle": "PY4E - Regular Expressions (Chapter 11 Part 1)"
  },
  "py4e-network": {
    "videoId": "RsnaRPC52G0",
    "videoTitle": "PY4E - HTTP (Chapter 12 Part 1)"
  },
  "py4e-servces": {
    "videoId": "7NEtEctD9Cw",
    "videoTitle": "PY4E - Web Services (Chapter 13 Part 1)"
  },
  "py4e-objects": {
    "videoId": "MafXTB8UXIg",
    "videoTitle": "DJ 11.01 Python Objects Terminology Explained (10:40)"
  },
  "py4e-database": {
    "videoId": "3RMPveOMd0k",
    "videoTitle": "PY4E - Databases (Chapter 15 Part 1)"
  },
  "py4e-dataviz": {
    "videoId": "gy6l4DTv1KU",
    "videoTitle": "PY4E - Visualization (Chapter 16 Part 1)"
  }
};

// Northeastern CS2510 SP22 — the course site's own video for Lecture 30 is
// broken; this is the YouTube archive linked from the OSSU coursepage.
const classBased = { 'classbased-l30': { videoId: '6WZo7sFFFlQ', videoTitle: 'CS2510 SP22 Lecture 30 — BFS/DFS Review (archive)' } };

module.exports = { introCs, cs50p, py4e, classBased };
