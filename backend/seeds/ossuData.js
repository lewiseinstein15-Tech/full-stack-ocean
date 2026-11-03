// OSSU-aligned curriculum catalog.
// Source: github.com/lewiseinstein15-Tech/computer-science (OSSU computer-science).
// Every course from the repo's README is represented; detailed module/lecture
// breakdowns for the courses the repo details live in ossuModules.js.

const sections = [
  {
    termNumber: 1,
    key: 'INTRO',
    title: 'Intro CS',
    description: 'Try out computer science and programming — a flavor of the material to come. If you finish wanting more, CS is likely for you.',
    topics: ['computation', 'imperative programming', 'basic data structures and algorithms']
  },
  {
    termNumber: 2,
    key: 'INTRO-ONRAMP',
    title: 'Intro CS · Optional On-Ramps (choose one)',
    description: 'If the Intro CS course feels difficult to follow, start with one of these self-paced alternatives and return to Intro CS afterwards.',
    topics: ['python', 'programming fundamentals']
  },
  {
    termNumber: 3,
    key: 'CORE-PROG',
    title: 'Core CS · Programming',
    description: 'Functional programming, design for testing, common design patterns, unit testing, object-oriented design, static and dynamic typing, ML- and Lisp-family languages.',
    topics: ['functional programming', 'design for testing', 'program requirements', 'common design patterns', 'unit testing', 'object-oriented design', 'static typing', 'dynamic typing', 'Standard ML', 'Racket', 'Ruby']
  },
  {
    termNumber: 4,
    key: 'CORE-MATH',
    title: 'Core CS · Math',
    description: 'Discrete math is a prerequisite and close companion of algorithms; calculus builds the mathematical maturity both rely on.',
    topics: ['discrete mathematics', 'mathematical proofs', 'basic statistics', 'O-notation', 'discrete probability']
  },
  {
    termNumber: 5,
    key: 'CS-TOOLS',
    title: 'Core CS · Tools',
    description: 'The tools widely used to make programming easier — learn them now to ease all future work.',
    topics: ['terminals and shell scripting', 'vim', 'command line environments', 'version control']
  },
  {
    termNumber: 6,
    key: 'CORE-SYS',
    title: 'Core CS · Systems',
    description: 'From boolean algebra and gate logic to operating systems and network protocols — how computers work from first principles up.',
    topics: ['procedural programming', 'manual memory management', 'boolean algebra', 'gate logic', 'memory', 'computer architecture', 'assembly', 'machine language', 'virtual machines', 'compilers', 'operating systems', 'network protocols']
  },
  {
    termNumber: 7,
    key: 'CORE-THEORY',
    title: 'Core CS · Theory',
    description: 'The algorithmic core of computer science, from divide and conquer to NP-completeness.',
    topics: ['divide and conquer', 'sorting and searching', 'randomized algorithms', 'graph search', 'shortest paths', 'data structures', 'greedy algorithms', 'minimum spanning trees', 'dynamic programming', 'NP-completeness']
  },
  {
    termNumber: 8,
    key: 'CORE-SEC',
    title: 'Core CS · Security',
    description: 'Confidentiality, integrity, availability, secure design, defensive programming, threats and attacks, network security, cryptography.',
    topics: ['CIA triad', 'secure design', 'defensive programming', 'threats and attacks', 'network security', 'cryptography']
  },
  {
    termNumber: 9,
    key: 'CORE-APP',
    title: 'Core CS · Applications',
    description: 'Databases, machine learning, graphics and software engineering — CS put to work.',
    topics: ['Agile methodology', 'REST', 'software specifications', 'refactoring', 'relational databases', 'transaction processing', 'data modeling', 'neural networks', 'supervised learning', 'unsupervised learning', 'OpenGL', 'ray tracing']
  },
  {
    termNumber: 10,
    key: 'CORE-ETH',
    title: 'Core CS · Ethics',
    description: 'The social context of computing: professional ethics, intellectual property, privacy and civil liberties.',
    topics: ['social context', 'analytical tools', 'professional ethics', 'intellectual property', 'privacy and civil liberties']
  },
  {
    termNumber: 11,
    key: 'ADV-PROG',
    title: 'Advanced CS · Programming',
    description: 'Electives — debugging theory and practice, parallel computing, large-scale design and more.',
    topics: ['debugging theory and practice', 'goal-oriented programming', 'parallel computing', 'object-oriented analysis and design', 'UML', 'large-scale software architecture']
  },
  {
    termNumber: 12,
    key: 'ADV-SYS',
    title: 'Advanced CS · Systems',
    description: 'Digital circuits, computer architecture and organization — down to caches, pipelining and virtualization.',
    topics: ['digital signaling', 'combinational logic', 'CMOS technologies', 'sequential logic', 'finite state machines', 'processor instruction sets', 'caches', 'pipelining', 'virtualization', 'parallel processing', 'virtual memory', 'synchronization primitives', 'system call interface']
  },
  {
    termNumber: 13,
    key: 'ADV-THEORY',
    title: 'Advanced CS · Theory',
    description: 'Formal languages, computability, concurrency, logic and game theory.',
    topics: ['formal languages', 'Turing machines', 'computability', 'event-driven concurrency', 'automata', 'distributed shared memory', 'consensus algorithms', 'state machine replication', 'computational geometry', 'propositional logic', 'relational logic', 'Herbrand logic', 'game trees']
  },
  {
    termNumber: 14,
    key: 'ADV-SEC',
    title: 'Advanced CS · Information Security',
    description: 'Web security, governance, forensics and secure software development.',
    topics: ['web security', 'security governance', 'digital forensics', 'secure software development']
  },
  {
    termNumber: 15,
    key: 'ADV-MATH',
    title: 'Advanced CS · Math',
    description: 'Linear algebra, numerical methods, formal logic and probability.',
    topics: ['linear algebra', 'numerical methods', 'formal logic', 'set theory', 'probability']
  },
  {
    termNumber: 16,
    key: 'FINAL-PROJECT',
    title: 'Final Project',
    description: 'Identify a problem you can solve with what you have learned — or pick one of these guided, project-oriented series.',
    topics: ['capstone', 'portfolio']
  }
];

