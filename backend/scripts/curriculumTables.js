// Course + term table data for the full 8-term Full Stack Ocean curriculum.
// Sources: user's "Full Stack Ocean of Computer Science" curriculum PDF (8 terms,
// 24 courses, official hub links) + real MIT materials for Term 1.

const COURSES = {
  '6.0001': {
    title: 'Introduction to Computer Science and Programming in Python',
    description: 'Programming fundamentals, algorithms, data structures and computational problem-solving with Python.',
    term: 1, weeklyHours: 5, instructor: 'Dr. Ana Bell & Prof. John Guttag',
    watch: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63WbdCw6AYBLtnXNiM17fAc',
    notes: 'https://greenteapress.com/wp/think-python-2e/',
    practice: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
  },
  '18.01SC': {
    title: 'Single Variable Calculus — 1A: Differentiation',
    description: 'Limits, derivatives and their applications: the differential calculus from first principles.',
    term: 1, weeklyHours: 4, instructor: 'Prof. David Jerison',
    watch: 'https://www.youtube.com/playlist?list=PL57070F906E2A3681',
    notes: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
    practice: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
  },
  '6.042J': {
    title: 'Mathematics for Computer Science',
    description: 'Mathematical reasoning, proofs, induction, number theory and discrete structures for computer science.',
    term: 1, weeklyHours: 4, instructor: 'Prof. Tom Leighton',
    watch: 'https://www.youtube.com/playlist?list=PLB7540DEDD4828019',
    notes: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
    practice: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/',
  },
  'CS50x': {
    title: "CS50's Introduction to Computer Science",
    description: 'Harvard\u2019s legendary intro: Scratch, C, memory, algorithms, Python, SQL and web programming.',
    term: 2, weeklyHours: 6, instructor: 'Prof. David Malan',
    watch: 'https://www.youtube.com/playlist?list=PLhQjrBD2T381L3iZy4vKFDBhC6EEd343A',
    notes: 'https://cs50.harvard.edu/x/2024/notes/',
    practice: 'https://cs50.harvard.edu/x/2024/psets/',
  },
  '18.01SC-B': {
    title: 'Single Variable Calculus — 1B: Integration & Series',
    description: 'Integration techniques, the fundamental theorem, volumes, series and power series.',
    term: 2, weeklyHours: 4, instructor: 'Prof. David Jerison',
    watch: 'https://www.youtube.com/playlist?list=PL57070F906E2A3681',
    notes: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
    practice: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
  },
  '18.06': {
    title: 'Linear Algebra',
    description: 'Strang\u2019s classic: vector spaces, elimination, the four subspaces, determinants and eigenvalues.',
    term: 2, weeklyHours: 4, instructor: 'Prof. Gilbert Strang',
    watch: 'https://www.youtube.com/playlist?list=PLE7DDD91010BC515D',
    notes: 'http://immersivemath.com/ila/index.html',
    practice: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
  },
  'CS61A': {
    title: 'Structure and Interpretation of Computer Programs',
    description: 'Berkeley\u2019s Python/Scheme deep dive: functions, recursion, data abstraction, interpreters.',
    term: 3, weeklyHours: 6, instructor: 'Prof. John DeNero',
    watch: 'https://cs61a.org/',
    notes: 'https://composingprograms.com/',
    practice: 'https://cs61a.org/resources/',
  },
  'CS61B': {
    title: 'Data Structures',
    description: 'Berkeley\u2019s Java data structures: asymptotics, trees, hash tables, graphs and sorting.',
    term: 3, weeklyHours: 6, instructor: 'Prof. Josh Hug',
    watch: 'https://fa22.datastructur.es/',
    notes: 'https://joshhug.gitbooks.io/hug61b/',
    practice: 'https://fa22.datastructur.es/',
  },
  'STAT110': {
    title: 'Probability',
    description: 'Harvard probability: combinatorics, conditional probability, random variables and distributions.',
    term: 3, weeklyHours: 4, instructor: 'Prof. Joe Blitzstein',
    watch: 'https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwHGI718hTfls2-U2x25e',
    notes: 'https://projects.iq.harvard.edu/stat110/home',
    practice: 'https://projects.iq.harvard.edu/stat110/home',
  },
  '6.006': {
    title: 'Introduction to Algorithms',
    description: 'MIT algorithms: sorting, hashing, graphs and shortest paths with correctness and complexity analysis.',
    term: 4, weeklyHours: 5, instructor: 'Prof. Srini Devadas & Prof. Erik Demaine',
    watch: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb',
    notes: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
    practice: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
  },
  '6.046J': {
    title: 'Design and Analysis of Algorithms',
    description: 'Advanced algorithms: divide and conquer, dynamic programming, greedy, flow and randomized methods.',
    term: 4, weeklyHours: 5, instructor: 'Prof. Dana Moshkovitz',
    watch: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP6317WaSNfmCvGym2ucw386d',
    notes: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
    practice: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
  },
  '6.004': {
    title: 'Computation Structures',
    description: 'How computers work from transistors up: logic, ISAs, pipelining, caches and virtual memory.',
    term: 4, weeklyHours: 5, instructor: 'MIT Faculty',
    watch: 'https://6004.mit.edu/',
    notes: 'https://6004.mit.edu/',
    practice: 'https://6004.mit.edu/',
  },
  'N2T': {
    title: 'Nand to Tetris: Building a Modern Computer from First Principles',
    description: 'Build a complete computer — gates, CPU, assembler, VM, compiler and OS — project by project.',
    term: 5, weeklyHours: 6, instructor: 'Prof. Noam Nisan & Prof. Shimon Schocken',
    watch: 'https://www.nand2tetris.org/course',
    notes: 'https://www.nand2tetris.org/book',
    practice: 'https://www.nand2tetris.org/software',
  },
  '6.828': {
    title: 'Operating System Engineering',
    description: 'MIT OS engineering: xv6, processes, virtual memory, file systems, scheduling and locking.',
    term: 5, weeklyHours: 6, instructor: 'Prof. Frans Kaashoek & Robert Morris',
    watch: 'https://pdos.csail.mit.edu/6.828/',
    notes: 'https://pdos.csail.mit.edu/6.828/2018/xv6/book-rev11.pdf',
    practice: 'https://pdos.csail.mit.edu/6.828/',
  },
  '6.829': {
    title: 'Computer Networks',
    description: 'Network architecture, TCP/IP, congestion control, routing and wireless.',
    term: 5, weeklyHours: 4, instructor: 'Robert Morris',
    watch: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63uKDo3g9T8220IagU_1R91',
    notes: 'https://ocw.mit.edu/courses/6-829-computer-networks-fall-2002/',
    practice: 'https://ocw.mit.edu/courses/6-829-computer-networks-fall-2002/',
  },
  '6.830': {
    title: 'Database Systems',
    description: 'Relational databases internals: buffer pools, B+ trees, joins, transactions and recovery.',
    term: 6, weeklyHours: 5, instructor: 'Prof. Sam Madden',
    watch: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63UUkfL0tsxko4YvK30mVTn',
    notes: 'http://www.redbook.io/',
    practice: 'https://github.com/MIT-DB-Class',
  },
  '6.045J': {
    title: 'Automata, Computability, and Complexity',
    description: 'Theory of computation: finite automata, Turing machines, decidability, P vs NP.',
    term: 6, weeklyHours: 4, instructor: 'Prof. Michael Sipser',
    watch: 'https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/',
    notes: 'https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/',
    practice: 'https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/',
  },
  'CSE341': {
    title: 'Programming Languages',
    description: 'UW PL course: Racket, closures, types, Ruby and the big ideas of language design.',
    term: 6, weeklyHours: 4, instructor: 'UW Course Staff',
    watch: 'https://www.youtube.com/playlist?list=PL2ED1A8CB3B179FBD',
    notes: 'https://www.plai.org/',
    practice: 'https://courses.cs.washington.edu/courses/cse341/',
  },
  '6.036': {
    title: 'Introduction to Machine Learning',
    description: 'MIT ML fundamentals: regression, neural networks, CNNs, RNNs and reinforcement learning.',
    term: 7, weeklyHours: 5, instructor: 'MIT Course Staff',
    watch: 'https://openlearninglibrary.mit.edu/courses/course-v1:MITx+6.036+1T2019/about',
    notes: 'https://openlearninglibrary.mit.edu/',
    practice: 'https://openlearninglibrary.mit.edu/',
  },
  'CS188': {
    title: 'Introduction to Artificial Intelligence',
    description: 'Berkeley AI: search, CSPs, games, MDPs, reinforcement learning and Bayes nets.',
    term: 7, weeklyHours: 5, instructor: 'Prof. Dan Klein & Prof. Pieter Abbeel',
    watch: 'https://inst.eecs.berkeley.edu/~cs188/sp21/',
    notes: 'https://inst.eecs.berkeley.edu/~cs188/sp21/',
    practice: 'https://inst.eecs.berkeley.edu/~cs188/sp21/',
  },
  '6.858': {
    title: 'Computer Systems Security',
    description: 'MIT security: memory safety, isolation, web vulnerabilities, crypto and network defenses.',
    term: 7, weeklyHours: 5, instructor: 'Prof. Nickolai Zeldovich',
    watch: 'https://css.csail.mit.edu/6.858/',
    notes: 'https://css.csail.mit.edu/6.858/',
    practice: 'https://css.csail.mit.edu/6.858/',
  },
  'CS143': {
    title: 'Compilers',
    description: 'Stanford compilers: lexing, parsing, semantic analysis and code generation.',
    term: 8, weeklyHours: 6, instructor: 'Prof. Alex Aiken',
    watch: 'https://web.stanford.edu/class/cs143/',
    notes: 'https://web.stanford.edu/class/cs143/',
    practice: 'https://web.stanford.edu/class/cs143/',
  },
  'CS142': {
    title: 'Web Applications',
    description: 'Stanford web engineering: architecture, React, REST, auth, caching and scalability.',
    term: 8, weeklyHours: 6, instructor: 'Prof. Mendel Rosenblum',
    watch: 'https://web.stanford.edu/class/cs142/',
    notes: 'https://web.stanford.edu/class/cs142/',
    practice: 'https://web.stanford.edu/class/cs142/',
  },
  'CAPSTONE': {
    title: 'Senior Capstone Project',
    description: 'The final project: specify, build, test, secure and ship a real application — OSSU style.',
    term: 8, weeklyHours: 8, instructor: 'You + OSSU',
    watch: 'https://github.com/ossu/computer-science',
    notes: 'https://opensource.guide/',
    practice: 'https://github.com/ossu/computer-science',
  },
};

