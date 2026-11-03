// Detailed module breakdowns, transcribed from the computer-science repo's
// course pages (github.com/lewiseinstein15-Tech/computer-science).
// Only structures the repo itself provides are enumerated — nothing invented.

const M = (title, description, items) => ({ title, description, items });

module.exports = {
  // ---- Intro CS: lecture flow + problem-set checkpoints from the course page ----
  'INTRO-CS': [
    M('Lectures', 'Work through all lectures on the MIT OCW course page: watch the videos, do the finger exercises, then solve the problem sets.', [
      { slug: 'intro-cs-lectures', title: 'All lectures — material by lecture', url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/material-by-lecture/', kind: 'lecture', order: 1, note: 'Each lecture page links its videos, finger exercises and solutions.' },
      { slug: 'intro-cs-calendar', title: 'Course calendar', url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/calendar/', kind: 'reading', order: 2 },
      { slug: 'intro-cs-extra-practice', title: 'Extra practice (MIT introcomp)', url: 'https://introcomp.mit.edu/spring25/practice', kind: 'exercise', order: 3 },
      { slug: 'intro-cs-textbook', title: 'Textbook: Guttag — Introduction to Computation and Programming Using Python, 3e (optional)', url: 'https://mitpress.mit.edu/9780262542364/introduction-to-computation-and-programming-using-python/', kind: 'reading', order: 4, note: 'Optional — the course is completable without it.' }
    ]),
    M('Problem sets', 'Start thinking about each PSET when its lectures appear; actual pacing follows the course calendar.', [
      { slug: 'intro-cs-pset0', title: 'PSET 0 — before Lecture 1', kind: 'assignment', order: 1 },
      { slug: 'intro-cs-pset1', title: 'PSET 1 — before Lecture 9', kind: 'assignment', order: 2 },
      { slug: 'intro-cs-pset2', title: 'PSET 2 — before Lecture 12', kind: 'assignment', order: 3 },
      { slug: 'intro-cs-pset3', title: 'PSET 3 — before Lecture 16', kind: 'assignment', order: 4 },
      { slug: 'intro-cs-pset4', title: 'PSET 4 — before Lecture 20', kind: 'assignment', order: 5 },
      { slug: 'intro-cs-pset5', title: 'PSET 5 — before Lecture 25', kind: 'assignment', order: 6 }
    ])
  ],

  // ---- CS50P: the repo lists every week with notes and problem sets ----
  'CS50P': [
    M('Weeks', 'Watch each lecture, read the notes, complete the problem set. Finish with the final project.', [
      { slug: 'cs50p-w0', title: 'Week 0 — Functions, Variables', url: 'https://cs50.harvard.edu/python/2022/weeks/0/', kind: 'lecture', order: 0, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/0/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/0/' } },
      { slug: 'cs50p-w1', title: 'Week 1 — Conditionals', url: 'https://cs50.harvard.edu/python/2022/weeks/1/', kind: 'lecture', order: 1, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/1/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/1/' } },
      { slug: 'cs50p-w2', title: 'Week 2 — Loops', url: 'https://cs50.harvard.edu/python/2022/weeks/2/', kind: 'lecture', order: 2, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/2/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/2/' } },
      { slug: 'cs50p-w3', title: 'Week 3 — Exceptions', url: 'https://cs50.harvard.edu/python/2022/weeks/3/', kind: 'lecture', order: 3, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/3/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/3/' } },
      { slug: 'cs50p-w4', title: 'Week 4 — Libraries', url: 'https://cs50.harvard.edu/python/2022/weeks/4/', kind: 'lecture', order: 4, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/4/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/4/' } },
      { slug: 'cs50p-w5', title: 'Week 5 — Unit Tests', url: 'https://cs50.harvard.edu/python/2022/weeks/5/', kind: 'lecture', order: 5, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/5/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/5/' } },
      { slug: 'cs50p-w6', title: 'Week 6 — File I/O', url: 'https://cs50.harvard.edu/python/2022/weeks/6/', kind: 'lecture', order: 6, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/6/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/6/' } },
      { slug: 'cs50p-w7', title: 'Week 7 — Regular Expressions', url: 'https://cs50.harvard.edu/python/2022/weeks/7/', kind: 'lecture', order: 7, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/7/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/7/' } },
      { slug: 'cs50p-w8', title: 'Week 8 — Object-Oriented Programming', url: 'https://cs50.harvard.edu/python/2022/weeks/8/', kind: 'lecture', order: 8, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/8/', practiceUrl: 'https://cs50.harvard.edu/python/2022/psets/8/' } },
      { slug: 'cs50p-w9', title: 'Week 9 — Et Cetera', url: 'https://cs50.harvard.edu/python/2022/weeks/9/', kind: 'lecture', order: 9, materials: { readingUrl: 'https://cs50.harvard.edu/python/2022/notes/9/' } },
      { slug: 'cs50p-project', title: 'Final Project', url: 'https://cs50.harvard.edu/python/2022/project/', kind: 'project', order: 10 }
    ])
  ],

  // ---- Python for Everybody: the repo lists every lesson ----
  'PY4E': [
    M('Lessons', 'Watch all videos of a lesson, then do its assignments. Required through lesson 12 (Regular Expressions); 13–17 are optional.', [
      { slug: 'py4e-install', title: 'Installing Python', url: 'https://www.py4e.com/lessons/install', kind: 'lecture', order: 1 },
      { slug: 'py4e-intro', title: 'Why Program?', url: 'https://www.py4e.com/lessons/intro', kind: 'lecture', order: 2 },
      { slug: 'py4e-memory', title: 'Variables, expressions and statements', url: 'https://www.py4e.com/lessons/memory', kind: 'lecture', order: 3 },
      { slug: 'py4e-logic', title: 'Conditional Execution', url: 'https://www.py4e.com/lessons/logic', kind: 'lecture', order: 4 },
      { slug: 'py4e-functions', title: 'Functions', url: 'https://www.py4e.com/lessons/functions', kind: 'lecture', order: 5 },
      { slug: 'py4e-loops', title: 'Loops and Iterations', url: 'https://www.py4e.com/lessons/loops', kind: 'lecture', order: 6 },
      { slug: 'py4e-strings', title: 'Strings', url: 'https://www.py4e.com/lessons/strings', kind: 'lecture', order: 7 },
      { slug: 'py4e-files', title: 'Files', url: 'https://www.py4e.com/lessons/files', kind: 'lecture', order: 8 },
      { slug: 'py4e-lists', title: 'Lists', url: 'https://www.py4e.com/lessons/lists', kind: 'lecture', order: 9 },
      { slug: 'py4e-dictionary', title: 'Dictionaries', url: 'https://www.py4e.com/lessons/dictionary', kind: 'lecture', order: 10 },
      { slug: 'py4e-tuples', title: 'Tuples', url: 'https://www.py4e.com/lessons/tuples', kind: 'lecture', order: 11 },
      { slug: 'py4e-regex', title: 'Regular Expressions', url: 'https://www.py4e.com/lessons/regex', kind: 'lecture', order: 12 },
      { slug: 'py4e-network', title: 'Network Programming (optional)', url: 'https://www.py4e.com/lessons/network', kind: 'lecture', order: 13 },
      { slug: 'py4e-services', title: 'Using Web Services (optional)', url: 'https://www.py4e.com/lessons/servces', kind: 'lecture', order: 14 },
      { slug: 'py4e-objects', title: 'Object-Oriented Programming (optional)', url: 'https://www.py4e.com/lessons/Objects', kind: 'lecture', order: 15 },
      { slug: 'py4e-database', title: 'Databases (optional)', url: 'https://www.py4e.com/lessons/database', kind: 'lecture', order: 16 },
      { slug: 'py4e-dataviz', title: 'Data Visualization (optional)', url: 'https://www.py4e.com/lessons/dataviz', kind: 'lecture', order: 17 }
    ]),
    M('Textbook', 'Python for Everybody — free in every format.', [
      { slug: 'py4e-book-pdf', title: 'Book (PDF)', url: 'http://do1.dr-chuck.com/pythonlearn/EN_us/pythonlearn.pdf', kind: 'reading', order: 1 },
      { slug: 'py4e-book-html', title: 'Book (HTML)', url: 'https://www.py4e.com/html3', kind: 'reading', order: 2 }
    ])
  ],

  // ---- Systematic Program Design: archived edX weeks 1A–8B + projects ----
  'SPD': [
    M('Part I — Weeks 1A to 6A', 'Watch the videos, do the exercises, and solve the problems from the problem bank.', [
      { slug: 'spd-w1a', title: 'Week 1A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 1 },
      { slug: 'spd-w1b', title: 'Week 1B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 2 },
      { slug: 'spd-w2a', title: 'Week 2A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 3 },
      { slug: 'spd-w2b', title: 'Week 2B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 4 },
      { slug: 'spd-w3a', title: 'Week 3A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 5 },
      { slug: 'spd-w3b', title: 'Week 3B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 6 },
      { slug: 'spd-w4a', title: 'Week 4A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 7 },
      { slug: 'spd-w4b', title: 'Week 4B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 8 },
      { slug: 'spd-w5a', title: 'Week 5A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 9 },
      { slug: 'spd-w5b', title: 'Week 5B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 10 },
      { slug: 'spd-w6a', title: 'Week 6A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', kind: 'exercise', order: 11 },
      { slug: 'spd-space-invaders', title: 'Space Invaders project', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/spd/space-invaders-instructions.md', kind: 'project', order: 12, note: 'Complete after Week 6A, before continuing to 6B.' }
    ]),
    M('Part II — Weeks 6B to 8B', 'Continue with the complex-data half of the course.', [
      { slug: 'spd-w6b', title: 'Week 6B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD2x+2T2015', kind: 'exercise', order: 1 },
      { slug: 'spd-w7a', title: 'Week 7A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD2x+2T2015', kind: 'exercise', order: 2 },
      { slug: 'spd-w7b', title: 'Week 7B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD2x+2T2015', kind: 'exercise', order: 3 },
      { slug: 'spd-w8a', title: 'Week 8A', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD3x+3T2015', kind: 'exercise', order: 4 },
      { slug: 'spd-w8b', title: 'Week 8B', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD3x+3T2015', kind: 'exercise', order: 5 }
    ]),
    M('Wrap-up', 'Extra videos and the final problem.', [
      { slug: 'spd-extra-videos', title: 'Extra videos playlist', url: 'https://www.youtube.com/playlist?list=PL6NenTZG6KrqdcyTwGf09uBxjI5pbXuT7', kind: 'video', order: 1 },
      { slug: 'spd-ta-solver', title: 'Final: TA solver problem', url: 'https://github.com/ossu/spd-starters/blob/main/final/ta-solver-starter.rkt', kind: 'project', order: 2, note: 'Instructions are in the starter file. All starter files: github.com/ossu/spd-starters' }
    ])
  ],

  // ---- Class-based Program Design: the repo's reordered schedule (lectures/lab/assignment) ----
  'CLASS-BASED': [
    M('Module 1', 'Lectures 1–3, Lab 1, Assignment 1', [
      { slug: 'classbased-l1', title: 'Lecture 1', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture1.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l2', title: 'Lecture 2', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture2.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l3', title: 'Lecture 3', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture3.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab1', title: 'Lab 1', url: 'https://course.ccs.neu.edu/cs2510sp22/lab1.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a1', title: 'Assignment 1', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment1.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 2', 'Lectures 4–6, Lab 2, Assignment 2', [
      { slug: 'classbased-l4', title: 'Lecture 4', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture4.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l5', title: 'Lecture 5', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture5.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l6', title: 'Lecture 6', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture6.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab2', title: 'Lab 2', url: 'https://course.ccs.neu.edu/cs2510sp22/lab2.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a2', title: 'Assignment 2', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment2.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 3', 'Lectures 7–9, Lab 3, Assignment 3', [
      { slug: 'classbased-l7', title: 'Lecture 7', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture7.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l8', title: 'Lecture 8', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture8.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l9', title: 'Lecture 9', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture9.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab3', title: 'Lab 3', url: 'https://course.ccs.neu.edu/cs2510sp22/lab3.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a3', title: 'Assignment 3', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment3.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 4', 'Lectures 10–12, Lab 4, Assignment 4', [
      { slug: 'classbased-l10', title: 'Lecture 10', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture10.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l11', title: 'Lecture 11', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture11.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l12', title: 'Lecture 12', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture12.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab4', title: 'Lab 4', url: 'https://course.ccs.neu.edu/cs2510sp22/lab4.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a4', title: 'Assignment 4', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment4.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 5', 'Lectures 13–14, Lab 5, Assignment 5', [
      { slug: 'classbased-l13', title: 'Lecture 13', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture13.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l14', title: 'Lecture 14', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture14.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-lab5', title: 'Lab 5', url: 'https://course.ccs.neu.edu/cs2510sp22/lab5.html', kind: 'lab', order: 3 },
      { slug: 'classbased-a5', title: 'Assignment 5', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment5.html', kind: 'assignment', order: 4 }
    ]),
    M('Module 6', 'Lectures 15–16, Lab 6, Assignment 6', [
      { slug: 'classbased-l15', title: 'Lecture 15', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture15.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l16', title: 'Lecture 16', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture16.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-lab6', title: 'Lab 6', url: 'https://course.ccs.neu.edu/cs2510sp22/lab6.html', kind: 'lab', order: 3 },
      { slug: 'classbased-a6', title: 'Assignment 6', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment6.html', kind: 'assignment', order: 4 }
    ]),
    M('Module 7', 'Lectures 17–19, Lab 7, Assignment 7', [
      { slug: 'classbased-l17', title: 'Lecture 17', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture17.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l18', title: 'Lecture 18', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture18.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l19', title: 'Lecture 19', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture19.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab7', title: 'Lab 7', url: 'https://course.ccs.neu.edu/cs2510sp22/lab7.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a7', title: 'Assignment 7', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment7.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 8', 'Lectures 20–22, Lab 8, Assignment 8', [
      { slug: 'classbased-l20', title: 'Lecture 20', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture20.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l21', title: 'Lecture 21', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture21.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l22', title: 'Lecture 22', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture22.html', kind: 'lecture', order: 3, note: 'Original video is broken on the course site.' },
      { slug: 'classbased-lab8', title: 'Lab 8', url: 'https://course.ccs.neu.edu/cs2510sp22/lab8.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a8', title: 'Assignment 8', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment8.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 9', 'Lectures 23–25, Lab 9, Assignment 9 Part 1', [
      { slug: 'classbased-l23', title: 'Lecture 23', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture23.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l24', title: 'Lecture 24', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture24.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l25', title: 'Lecture 25', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture25.html', kind: 'lecture', order: 3 },
      { slug: 'classbased-lab9', title: 'Lab 9', url: 'https://course.ccs.neu.edu/cs2510sp22/lab9.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a9-1', title: 'Assignment 9 Part 1', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment9.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 10', 'Lectures 26, 27, 30 — Lab 10, Assignment 9 Part 2', [
      { slug: 'classbased-l26', title: 'Lecture 26', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture26.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l27', title: 'Lecture 27', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture27.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-l30', title: 'Lecture 30 (out of order by design)', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture30.html', kind: 'lecture', order: 3, note: 'YouTube archive: youtube.com/watch?v=6WZo7sFFFlQ' },
      { slug: 'classbased-lab10', title: 'Lab 10', url: 'https://course.ccs.neu.edu/cs2510sp22/lab10.html', kind: 'lab', order: 4 },
      { slug: 'classbased-a9-2', title: 'Assignment 9 Part 2', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment9.html', kind: 'assignment', order: 5 }
    ]),
    M('Module 11', 'Lectures 28–29, Lab 11', [
      { slug: 'classbased-l28', title: 'Lecture 28', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture28.html', kind: 'lecture', order: 1, note: 'YouTube archive: youtube.com/playlist?list=PL_N7YxtCMPydJ-aBr4Ku9-q--D6vheOnp' },
      { slug: 'classbased-l29', title: 'Lecture 29', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture29.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-lab11', title: 'Lab 11', url: 'https://course.ccs.neu.edu/cs2510sp22/lab11.html', kind: 'lab', order: 3 }
    ]),
    M('Module 12', 'Lectures 31–32, Lab 12, Assignment 10 Part 1', [
      { slug: 'classbased-l31', title: 'Lecture 31', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture31.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l32', title: 'Lecture 32', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture32.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-lab12', title: 'Lab 12', url: 'https://course.ccs.neu.edu/cs2510sp22/lab12.html', kind: 'lab', order: 3 },
      { slug: 'classbased-a10-1', title: 'Assignment 10 Part 1', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment10.html', kind: 'assignment', order: 4 }
    ]),
    M('Module 13', 'Lectures 34–35, Assignment 10 Part 2', [
      { slug: 'classbased-l34', title: 'Lecture 34', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture34.html', kind: 'lecture', order: 1 },
      { slug: 'classbased-l35', title: 'Lecture 35', url: 'https://course.ccs.neu.edu/cs2510sp22/lecture35.html', kind: 'lecture', order: 2 },
      { slug: 'classbased-a10-2', title: 'Assignment 10 Part 2', url: 'https://course.ccs.neu.edu/cs2510sp22/assignment10.html', kind: 'assignment', order: 3 }
    ])
  ],

  // ---- OSTEP: base approach + the extended approach's reading order and projects ----
  'OSTEP': [
    M('Base approach — the book', 'Read the free online textbook and complete the homework questions at the end of each chapter (~8 weeks at 10 h/week). You need a Unix/Linux system and a C compiler.', [
      { slug: 'ostep-book', title: 'Read the OSTEP book', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', kind: 'reading', order: 1, note: 'Chapters are short; do the homework questions at the end of each.' },
      { slug: 'ostep-homework', title: 'Chapter homeworks', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html', kind: 'exercise', order: 2 },
      { slug: 'ostep-homework-repo', title: 'Homework source code repo', url: 'https://github.com/remzi-arpacidusseau/ostep-homework', kind: 'exercise', order: 3 },
      { slug: 'ostep-hw-solutions', title: 'Homework solutions (community)', url: 'https://github.com/xxyzz/ostep-hw', kind: 'reading', order: 4, note: 'No honor code — reading the solutions is fine if stuck.' },
      { slug: 'ostep-c-primer', title: 'C refresher: Dive into Systems ch. 1–2', url: 'https://diveintosystems.org/book/C1-C_intro/index.html', kind: 'reading', order: 5, note: 'You only need basic C: arrays, pointers, print formatting.' }
    ]),
    M('Extended approach — projects in reading order', 'For systems specialists: learn C first, then xv6. Projects in the order the repo recommends (not the order they were assigned at UW).', [
      { slug: 'ostep-prereq-c', title: 'Prerequisite: learn C (Modern C, free)', url: 'https://inria.hal.science/hal-02383654v2/file/modernC.pdf', kind: 'reading', order: 1, note: 'Do this BEFORE starting the extended approach — expect 8-10 h/week for 3-5 weeks.' },
      { slug: 'ostep-p-initial-utilities', title: 'Project 1a: initial-utilities (litmus test)', url: 'https://github.com/remzi-arpacidusseau/ostep-projects', kind: 'project', order: 2, note: 'If this takes over 2 hours, spend more time on C first. initial-reverse is optional practice.' },
      { slug: 'ostep-p-processes-shell', title: 'Ch. 5 → Project 2a: processes-shell', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/ostep/Project-2A-processes-shell.md', kind: 'project', order: 3, note: 'Hints in the repo: Project-2A-processes-shell.md' },
      { slug: 'ostep-p-initial-xv6', title: 'Ch. 6 → Project 1b: initial-xv6 (test 1 only)', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/ostep/Project-1B-initial-xv6.md', kind: 'project', order: 4 },
      { slug: 'ostep-p-scheduling-lottery', title: 'Ch. 9 → Project 2b: scheduling-xv6-lottery', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/ostep/Scheduling-xv6-lottery.md', kind: 'project', order: 5 },
      { slug: 'ostep-p-vm-intro', title: 'Ch. 24 → Project 3b: vm-xv6-intro', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/ostep/vm-xv6-intro.md', kind: 'project', order: 6 },
      { slug: 'ostep-p-initial-xv6-2', title: 'Ch. 28 → initial-xv6 again (now pass test 2)', url: 'https://github.com/lewiseinstein15-Tech/computer-science/blob/main/coursepages/ostep/Project-1B-initial-xv6.md', kind: 'project', order: 7 },
      { slug: 'ostep-p-threads', title: 'Ch. 29 → Project 4b: concurrency-xv6-threads', url: 'https://github.com/remzi-arpacidusseau/ostep-projects', kind: 'project', order: 8 },
      { slug: 'ostep-p-mapreduce', title: 'Ch. 30 → Project 4a: concurrency-mapreduce', url: 'https://github.com/remzi-arpacidusseau/ostep-projects', kind: 'project', order: 9 },
      { slug: 'ostep-p-webserver', title: 'Ch. 33 → concurrency-webserver (unassigned in class)', url: 'https://github.com/remzi-arpacidusseau/ostep-projects', kind: 'project', order: 10 },
      { slug: 'ostep-p-fs-checker', title: 'Ch. 42 → Project 5a: filesystems-checker', url: 'https://github.com/remzi-arpacidusseau/ostep-projects', kind: 'project', order: 11 }
    ]),
    M('Extended approach — lectures', 'Either watch all lecture videos or read chapters 1–47 of the book.', [
      { slug: 'ostep-lectures', title: 'Lecture videos', url: 'https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/Discussion/videos.html', kind: 'video', order: 1 },
      { slug: 'ostep-course-site', title: 'Course website (UW CS 537, Sp 2018)', url: 'https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/', kind: 'reading', order: 2 },
      { slug: 'ostep-xv6', title: 'xv6 public repo', url: 'https://github.com/mit-pdos/xv6-public', kind: 'reading', order: 3, note: 'Clone into each xv6 project directory as `src`.' }
    ])
  ]
};