// duration/effort/prerequisites are quoted verbatim from the repo's tables.
const courses = [
  // ---------- Intro CS ----------
  { courseCode: 'INTRO-CS', section: 'INTRO', order: 1, title: 'Introduction to Computer Science and Programming using Python', provider: 'MIT OCW', url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/material-by-lecture/', altUrl: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', duration: '14 weeks', effort: '6-10 hours/week', prerequisites: ['High school algebra'], topics: ['computation', 'imperative programming', 'basic data structures'], description: 'The course that introduces the world of computer science and programming. Watch the lecture videos, do the finger exercises, then solve the problem sets.', notes: 'Problem-set pacing per the course calendar: PSET 0 before Lecture 1, PSET 1 before Lecture 9, PSET 2 before Lecture 12, PSET 3 before Lecture 16, PSET 4 before Lecture 20, PSET 5 before Lecture 25. The optional textbook is Guttag, Introduction to Computation and Programming Using Python, 3e.' },
  { courseCode: 'CS50P', section: 'INTRO-ONRAMP', order: 1, title: 'CS50P: Introduction to Programming with Python', provider: 'Harvard', url: 'https://cs50.harvard.edu/python/', duration: '10 weeks', effort: 'self-paced', prerequisites: [], topics: ['python', 'functions', 'loops', 'unit tests', 'regular expressions', 'object-oriented programming'], description: 'Learn to read and write code, test and debug it — hands-on, exercise-driven Python from the CS50 team.' },
  { courseCode: 'PY4E', section: 'INTRO-ONRAMP', order: 2, title: 'Python for Everybody', provider: 'University of Michigan', url: 'https://www.py4e.com/lessons', duration: 'self-paced', effort: 'self-paced', prerequisites: [], topics: ['python', 'data structures', 'regular expressions', 'web services', 'databases'], description: 'Learn to program and analyze data with Python. Free on the course website (the Coursera/edX versions charge for grading). Only lessons up to Regular Expressions are required — the rest is optional.', notes: 'Textbook: Python for Everybody (free PDF/EPUB/HTML at py4e.com/book).' },

  // ---------- Core CS · Programming ----------
  { courseCode: 'SPD', section: 'CORE-PROG', order: 1, title: 'Systematic Program Design', provider: 'UBC (edX, archived)', url: 'https://learning.edx.org/course/course-v1:UBCx+SPD1x+2T2015', duration: '13 weeks', effort: '8-10 hours/week', prerequisites: [], topics: ['functional programming', 'design recipes', 'recursion', 'Racket'], description: 'A systematic programming method rather than a programming language — channel your creativity so you can program well in any language. Work through Weeks 1A–6A, build the Space Invaders project, then continue 6B onwards.', notes: 'Use Dr. Racket. Starter files: github.com/ossu/spd-starters. Extra videos: youtube.com/playlist?list=PL6NenTZG6KrqdcyTwGf09uBxjI5pbXuT7' },
  { courseCode: 'CLASS-BASED', section: 'CORE-PROG', order: 2, title: 'Class-based Program Design', provider: 'Northeastern (CS 2510 SP22)', url: 'https://course.ccs.neu.edu/cs2510sp22/index.html', duration: '13 weeks', effort: '5-10 hours/week', prerequisites: ['Systematic Program Design', 'High school math'], topics: ['class-based design', 'java', 'object-oriented programming'], description: 'From functional Racket to the class-based paradigm in Java — the bridge to Object-Oriented Design. Follow the reordered lecture/lab/assignment schedule.', notes: 'Use Java 11. Lectures 28 and 30 have YouTube archive videos (originals are broken).' },
  { courseCode: 'PROGLANG', section: 'CORE-PROG', order: 3, title: 'Programming Languages', provider: 'University of Washington (CSE 341)', url: 'https://courses.cs.washington.edu/courses/cse341/19sp/#lectures', duration: '11 weeks', effort: '4-8 hours/week', prerequisites: ['Systematic Program Design'], topics: ['programming languages', 'ML', 'Standard ML', 'Ruby'], description: 'A broad look at programming-language constructs through ML-family and dynamic languages.' },
  { courseCode: 'OOD', section: 'CORE-PROG', order: 4, title: 'Object-Oriented Design', provider: 'Northeastern (CS 3500 F19)', url: 'https://course.ccs.neu.edu/cs3500f19/', duration: '13 weeks', effort: '5-10 hours/week', prerequisites: ['Class-based Program Design'], topics: ['object-oriented design', 'java', 'UML', 'testing'], description: 'Serious object-oriented program design in Java.' },
  { courseCode: 'SOFTARCH', section: 'CORE-PROG', order: 5, title: 'Software Architecture', provider: 'Coursera', url: 'https://www.coursera.org/learn/software-architecture', duration: '4 weeks', effort: '2-5 hours/week', prerequisites: ['Object-Oriented Design'], topics: ['software architecture'], description: 'The architecture of large-scale software systems.' },

  // ---------- Core CS · Math ----------
  { courseCode: 'CALC1A', section: 'CORE-MATH', order: 1, title: 'Calculus 1A: Differentiation', provider: 'MITx', url: 'https://openlearninglibrary.mit.edu/courses/course-v1:MITx+18.01.1x+2T2019/about', altUrl: 'https://ocw.mit.edu/courses/mathematics/18-01sc-single-variable-calculus-fall-2010/index.htm', duration: '13 weeks', effort: '6-10 hours/week', prerequisites: ['High school math'], topics: ['differentiation', 'calculus'], description: 'The alternative (18.01SC) covers this and the following two courses.' },
  { courseCode: 'CALC1B', section: 'CORE-MATH', order: 2, title: 'Calculus 1B: Integration', provider: 'MITx', url: 'https://openlearninglibrary.mit.edu/courses/course-v1:MITx+18.01.2x+3T2019/about', duration: '13 weeks', effort: '5-10 hours/week', prerequisites: ['Calculus 1A'], topics: ['integration', 'calculus'], description: 'Integration techniques and applications.' },
  { courseCode: 'CALC1C', section: 'CORE-MATH', order: 3, title: 'Calculus 1C: Coordinate Systems & Infinite Series', provider: 'MITx', url: 'https://openlearninglibrary.mit.edu/courses/course-v1:MITx+18.01.3x+1T2020/about', duration: '6 weeks', effort: '5-10 hours/week', prerequisites: ['Calculus 1B'], topics: ['coordinate systems', 'infinite series'], description: 'Polar coordinates and the study of sequences and series.' },
  { courseCode: 'MATH4CS', section: 'CORE-MATH', order: 4, title: 'Mathematics for Computer Science', provider: 'MIT (6.042J)', url: 'https://openlearninglibrary.mit.edu/courses/course-v1:OCW+6.042J+2T2019/about', altUrl: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/', duration: '13 weeks', effort: '5 hours/week', prerequisites: ['Calculus 1C'], topics: ['discrete mathematics', 'proofs', 'probability', 'graphs'], description: 'The discrete-mathematics foundation of CS. Community solution sets: 2015/2019 (github.com/spamegg1/Math-for-CS-solutions), 2010 (github.com/frevib/mit-cs-math-6042-fall-2010-problems), 2005 (MIT OCW).' },

  // ---------- Core CS · Tools ----------
  { courseCode: 'MISSING-SEMESTER', section: 'CS-TOOLS', order: 1, title: 'The Missing Semester of Your CS Education', provider: 'MIT', url: 'https://missing.csail.mit.edu/', duration: '2 weeks', effort: '12 hours/week', prerequisites: [], topics: ['shell', 'vim', 'version control', 'command line'], description: 'Terminals, shell scripting, vim, version control — the practical tools every programmer is expected to know.' },

  // ---------- Core CS · Systems ----------
  { courseCode: 'NAND2T1', section: 'CORE-SYS', order: 1, title: 'Build a Modern Computer from First Principles: From Nand to Tetris', provider: 'Coursera', url: 'https://www.coursera.org/learn/build-a-computer', altUrl: 'https://www.nand2tetris.org/', duration: '6 weeks', effort: '7-13 hours/week', prerequisites: ['A C-like programming language'], topics: ['boolean algebra', 'gate logic', 'computer architecture', 'assembly'], description: 'Build a computer from Nand gates to a working machine, then a Tetris run on it.' },
  { courseCode: 'NAND2T2', section: 'CORE-SYS', order: 2, title: 'Build a Modern Computer from First Principles: Nand to Tetris Part II', provider: 'Coursera', url: 'https://www.coursera.org/learn/nand2tetris2', duration: '6 weeks', effort: '12-18 hours/week', prerequisites: ['From Nand to Tetris Part I', 'One of the listed programming languages'], topics: ['virtual machines', 'compilers', 'high-level languages'], description: 'Build the virtual machine, compiler and operating-system layer of the Hack platform.' },
  { courseCode: 'OSTEP', section: 'CORE-SYS', order: 3, title: 'Operating Systems: Three Easy Pieces', provider: 'OSTEP / UW–Madison', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', duration: '10-12 weeks', effort: '6-10 hours/week', prerequisites: ['Nand to Tetris Part II'], topics: ['operating systems', 'processes', 'virtualization', 'concurrency', 'persistence'], description: 'The best self-contained OS course found — a free textbook plus homework. The Base approach (read the book, do the homeworks) covers all requirements in ~80 hours; the Extended approach adds serious C, x86 assembly and xv6 kernel projects.', notes: 'Book: pages.cs.wisc.edu/~remzi/OSTEP — Homework: pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html — Homework repo: github.com/remzi-arpacidusseau/ostep-homework — Solutions: github.com/xxyzz/ostep-hw — Projects: github.com/remzi-arpacidusseau/ostep-projects' },
  { courseCode: 'NETWORKING', section: 'CORE-SYS', order: 4, title: 'Computer Networking: a Top-Down Approach', provider: 'UMass', url: 'https://gaia.cs.umass.edu/kurose_ross/online_lectures.htm', duration: '8 weeks', effort: '4-12 hours/week', prerequisites: ['Algebra', 'Probability', 'Basic CS'], topics: ['network protocols', 'tcp/ip', 'sockets'], description: 'Online lectures from the top-down networking text. Pair with the Wireshark Labs: gaia.cs.umass.edu/kurose_ross/wireshark.php' },

  // ---------- Core CS · Theory ----------
  { courseCode: 'ALGO1', section: 'CORE-THEORY', order: 1, title: 'Algorithms: Design and Analysis, Part 1', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/algorithms/stanford-university-algorithms-design-and-analysis-part-1', altUrl: 'https://www.algorithmsilluminated.org/', duration: '8 weeks', effort: '4-8 hours/week', prerequisites: ['Any programming language', 'Mathematics for Computer Science'], topics: ['divide and conquer', 'sorting', 'graph search', 'shortest paths', 'data structures', 'greedy algorithms'], description: 'Tim Roughgarden\'s algorithms course, part one.' },
  { courseCode: 'ALGO2', section: 'CORE-THEORY', order: 2, title: 'Algorithms: Design and Analysis, Part 2', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/algorithms/stanford-university-algorithms-design-and-analysis-part-2', duration: '8 weeks', effort: '4-8 hours/week', prerequisites: ['Algorithms: Design and Analysis, Part 1'], topics: ['dynamic programming', 'NP-completeness', 'minimum spanning trees', 'randomized algorithms'], description: 'Tim Roughgarden\'s algorithms course, part two.' },

  // ---------- Core CS · Security ----------
  { courseCode: 'CYBERSEC-FUND', section: 'CORE-SEC', order: 1, title: 'Cybersecurity Fundamentals', provider: 'RIT (edX)', url: 'https://www.edx.org/learn/cybersecurity/rochester-institute-of-technology-cybersecurity-fundamentals', duration: '8 weeks', effort: '10-12 hours/week', prerequisites: [], topics: ['CIA triad', 'cryptography', 'network security'], description: 'A practical introduction to cybersecurity fundamentals.' },
  { courseCode: 'SECURE-CODING', section: 'CORE-SEC', order: 2, title: 'Principles of Secure Coding', provider: 'Coursera', url: 'https://www.coursera.org/learn/secure-coding-principles', duration: '4 weeks', effort: '4 hours/week', prerequisites: [], topics: ['defensive programming', 'secure design'], description: 'Secure-coding principles every developer should know.' },
  { courseCode: 'SEC-VULNS', section: 'CORE-SEC', order: 3, title: 'Identifying Security Vulnerabilities', provider: 'Coursera', url: 'https://www.coursera.org/learn/identifying-security-vulnerabilities', duration: '4 weeks', effort: '4 hours/week', prerequisites: [], topics: ['threats and attacks'], description: 'Find and characterize security vulnerabilities in software.' },
  { courseCode: 'SEC-VULNS-C', section: 'CORE-SEC', order: 4, title: 'Identifying Security Vulnerabilities in C/C++ Programming', provider: 'Coursera', url: 'https://www.coursera.org/learn/identifying-security-vulnerabilities-c-programming', duration: '4 weeks', effort: '5 hours/week', prerequisites: [], topics: ['C', 'security vulnerabilities'], description: 'The same skillset focused on C/C++.', notes: 'Choose one of this or the Java variant.' },
  { courseCode: 'SEC-VULNS-JAVA', section: 'CORE-SEC', order: 5, title: 'Exploiting and Securing Vulnerabilities in Java Applications', provider: 'Coursera', url: 'https://www.coursera.org/learn/exploiting-securing-vulnerabilities-java-applications', duration: '4 weeks', effort: '5 hours/week', prerequisites: [], topics: ['java', 'security vulnerabilities'], description: 'The same skillset focused on Java.', notes: 'Choose one of this or the C/C++ variant.' },

  // ---------- Core CS · Applications ----------
  { courseCode: 'DB-MODELING', section: 'CORE-APP', order: 1, title: 'Databases: Modeling and Theory', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/databases/stanford-university-databases-modeling-and-theory', duration: '2 weeks', effort: '10 hours/week', prerequisites: ['Core programming'], topics: ['data modeling', 'relational databases'], description: 'First of the three Stanford mini-courses on databases.' },
  { courseCode: 'DB-SQL', section: 'CORE-APP', order: 2, title: 'Databases: Relational Databases and SQL', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/relational-databases/stanford-university-databases-relational-databases-and-sql', duration: '2 weeks', effort: '10 hours/week', prerequisites: ['Core programming'], topics: ['sql', 'relational databases'], description: 'Second of the three Stanford mini-courses on databases.' },
  { courseCode: 'DB-SEMI', section: 'CORE-APP', order: 3, title: 'Databases: Semistructured Data', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/relational-databases/stanford-university-databases-semistructured-data', duration: '2 weeks', effort: '10 hours/week', prerequisites: ['Core programming'], topics: ['xml', 'json', 'semistructured data'], description: 'Third of the three Stanford mini-courses on databases.' },
  { courseCode: 'ML', section: 'CORE-APP', order: 4, title: 'Machine Learning', provider: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/', duration: '11 weeks', effort: '9 hours/week', prerequisites: ['Basic coding'], topics: ['neural networks', 'supervised learning', 'unsupervised learning'], description: 'The updated Andrew Ng machine-learning specialization.' },
  { courseCode: 'GRAPHICS', section: 'CORE-APP', order: 5, title: 'Computer Graphics', provider: 'UC San Diego (edX)', url: 'https://www.edx.org/learn/computer-graphics/the-university-of-california-san-diego-computer-graphics', altUrl: 'https://cseweb.ucsd.edu/~viscomp/classes/cse167/wi22/schedule.html', duration: '6 weeks', effort: '12 hours/week', prerequisites: ['C++ or Java', 'Basic linear algebra'], topics: ['OpenGL', 'ray tracing', 'geometry'], description: 'Modern OpenGL-based graphics programming.' },
  { courseCode: 'SWE-INTRO', section: 'CORE-APP', order: 6, title: 'Software Engineering: Introduction', provider: 'UBC (edX)', url: 'https://www.edx.org/learn/software-engineering/university-of-british-columbia-software-engineering-introduction', altUrl: 'https://github.com/ubccpsc/310/blob/main/resources/README.md', duration: '6 weeks', effort: '8-10 hours/week', prerequisites: ['Core Programming', 'A sizable project'], topics: ['Agile methodology', 'REST', 'refactoring'], description: 'The practice of building software in teams.' },

  // ---------- Core CS · Ethics ----------
  { courseCode: 'ETHICS-TECH', section: 'CORE-ETH', order: 1, title: 'Ethics, Technology and Engineering', provider: 'Coursera', url: 'https://www.coursera.org/learn/ethics-technology-engineering', duration: '9 weeks', effort: '2 hours/week', prerequisites: [], topics: ['professional ethics'], description: 'Ethical reasoning for engineers.' },
  { courseCode: 'IP-INTRO', section: 'CORE-ETH', order: 2, title: 'Introduction to Intellectual Property', provider: 'Coursera', url: 'https://www.coursera.org/learn/introduction-intellectual-property', duration: '4 weeks', effort: '2 hours/week', prerequisites: [], topics: ['intellectual property'], description: 'Copyrights, patents, trademarks and trade secrets.' },
  { courseCode: 'DATA-PRIVACY', section: 'CORE-ETH', order: 3, title: 'Data Privacy Fundamentals', provider: 'Northeastern (Coursera)', url: 'https://www.coursera.org/learn/northeastern-data-privacy', duration: '3 weeks', effort: '3 hours/week', prerequisites: [], topics: ['privacy and civil liberties'], description: 'Privacy principles for the data age.' },

  // ---------- Advanced CS · Programming ----------
  { courseCode: 'PARALLEL-PROG', section: 'ADV-PROG', order: 1, title: 'Parallel Programming', provider: 'Coursera', url: 'https://www.coursera.org/learn/scala-parallel-programming', duration: '4 weeks', effort: '6-8 hours/week', prerequisites: ['Scala programming'], topics: ['parallel computing'], description: 'Parallelism on the JVM with Scala.' },
  { courseCode: 'COMPILERS', section: 'ADV-PROG', order: 2, title: 'Compilers', provider: 'Stanford (edX)', url: 'https://www.edx.org/learn/computer-science/stanford-university-compilers', duration: '9 weeks', effort: '6-8 hours/week', prerequisites: [], topics: ['compilers', 'lexical analysis', 'parsing', 'code generation'], description: 'Build a compiler end to end.' },
  { courseCode: 'HASKELL', section: 'ADV-PROG', order: 3, title: 'Introduction to Haskell', provider: 'UPenn (CIS 194)', url: 'https://www.seas.upenn.edu/~cis194/fall16/', duration: '14 weeks', effort: '-', prerequisites: [], topics: ['haskell', 'type systems'], description: 'CIS 194 — idiomatic Haskell and typed functional programming.' },
  { courseCode: 'PROLOG', section: 'ADV-PROG', order: 4, title: 'Learn Prolog Now!', provider: 'Online book', url: 'https://www.let.rug.nl/bos/lpn//lpnpage.php?pageid=online', duration: '12 weeks', effort: '-', prerequisites: [], topics: ['logic programming', 'prolog'], description: 'Logic programming with Prolog. Also available as a free CC-licensed book by Blackburn, Bos, Striegnitz (github.com/LearnPrologNow/lpn).' },
  { courseCode: 'SW-DEBUGGING', section: 'ADV-PROG', order: 5, title: 'Software Debugging', provider: 'Udacity (YouTube)', url: 'https://www.youtube.com/playlist?list=PLAwxTw4SYaPkxK63TiT88oEe-AIBhr96A', duration: '8 weeks', effort: '6 hours/week', prerequisites: ['Python', 'Object-oriented programming'], topics: ['debugging'], description: 'Systematic debugging theory and practice.' },
  { courseCode: 'SW-TESTING', section: 'ADV-PROG', order: 6, title: 'Software Testing', provider: 'Udacity (YouTube)', url: 'https://www.youtube.com/playlist?list=PLAwxTw4SYaPkWVHeC_8aSIbSxE_NXI76g', duration: '4 weeks', effort: '6 hours/week', prerequisites: ['Python', 'Programming experience'], topics: ['software testing'], description: 'How to test software methodically.' },

  // ---------- Advanced CS · Systems ----------
  { courseCode: 'COMP-STRUCT-1', section: 'ADV-SYS', order: 1, title: 'Computation Structures 1: Digital Circuits', provider: 'MITx (edX)', url: 'https://learning.edx.org/course/course-v1:MITx+6.004.1x_3+3T2016', altUrl: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/', duration: '10 weeks', effort: '6 hours/week', prerequisites: ['Nand2Tetris II'], topics: ['digital circuits', 'combinational logic', 'CMOS'], description: 'Alternate links contain all 3 courses in the sequence.' },
  { courseCode: 'COMP-STRUCT-2', section: 'ADV-SYS', order: 2, title: 'Computation Structures 2: Computer Architecture', provider: 'MITx (edX)', url: 'https://learning.edx.org/course/course-v1:MITx+6.004.2x+3T2015', duration: '10 weeks', effort: '6 hours/week', prerequisites: ['Computation Structures 1'], topics: ['computer architecture', 'pipelining', 'caches'], description: 'The second course in the 6.004 sequence.' },
  { courseCode: 'COMP-STRUCT-3', section: 'ADV-SYS', order: 3, title: 'Computation Structures 3: Computer Organization', provider: 'MITx (edX)', url: 'https://learning.edx.org/course/course-v1:MITx+6.004.3x_2+1T2017', duration: '10 weeks', effort: '6 hours/week', prerequisites: ['Computation Structures 2'], topics: ['computer organization', 'virtual memory'], description: 'The third course in the 6.004 sequence.' },

  // ---------- Advanced CS · Theory ----------
  { courseCode: 'THEORY-COMP', section: 'ADV-THEORY', order: 1, title: 'Theory of Computation', provider: 'MIT (18.404J)', url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/', altUrl: 'https://www.youtube.com/playlist?list=PLEE7DF8F5E0203A56', duration: '13 weeks', effort: '10 hours/week', prerequisites: ['Mathematics for Computer Science', 'Logic', 'Algorithms'], topics: ['formal languages', 'Turing machines', 'computability', 'automata'], description: 'Automata, computability and complexity theory.' },
  { courseCode: 'COMP-GEOMETRY', section: 'ADV-THEORY', order: 2, title: 'Computational Geometry', provider: 'Tsinghua (edX)', url: 'https://www.edx.org/learn/geometry/tsinghua-university-ji-suan-ji-he-computational-geometry', duration: '16 weeks', effort: '8 hours/week', prerequisites: ['Algorithms', 'C++'], topics: ['computational geometry'], description: 'Geometric algorithms and data structures.' },
  { courseCode: 'GAME-THEORY', section: 'ADV-THEORY', order: 3, title: 'Algorithmic Game Theory', provider: 'Tim Roughgarden', url: 'https://timroughgarden.org/f13/f13.html', duration: '10 weeks', effort: '12 hours/week', prerequisites: ['Core Theory'], topics: ['game trees', 'mechanism design'], description: 'Algorithms meets economics.' },

  // ---------- Advanced CS · Information Security ----------
  { courseCode: 'WEB-SEC', section: 'ADV-SEC', order: 1, title: 'Web Security Fundamentals', provider: 'KU Leuven (edX)', url: 'https://www.edx.org/learn/computer-security/ku-leuven-web-security-fundamentals', duration: '5 weeks', effort: '4-6 hours/week', prerequisites: ['Basic web technologies'], topics: ['web security'], description: 'The security of the web platform and its most common vulnerabilities.' },
  { courseCode: 'SEC-GOV', section: 'ADV-SEC', order: 2, title: 'Security Governance & Compliance', provider: 'Coursera', url: 'https://www.coursera.org/learn/security-governance-compliance', duration: '3 weeks', effort: '3 hours/week', prerequisites: [], topics: ['security governance'], description: 'How organizations govern and stay compliant on security.' },
  { courseCode: 'DIG-FORENSICS', section: 'ADV-SEC', order: 3, title: 'Digital Forensics Concepts', provider: 'Coursera', url: 'https://www.coursera.org/learn/digital-forensics-concepts', duration: '3 weeks', effort: '2-3 hours/week', prerequisites: ['Core Security'], topics: ['digital forensics'], description: 'Investigating digital evidence.' },
  { courseCode: 'SSD-REQ', section: 'ADV-SEC', order: 4, title: 'Secure Software Development: Requirements, Design, and Reuse', provider: 'Linux Foundation (edX)', url: 'https://www.edx.org/learn/software-development/the-linux-foundation-secure-software-development-requirements-design-and-reuse', duration: '7 weeks', effort: '1-2 hours/week', prerequisites: ['Core Programming', 'Core Security'], topics: ['secure design'], description: 'Security applied at the requirements and design stage.' },
  { courseCode: 'SSD-IMPL', section: 'ADV-SEC', order: 5, title: 'Secure Software Development: Implementation', provider: 'Linux Foundation (edX)', url: 'https://www.edx.org/learn/software-development/the-linux-foundation-secure-software-development-implementation', duration: '7 weeks', effort: '1-2 hours/week', prerequisites: ['SSD: Requirements, Design, and Reuse'], topics: ['defensive programming'], description: 'Security applied while writing code.' },
  { courseCode: 'SSD-VERIF', section: 'ADV-SEC', order: 6, title: 'Secure Software Development: Verification and More Specialized Topics', provider: 'Linux Foundation (edX)', url: 'https://www.edx.org/learn/software-engineering/the-linux-foundation-secure-software-development-verification-and-more-specialized-topics', duration: '7 weeks', effort: '1-2 hours/week', prerequisites: ['SSD: Implementation'], topics: ['security testing'], description: 'Security applied while verifying software.' },

  // ---------- Advanced CS · Math ----------
  { courseCode: 'ESSENCE-LINALG', section: 'ADV-MATH', order: 1, title: 'Essence of Linear Algebra', provider: '3Blue1Brown (YouTube)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', duration: '-', effort: '-', prerequisites: ['High school math'], topics: ['linear algebra'], description: 'The visual intuition for linear algebra — a corequisite for the full course below.' },
  { courseCode: 'LINALG', section: 'ADV-MATH', order: 2, title: 'Linear Algebra', provider: 'MIT (18.06SC)', url: 'https://ocw.mit.edu/courses/mathematics/18-06sc-linear-algebra-fall-2011/', duration: '14 weeks', effort: '12 hours/week', prerequisites: ['Essence of Linear Algebra (corequisite)'], topics: ['linear algebra', 'matrices', 'eigenvalues'], description: 'Gilbert Strang\'s complete linear algebra course.' },
  { courseCode: 'NUM-METHODS', section: 'ADV-MATH', order: 3, title: 'Introduction to Numerical Methods', provider: 'MIT (18.335J)', url: 'https://ocw.mit.edu/courses/mathematics/18-335j-introduction-to-numerical-methods-spring-2019/index.htm', duration: '14 weeks', effort: '12 hours/week', prerequisites: ['Linear Algebra'], topics: ['numerical methods'], description: 'Numerical analysis for computation.' },
  { courseCode: 'FORMAL-LOGIC', section: 'ADV-MATH', order: 4, title: 'Introduction to Formal Logic', provider: 'forall x (Open Logic Project)', url: 'https://forallx.openlogicproject.org/', duration: '10 weeks', effort: '4-8 hours/week', prerequisites: ['Set Theory (youtube.com/playlist?list=PL5KkMZvBpo5AH_5GpxMiryJT6Dkj32H6N)'], topics: ['propositional logic', 'relational logic'], description: 'A free, rigorous introduction to formal logic.' },
  { courseCode: 'PROBABILITY', section: 'ADV-MATH', order: 5, title: 'Probability', provider: 'Harvard (Stat 110)', url: 'https://stat110.hsites.harvard.edu/', duration: '15 weeks', effort: '5-10 hours/week', prerequisites: ['Differentiation and Integration'], topics: ['probability'], description: 'Joe Blitzstein\'s celebrated probability course.' },

  // ---------- Final Project ----------
  { courseCode: 'FULLSTACK-OPEN', section: 'FINAL-PROJECT', order: 1, title: 'Fullstack Open', provider: 'University of Helsinki', url: 'https://fullstackopen.com/en/', duration: '12 weeks', effort: '15 hours/week', prerequisites: ['Programming'], topics: ['react', 'node', 'graphql', 'typescript'], description: 'Modern web application development — build a full-stack app.' },
  { courseCode: 'MODERN-ROBOTICS', section: 'FINAL-PROJECT', order: 2, title: 'Modern Robotics', provider: 'Northwestern', url: 'https://modernrobotics.northwestern.edu', duration: '26 weeks', effort: '2-5 hours/week', prerequisites: ['Freshman-level physics', 'Linear algebra', 'Calculus'], topics: ['robotics'], description: 'Mechanics, planning and control of robots.' },
  { courseCode: 'DATA-MINING', section: 'FINAL-PROJECT', order: 3, title: 'Data Mining (Specialization)', provider: 'Coursera', url: 'https://www.coursera.org/specializations/data-mining', duration: '30 weeks', effort: '2-5 hours/week', prerequisites: ['Machine Learning'], topics: ['data mining'], description: 'Pattern discovery in large datasets.' },
  { courseCode: 'BIG-DATA', section: 'FINAL-PROJECT', order: 4, title: 'Big Data (Specialization)', provider: 'Coursera', url: 'https://www.coursera.org/specializations/big-data', duration: '30 weeks', effort: '3-5 hours/week', prerequisites: [], topics: ['big data', 'hadoop', 'spark'], description: 'Hadoop, Spark and big-data pipelines.' },
  { courseCode: 'IOT', section: 'FINAL-PROJECT', order: 5, title: 'Internet of Things (Specialization)', provider: 'Coursera', url: 'https://www.coursera.org/specializations/internet-of-things', duration: '30 weeks', effort: '1-5 hours/week', prerequisites: ['Strong programming'], topics: ['embedded systems', 'iot'], description: 'Design and build connected devices.' },
  { courseCode: 'CLOUD-COMP', section: 'FINAL-PROJECT', order: 6, title: 'Cloud Computing (Specialization)', provider: 'Coursera', url: 'https://www.coursera.org/specializations/cloud-computing', duration: '30 weeks', effort: '2-6 hours/week', prerequisites: ['C++ programming'], topics: ['cloud', 'distributed systems'], description: 'Cloud systems, from virtualization to distributed computing.' },
  { courseCode: 'DATA-SCIENCE', section: 'FINAL-PROJECT', order: 7, title: 'Data Science (Specialization)', provider: 'JHU (Coursera)', url: 'https://www.coursera.org/specializations/jhu-data-science', duration: '43 weeks', effort: '1-6 hours/week', prerequisites: [], topics: ['data science', 'R'], description: 'The full data-science workflow in R.' },
  { courseCode: 'SCALA-FP', section: 'FINAL-PROJECT', order: 8, title: 'Functional Programming in Scala (Specialization)', provider: 'Coursera', url: 'https://www.coursera.org/specializations/scala', duration: '29 weeks', effort: '4-5 hours/week', prerequisites: ['One year programming experience'], topics: ['scala', 'functional programming'], description: 'Deep functional programming in Scala.' },
  { courseCode: 'GAME-DESIGN', section: 'FINAL-PROJECT', order: 9, title: 'Game Design and Development with Unity 2020 (Specialization)', provider: 'Michigan State (Coursera)', url: 'https://www.coursera.org/specializations/game-design-and-development', duration: '6 months', effort: '5 hours/week', prerequisites: ['Programming', 'Interactive design'], topics: ['game design', 'unity'], description: 'Ship a complete game with Unity.' }
];

module.exports = { sections, courses };