// Term 1 — existing real lessons (slugs preserved so completions survive) + new review lessons.
// Column order matches the PDF: 6.0001 (Mon/Thu), 18.01SC (Tue/Fri), 6.042J (Wed/Sat), Sunday technique.
const T1_WEEKS = [
  ['6-0001-w1-l1', '18-01-w1-l1', '6-042-w1-l1', '6-0001-w1-l2', '18-01-w1-l2', '6-042-w1-l2', '6-0001-w1-practice', 'Redraw'],
  ['6-0001-w2-l3', '18-01-w2-l3', '6-042-w2-l3', '6-0001-w2-l4', '18-01-w2-l4', '6-042-w2-l4', '3-box'],
  ['6-0001-w3-l5', '18-01-w3-l5', '6-042-w3-l5', '6-0001-w3-l6', '18-01-w3-l6', '6-042-w3-l6', 'States'],
  ['6-0001-w4-l7', '18-01-w4-l7', '6-042-w4-l7', '6-0001-w4-l8', '18-01-w4-l8', '6-042-w4-l8', 'Mind map'],
  ['6-0001-w5-l9', '18-01-w5-l9', '6-042-w5-l9', '6-0001-w5-l10', '18-01-w5-l10', '6-042-w5-l10', 'Trace'],
  ['6-0001-w6-l11', '18-01-w6-l11', '6-042-w6-l11', '6-0001-w6-l12', '18-01-w6-l12', '6-042-w6-l12', 'Memory'],
  ['6-0001-midterm', '18-01-midterm', '6-042-midterm', null, null, null, 'MIDTERM'],
  ['6-0001-final', '18-01-final', '6-042-final', null, null, null, 'FINAL EXAM'],
];

// Terms 2-8 — one lecture per course per week (3 lessons/week) + Sunday review, per the PDF.
// Each term: [A, B, C] courses + 13 weeks of [a, b, c, sunday].
const TERM_TABLES = [
  {
    term: 2, title: 'Foundations II', courses: ['CS50x', '18.01SC-B', '18.06'],
    weeks: [
      ['Lec 0 Scratch', 'Lec 1 Def. Integrals', 'Lec 1 Linear Eqns', 'Redraw'],
      ['Lec 1 C Language', 'Lec 2 Riemann Sums', 'Lec 2 Elimination', '3-box'],
      ['Lec 2 Arrays', 'Lec 3 Fund. Theorem', 'Lec 3 Matrix Ops', 'States'],
      ['Lec 3 Algorithms', 'Lec 4 Substitution', 'Lec 4 LU Factor', 'Mind map'],
      ['Lec 4 Memory', 'Lec 5 Int. by Parts', 'Lec 5 Transposes', 'Pointers'],
      ['Lec 5 Data Structures', 'Lec 6 Trig Integrals', 'Lec 6 Vector Spaces', 'Dual'],
      ['MIDTERM Labs', 'MIDTERM Psets', 'MIDTERM Matrices', 'MIDTERM'],
      ['Lec 6 Python', 'Lec 7 Partial Fractions', 'Lec 7 Column Space', '3-box'],
      ['Lec 7 SQL', 'Lec 8 Improper Int.', 'Lec 8 Nullspace', 'States'],
      ['Lec 8 HTML/CSS/JS', 'Lec 9 Volumes', 'Lec 9 Independence', 'Mind map'],
      ['Lec 9 Flask', 'Lec 10 Series', 'Lec 10 Subspaces', 'Memory'],
      ['Lec 10 Cybersecurity', 'Lec 11 Power Series', 'Lec 11 Determinants', 'Dual'],
      ['FINAL Web & C', 'FINAL Series', 'FINAL Eigen/SVD', 'FINAL'],
    ],
  },
  {
    term: 3, title: 'Core Programming', courses: ['CS61A', 'CS61B', 'STAT110'],
    weeks: [
      ['Lec 1 Functions', 'Lec 1 Java Basics', 'Lec 1 Combinatorics', 'Redraw'],
      ['Lec 2 Control', 'Lec 2 Arrays & JUnit', 'Lec 2 Story Proofs', '3-box'],
      ['Lec 3 Higher-Order', 'Lec 3 Interfaces', 'Lec 3 Conditional', 'States'],
      ['Lec 4 Tree Recursion', 'Lec 4 Linked Lists', 'Lec 4 Bayes', 'Mind map'],
      ['Lec 5 Sequences', 'Lec 5 Asymptotics', 'Lec 5 Random Vars', 'Trees'],
      ['Lec 6 Mutability', 'Lec 6 BSTs', 'Lec 6 PMFs', 'Dual'],
      ['MIDTERM Recursion', 'MIDTERM DS', 'MIDTERM Conditioning', 'MIDTERM'],
      ['Lec 7 OOP', 'Lec 7 Hash Tables', 'Lec 7 Expectation', '3-box'],
      ['Lec 8 Inheritance', 'Lec 8 Heaps', 'Lec 8 Variance', 'States'],
      ['Lec 9 Iterators', 'Lec 9 Graph Traversal', 'Lec 9 Continuous', 'Mind map'],
      ['Lec 10 Scheme', 'Lec 10 Shortest Paths', 'Lec 10 Convolutions', 'Trace'],
      ['Lec 11 Interpreters', 'Lec 11 Sorting & Tries', 'Lec 11 Poisson', 'Dual'],
      ['FINAL Evaluator', 'FINAL Graphs', 'FINAL Joint PMFs', 'FINAL'],
    ],
  },
  {
    term: 4, title: 'Algorithms & Hardware', courses: ['6.006', '6.046J', '6.004'],
    weeks: [
      ['Lec 1 Peak Finding', 'Lec 1 Divide & Conquer', 'Lec 1 Info Gates', 'Memory'],
      ['Lec 2 Doc Distance', 'Lec 2 FFT', 'Lec 2 CMOS', '3-box'],
      ['Lec 3 Heaps', 'Lec 3 Greedy', 'Lec 3 Comb. Logic', 'States'],
      ['Lec 4 BSTs', 'Lec 4 Huffman', 'Lec 4 FSMs', 'Mind map'],
      ['Lec 5 AVL Trees', 'Lec 5 DP I', 'Lec 5 Pipelining', 'Trace'],
      ['Lec 6 Hashing', 'Lec 6 DP II', 'Lec 6 ISAs', 'Dual'],
      ['MIDTERM BSTs', 'MIDTERM DP', 'MIDTERM FSM', 'MIDTERM'],
      ['Lec 7 Open Addr.', 'Lec 7 Bellman-Ford', 'Lec 7 Assembly', '3-box'],
      ['Lec 8 Radix Sort', 'Lec 8 All-Pairs', 'Lec 8 Compilers', 'States'],
      ['Lec 9 BFS/DFS', 'Lec 9 Max Flow', 'Lec 9 Caches', 'Mind map'],
      ['Lec 10 Topological', 'Lec 10 Randomized', 'Lec 10 Virt. Memory', 'Trace'],
      ['Lec 11 Dijkstra', 'Lec 11 Streaming', 'Lec 11 Interrupts', 'Dual'],
      ['FINAL Shortest Path', 'FINAL Flow & Cut', 'FINAL Caches', 'FINAL'],
    ],
  },
  {
    term: 5, title: 'Computer Systems', courses: ['N2T', '6.828', '6.829'],
    weeks: [
      ['Ch 1 Logic Gates', 'Lec 1 OS Booting', 'Lec 1 Layering', 'Diagram'],
      ['Ch 2 ALU', 'Lec 2 Memory Alloc', 'Lec 2 End-to-End', 'Pipeline'],
      ['Ch 3 RAM', 'Lec 3 User Processes', 'Lec 3 TCP Flow', 'States'],
      ['Ch 4 Machine Lang', 'Lec 4 Page Tables', 'Lec 4 Congestion', 'Map'],
      ['Ch 5 Hack CPU', 'Lec 5 Interrupts', 'Lec 5 Routing', 'Trace'],
      ['Ch 6 Assembler', 'Lec 6 Threads & Locks', 'Lec 6 BGP', 'Dual'],
      ['MIDTERM Hardware', 'MIDTERM Kernel', 'MIDTERM TCP/IP', 'MIDTERM'],
      ['Ch 7 VM Stack', 'Lec 7 Scheduling', 'Lec 7 Queuing', '3-box'],
      ['Ch 8 VM Control', 'Lec 8 File Systems', 'Lec 8 QoS', 'States'],
      ['Ch 9 Jack Lang', 'Lec 9 Journaling', 'Lec 9 Wireless', 'Mind map'],
      ['Ch 10 Compiler I', 'Lec 10 Net Driver', 'Lec 10 TLS', 'Trace'],
      ['Ch 11 Compiler II', 'Lec 11 OS Defense', 'Lec 11 Papers', 'Dual'],
      ['FINAL Full System', 'FINAL xv6 Kernel', 'FINAL Net Stack', 'FINAL'],
    ],
  },
  {
    term: 6, title: 'Theory & Data', courses: ['6.830', '6.045J', 'CSE341'],
    weeks: [
      ['Lec 1 Relational', 'Lec 1 DFAs', 'Lec 1 Racket Scope', 'Diagram'],
      ['Lec 2 SQL Opt.', 'Lec 2 NFAs', 'Lec 2 Tail Recursion', '3-box'],
      ['Lec 3 Buffer Pools', 'Lec 3 Regex', 'Lec 3 Closures', 'States'],
      ['Lec 4 B+ Trees', 'Lec 4 Pumping Lemma', 'Lec 4 SML Types', 'Mind map'],
      ['Lec 5 Join Algs', 'Lec 5 Pushdown', 'Lec 5 Inference', 'Trace'],
      ['Lec 6 Transactions', 'Lec 6 Turing Machines', 'Lec 6 Ruby OOP', 'Dual'],
      ['MIDTERM Storage', 'MIDTERM Automata', 'MIDTERM Types', 'MIDTERM'],
      ['Lec 7 Locking', 'Lec 7 Halting', 'Lec 7 Dynamic Scope', '3-box'],
      ['Lec 8 ARIES', 'Lec 8 Reductions', 'Lec 8 Macros', 'States'],
      ['Lec 9 Distributed', 'Lec 9 P vs NP', 'Lec 9 Subtyping', 'Mind map'],
      ['Lec 10 NoSQL', 'Lec 10 NP-Complete', 'Lec 10 GC', 'Trace'],
      ['Lec 11 Column Stores', 'Lec 11 PSPACE', 'Lec 11 Paradigms', 'Dual'],
      ['FINAL Concurrency', 'FINAL Reductions', 'FINAL Semantics', 'FINAL'],
    ],
  },
  {
    term: 7, title: 'AI & Security', courses: ['6.036', 'CS188', '6.858'],
    weeks: [
      ['Lec 1 Margin Opt', 'Lec 1 Uninformed', 'Lec 1 Buffer Overflow', 'Diagram'],
      ['Lec 2 Grad. Descent', 'Lec 2 A*', 'Lec 2 CFI', '3-box'],
      ['Lec 3 Regression', 'Lec 3 CSPs', 'Lec 3 Isolation', 'States'],
      ['Lec 4 Logistic', 'Lec 4 Minimax', 'Lec 4 Web Security', 'Mind map'],
      ['Lec 5 Neural Nets', 'Lec 5 MDPs', 'Lec 5 XSS & CSRF', 'Trace'],
      ['Lec 6 CNNs', 'Lec 6 Q-Learning', 'Lec 6 SQL Injection', 'Dual'],
      ['MIDTERM Nets', 'MIDTERM Search/MDP', 'MIDTERM Web Vulns', 'MIDTERM'],
      ['Lec 7 RNNs', 'Lec 7 Bayes Nets', 'Lec 7 Public Key', '3-box'],
      ['Lec 8 Decision Trees', 'Lec 8 Inference', 'Lec 8 Network Sec', 'States'],
      ['Lec 9 Clustering', 'Lec 9 HMMs', 'Lec 9 Mobile Sec', 'Mind map'],
      ['Lec 10 PCA', 'Lec 10 ML Apps', 'Lec 10 Side Channels', 'Trace'],
      ['Lec 11 Policy Search', 'Lec 11 Utility', 'Lec 11 Fuzzing', 'Dual'],
      ['FINAL Backprop', 'FINAL Bayes & HMMs', 'FINAL Kernel Defenses', 'FINAL'],
    ],
  },
  {
    term: 8, title: 'Software Engineering & Capstone', courses: ['CS143', 'CS142', 'CAPSTONE'],
    weeks: [
      ['Lec 1 Lexical Analysis', 'Lec 1 Web Arch.', 'System Requirements', 'Charter'],
      ['Lec 2 Parsing CFGs', 'Lec 2 JS & Async', 'Database Schema', 'Diagram'],
      ['Lec 3 LL(1)', 'Lec 3 React State', 'API Specs', 'Data flow'],
      ['Lec 4 LR(1)', 'Lec 4 Frameworks', 'Backend Setup', 'Pipeline'],
      ['Lec 5 Semantic', 'Lec 5 REST APIs', 'Core MVP Sprint', 'State'],
      ['Lec 6 Symbol Tables', 'Lec 6 ORM', 'Frontend Integration', 'Arch map'],
      ['MIDTERM Lex/Parse', 'MIDTERM Full-Stack', 'MVP Demo', 'DEMO DAY'],
      ['Lec 7 Runtime Layout', 'Lec 7 Auth & JWT', 'CI/CD & Tests', '3-box'],
      ['Lec 8 IR Code Gen', 'Lec 8 Caching', 'Load Testing', 'Perf map'],
      ['Lec 9 Optimisation', 'Lec 9 WebSockets', 'Security Hardening', 'Mind map'],
      ['Lec 10 Register Alloc', 'Lec 10 Docker', 'Tech Docs', 'Code review'],
      ['Lec 11 Machine Code', 'Lec 11 Scalability', 'Production Release', 'Readiness'],
      ['FINAL Defense Compiler', 'FINAL Defense Web', 'Capstone Release', 'GRADUATION'],
    ],
  },
];

const TERM_TITLES = {
  1: 'Foundations I',
};

// Sunday review techniques — what each actually means.
const TECHNIQUES = {
  Redraw: {
    title: 'Redraw',
    summary: 'Redraw the week\u2019s key diagrams and mental models entirely from memory — no peeking. Then compare with your notes, mark the gaps, and redraw once more until it flows.',
  },
  '3-box': {
    title: '3-box summary',
    summary: 'For each big idea of the week, explain it in exactly three boxes: what it is, why it matters, and how it works. Plain words only — if you cannot fill a box, you have found your gap.',
  },
  States: {
    title: 'State the definitions',
    summary: 'Write every new definition, theorem and invariant from the week from memory, precisely. Precision is the whole exercise: one wrong word changes the meaning.',
  },
  'Mind map': {
    title: 'Mind map',
    summary: 'Draw a mind map connecting this week\u2019s concepts to everything learned so far. Connections are what turn isolated facts into usable knowledge.',
  },
  Trace: {
    title: 'Trace by hand',
    summary: 'Pick three algorithms or derivations from the week and trace them by hand on paper, step by step, with a small concrete input. No shortcuts.',
  },
  Memory: {
    title: 'Memory palace',
    summary: 'Place the week\u2019s key facts in a familiar room — one object per fact. Walk through the room twice today and once tomorrow.',
  },
  Mapping: {
    title: 'Concept mapping',
    summary: 'Map the week\u2019s concepts onto the course map: where each idea came from, what it builds on, and where it is heading.',
  },
  Dual: {
    title: 'Dual coding',
    summary: 'Convert one text-only topic into a diagram, and one diagram-only topic into words. Switching representations exposes shallow understanding.',
  },
  Pointers: {
    title: 'Pointer drills',
    summary: 'Draw memory diagrams for pointer-based structures from the week and trace what each operation really touches.',
  },
  Trees: {
    title: 'Tree walks',
    summary: 'Draw this week\u2019s tree structures and label every operation: insert, search, balance, rotate. Say the invariant out loud at each step.',
  },
  Diagram: {
    title: 'System diagram',
    summary: 'Redraw the week\u2019s system or hardware diagram from memory: every component, every arrow, every interface labeled.',
  },
  Pipeline: {
    title: 'Pipeline walkthrough',
    summary: 'Walk one input through the full pipeline end to end on paper, naming what every stage does to it.',
  },
  Map: {
    title: 'Layer map',
    summary: 'Redraw the layer map: which abstraction each mechanism lives in and what it hides from the layer above.',
  },
  States2: {
    title: 'State machines',
    summary: 'Write the state machine for one mechanism from the week: states, transitions, and the invariant each state guarantees.',
  },
  Charter: {
    title: 'Project charter',
    summary: 'Write the one-page charter: what you are building, for whom, what done means, and what you will NOT build. Scope creep dies here.',
  },
  'Data flow': {
    title: 'Data-flow diagram',
    summary: 'Draw how data moves through your project end to end: inputs, transformations, storage, outputs. Every arrow gets a name.',
  },
  Pipeline2: {
    title: 'Delivery pipeline',
    summary: 'Sketch the build-test-deploy pipeline: what runs, in what order, and what blocks a release.',
  },
  State: {
    title: 'State of the app',
    summary: 'List every piece of state in your project — client, server, database — and who owns it. Surprises here are bugs waiting to happen.',
  },
  'Arch map': {
    title: 'Architecture map',
    summary: 'Redraw the full architecture from memory: services, boundaries, protocols, failure modes.',
  },
  'Perf map': {
    title: 'Performance map',
    summary: 'List the top five expected hotspots with a reason for each, and how you would prove or disprove each one.',
  },
  'Code review': {
    title: 'Self code review',
    summary: 'Review your own diff like a stranger: naming, error handling, tests, dead code. Fix what a reviewer would flag.',
  },
  Readiness: {
    title: 'Launch readiness',
    summary: 'Go through the launch checklist: backups, monitoring, rollback, secrets, limits. Anything untested gets a test today.',
  },
  MIDTERM: {
    title: 'Midterm day',
    summary: '90 minutes, closed notes. Redo your two hardest problem sets from this term from scratch. Grade yourself honestly, then review every miss.',
  },
  'FINAL EXAM': {
    title: 'Final exam',
    summary: 'Three hours, closed notes: a full past exam per course where available, else the hardest problems from every pset. Then celebrate — term complete!',
  },
  FINAL: {
    title: 'Final review',
    summary: 'Final exam day for this course. Close the notes, take the exam, then review every miss until you can explain it cold.',
  },
  'DEMO DAY': {
    title: 'Demo day',
    summary: 'Demo your MVP to a real human. Watch where they get confused — that is your backlog, in priority order.',
  },
  GRADUATION: {
    title: 'Graduation',
    summary: 'Ship the release, write the retrospective, and take the win seriously: you built the whole stack, from Nand to Tetris to production. Congratulations!',
  },
};

// Fallback for any technique not in the map above.
const TECHNIQUE_DEFAULT = {
  title: 'Weekly review',
  summary: 'Close the notes and reconstruct this week\u2019s ideas from memory: definitions, diagrams and one worked example per idea.',
};

module.exports = { COURSES, T1_WEEKS, TERM_TABLES, TERM_TITLES, TECHNIQUES, TECHNIQUE_DEFAULT };
