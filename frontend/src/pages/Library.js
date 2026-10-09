import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookOpen, FiExternalLink, FiX, FiDownload, FiLayers, FiTarget,
  FiTool, FiZap, FiArrowRight, FiFileText, FiGrid, FiMap, FiCheckCircle,
  FiMaximize2, FiMinimize2,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

/* Full-screen in-app reader (PDF or HTML book).
   Rendered through a portal to document.body so the overlay always sizes to
   the real viewport — an ancestor with a CSS filter (the page-transition
   blur) would otherwise become the containing block for position:fixed and
   stretch the frame to the full page height, cutting it off below the fold. */
const Reader = ({ book, onClose }) => {
  const rootRef = useRef(null);
  const fsRef = useRef(false);
  const [fsMode, setFsMode] = useState(false);

  const setFs = (v) => { fsRef.current = v; setFsMode(v); };

  const enterFs = async () => {
    setFs(true);
    try {
      if (rootRef.current && rootRef.current.requestFullscreen && !document.fullscreenElement) {
        await rootRef.current.requestFullscreen();
      }
    } catch {
      /* Native Fullscreen API unavailable (e.g. iOS Safari) — stay in the
         in-app immersive mode: header hidden, book fills the viewport. */
    }
  };

  const exitFs = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
    } catch {
      /* noop */
    }
    setFs(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (fsRef.current) exitFs();
        else onClose();
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (fsRef.current) exitFs();
        else enterFs();
      }
    };
    /* Keep state in sync when the browser leaves fullscreen on its own
       (Esc / F11 at browser level). */
    const onFsChange = () => { if (!document.fullscreenElement) setFs(false); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFsChange);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFsChange);
      document.body.style.overflow = '';
      try {
        if (document.fullscreenElement) document.exitFullscreen();
      } catch {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const shell = (
    <motion.div
      ref={rootRef}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(58,42,18,.55)', backdropFilter: 'blur(6px)', height: '100dvh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {!fsMode && (
        <div className="glass-strong rounded-none flex items-center justify-between px-4 sm:px-6 py-3 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(180deg, #f2d894, #d9a441)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 3px 9px rgba(138,100,34,.35)',
              }}
            >
              <FiBookOpen className="w-5 h-5 text-espresso-900" />
            </span>
            <div className="min-w-0">
              <div className="font-display font-bold text-espresso-800 truncate">{book.title}</div>
              <div className="text-[11px] font-bold text-espresso-500 truncate">{book.author}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {book.downloadName && (
              <a href={book.src} download={book.downloadName} className="btn btn-cream !py-1.5 !px-3 text-[11px]">
                <FiDownload className="w-3.5 h-3.5" />
                Save
              </a>
            )}
            <button onClick={enterFs} className="btn btn-cream !py-1.5 !px-3 text-[11px]" title="Fullscreen (F)">
              <FiMaximize2 className="w-3.5 h-3.5" />
              Fullscreen
            </button>
            <button onClick={onClose} className="btn btn-gold !py-1.5 !px-3 text-[11px]">
              <FiX className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
        </div>
      )}
      <iframe
        src={book.src}
        title={book.title}
        className="flex-1 min-h-0 w-full bg-white border-0"
      />
      {fsMode && (
        <button
          onClick={exitFs}
          title="Exit fullscreen (Esc)"
          aria-label="Exit fullscreen"
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full glass-strong flex items-center justify-center"
          style={{ boxShadow: '0 6px 18px rgba(58,42,18,.35)' }}
        >
          <FiMinimize2 className="w-5 h-5 text-espresso-700" />
        </button>
      )}
    </motion.div>
  );

  return createPortal(shell, document.body);
};

const EMBEDDED_BOOKS = [
  {
    id: 'thinkpython',
    title: 'Think Python 2e',
    subtitle: 'The 6.0001 companion',
    author: 'Allen B. Downey · Green Tea Press · CC BY-NC',
    src: '/books/thinkpython2.pdf',
    downloadName: 'thinkpython2.pdf',
    kind: 'pdf',
    note: 'The official free textbook that pairs with MIT 6.0001 — read it right here.',
    accent: 'from-sage-300 to-sage-500',
  },
  {
    id: 'sicp',
    title: 'SICP',
    subtitle: 'Structure & Interpretation of Computer Programs',
    author: 'Abelson, Sussman & Sussman · MIT Press · free edition',
    src: '/books/sicp/full-text/book/book-Z-H-1.html',
    downloadName: null,
    kind: 'html',
    note: 'The legendary Wizard Book, full text — pairs with CS61A in Term 3.',
    accent: 'from-honey-300 to-honey-600',
  },
  {
    id: 'ostep',
    title: 'OSTEP',
    subtitle: 'Operating Systems: Three Easy Pieces',
    author: 'Arpaci-Dusseau & Arpaci-Dusseau · free edition',
    src: '/books/ostep.pdf',
    downloadName: 'ostep.pdf',
    kind: 'pdf',
    note: 'The complete free OS book (63 chapters) — your companion for Terms 5 and 6.',
    accent: 'from-blush-300 to-blush-500',
  },
  {
    id: 'xv6',
    title: 'xv6 Book',
    subtitle: 'A Commentary on the xv6 Kernel',
    author: 'Cox, Kaashoek & Morris · MIT PDOS',
    src: '/books/xv6-book-rev11.pdf',
    downloadName: 'xv6-book-rev11.pdf',
    kind: 'pdf',
    note: 'The line-by-line guide to the xv6 kernel you will hack in MIT 6.828.',
    accent: 'from-espresso-300 to-espresso-600',
  },
];

/* The full course bookshelf: 8 terms, 24 courses, every course with books.
   b.t title · b.a author/source · b.src in-app file (embedded) · b.url free online book */
const SHELF = [
  {
    term: 1,
    name: 'Foundations I',
    courses: [
      {
        code: '6.0001', title: 'Intro to CS & Python',
        books: [
          { t: 'Think Python 2e', a: 'Downey · Green Tea Press · CC BY-NC', src: '/books/thinkpython2.pdf', dl: 'thinkpython2.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: '18.01SC', title: 'Single Variable Calculus — 1A',
        books: [
          { t: 'Calculus', a: 'Gilbert Strang · MIT OCW · CC BY-NC-SA', src: '/books/calculus-strang.pdf', dl: 'calculus-strang.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: '6.042J', title: 'Mathematics for Computer Science',
        books: [
          { t: 'Mathematics for Computer Science', a: 'Lehman, Leighton & Meyer · MIT OCW · CC BY-NC-SA', src: '/books/mcs.pdf', dl: 'mcs.pdf', accent: 'from-blush-300 to-blush-500' },
        ],
      },
    ],
  },
  {
    term: 2,
    name: 'Foundations II',
    courses: [
      {
        code: 'CS50X', title: "CS50's Introduction to CS",
        books: [
          { t: "Beej's Guide to C Programming", a: 'Brian "Beej" Hall · beej.us · free edition', src: '/books/beejc.pdf', dl: 'beejc.pdf', accent: 'from-espresso-300 to-espresso-600' },
          { t: 'Think Python 2e', a: 'Downey · pairs with the Python weeks', src: '/books/thinkpython2.pdf', dl: 'thinkpython2.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: '18.01SC-B', title: 'Single Variable Calculus — 1B',
        books: [
          { t: 'Calculus (integration & series chapters)', a: 'Gilbert Strang · MIT OCW · CC BY-NC-SA', src: '/books/calculus-strang.pdf', dl: 'calculus-strang.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: '18.06', title: 'Linear Algebra',
        books: [
          { t: 'Linear Algebra', a: 'Cherney, Denton & Waldron · UC Davis · free edition', src: '/books/linear-algebra.pdf', dl: 'linear-algebra.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: '18.02', title: 'Multivariable Calculus',
        books: [
          { t: '18.02 Course Materials (Auroux)', a: 'MIT OCW Fall 2007 · full video lectures + notes · free online', url: 'https://ocw.mit.edu/courses/18-02-multivariable-calculus-fall-2007/', accent: 'from-honey-300 to-honey-600' },
        ],
      },
    ],
  },
  {
    term: 3,
    name: 'Core Programming',
    courses: [
      {
        code: 'CS61A', title: 'Structure & Interpretation',
        books: [
          { t: 'SICP — full text', a: 'Abelson, Sussman & Sussman · MIT Press', src: '/books/sicp/full-text/book/book-Z-H-1.html', dl: null, k: 'html', accent: 'from-honey-300 to-honey-600' },
          { t: 'Composing Programs', a: 'Harvey · the official CS61A text · free online', url: 'https://composingprograms.com/', accent: 'from-blush-300 to-blush-500' },
        ],
      },
      {
        code: 'CS61B', title: 'Data Structures',
        books: [
          { t: 'Open Data Structures (Java edition)', a: 'Pat Morin · opendatastructures.org · CC', src: '/books/opends-java.pdf', dl: 'opends-java.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: 'STAT110', title: 'Probability',
        books: [
          { t: 'Introduction to Probability', a: 'Grinstead & Snell · GNU FDL · free edition', src: '/books/prob.pdf', dl: 'prob.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: '18.03', title: 'Differential Equations',
        books: [
          { t: '18.03 Course Materials (Mattuck)', a: 'MIT OCW Spring 2010 · full video lectures + notes · free online', url: 'https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/', accent: 'from-blush-300 to-blush-500' },
        ],
      },
    ],
  },
  {
    term: 4,
    name: 'Algorithms & Hardware',
    courses: [
      {
        code: '6.006', title: 'Introduction to Algorithms',
        books: [
          { t: 'MIT 6.006 Lecture Notes Reader', a: 'MIT OCW Spring 2020 · CC BY-NC-SA', src: '/books/6006-notes.pdf', dl: '6006-notes.pdf', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
      {
        code: '6.046J', title: 'Design & Analysis of Algorithms',
        books: [
          { t: 'MIT 6.046J Lecture Notes Reader', a: 'MIT OCW Spring 2015 · CC BY-NC-SA', src: '/books/6046-notes.pdf', dl: '6046-notes.pdf', accent: 'from-blush-300 to-blush-500' },
        ],
      },
      {
        code: '6.004', title: 'Computation Structures',
        books: [
          { t: 'MIT 6.004 Lecture Notes Reader', a: 'MIT OCW Spring 2009 · CC BY-NC-SA', src: '/books/6004-notes.pdf', dl: '6004-notes.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: '6.1020', title: 'Software Construction',
        books: [
          { t: '6.031: Software Construction — Readings', a: 'MIT 6.031 sp21 · the complete official readings · free online', url: 'https://web.mit.edu/6.031/www/sp21/', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
    ],
  },
  {
    term: 5,
    name: 'Computer Systems',
    courses: [
      {
        code: 'N2T', title: 'Nand to Tetris',
        books: [
          { t: 'Nand2Tetris Projects Reader', a: 'Nisan & Schocken · nand2tetris.org · official booklets', src: '/books/n2t-projects.pdf', dl: 'n2t-projects.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: '6.828', title: 'Operating System Engineering',
        books: [
          { t: 'Operating Systems: Three Easy Pieces', a: 'Arpaci-Dusseau & Arpaci-Dusseau · free edition', src: '/books/ostep.pdf', dl: 'ostep.pdf', accent: 'from-blush-300 to-blush-500' },
          { t: 'xv6 Book', a: 'Cox, Kaashoek & Morris · MIT PDOS', src: '/books/xv6-book-rev11.pdf', dl: 'xv6-book-rev11.pdf', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
      {
        code: '6.829', title: 'Computer Networks',
        books: [
          { t: 'Computer Networks: A Systems Approach', a: 'Peterson & Davie 6e · CC BY 4.0', src: '/books/networks-systems-approach.pdf', dl: 'networks-systems-approach.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
    ],
  },
  {
    term: 6,
    name: 'Theory & Data',
    courses: [
      {
        code: '6.830', title: 'Database Systems',
        books: [
          { t: 'Foundations of Databases', a: 'Abiteboul, Hull & Vianu · free official edition', src: '/books/foundations-databases.pdf', dl: 'foundations-databases.pdf', accent: 'from-honey-300 to-honey-600' },
          { t: 'Readings in Database Systems', a: 'Hellerstein et al. · the Redbook · free online', url: 'https://www.redbook.io/', accent: 'from-blush-300 to-blush-500' },
        ],
      },
      {
        code: '6.045J', title: 'Automata, Computability & Complexity',
        books: [
          { t: 'MIT 6.045J Lecture Notes Reader', a: 'MIT OCW Spring 2011 · CC BY-NC-SA', src: '/books/6045-notes.pdf', dl: '6045-notes.pdf', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
      {
        code: 'CSE341', title: 'Programming Languages',
        books: [
          { t: 'PLAI — Programming Languages: Application & Interpretation', a: 'Krishnamurthi · CC BY-NC-SA 4.0', src: '/books/plai.pdf', dl: 'plai.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
    ],
  },
  {
    term: 7,
    name: 'AI & Security',
    courses: [
      {
        code: '6.036', title: 'Introduction to Machine Learning',
        books: [
          { t: 'Introduction to Statistical Learning (ISLR)', a: 'James, Hastie, Tibshirani & Witten · free official', src: '/books/isl.pdf', dl: 'isl.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: 'CS188', title: 'Introduction to Artificial Intelligence',
        books: [
          { t: 'Reinforcement Learning: An Introduction', a: 'Sutton & Barto 2e · MIT Press · free edition', src: '/books/rlbook.pdf', dl: 'rlbook.pdf', accent: 'from-blush-300 to-blush-500' },
        ],
      },
      {
        code: '6.858', title: 'Computer Systems Security',
        books: [
          { t: 'Web Security Testing Guide', a: 'OWASP WSTG 4.2 · CC BY-SA', src: '/books/wstg.pdf', dl: 'wstg.pdf', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
    ],
  },
  {
    term: 8,
    name: 'Software Engineering & Capstone',
    courses: [
      {
        code: 'CS143', title: 'Compilers',
        books: [
          { t: 'Basics of Compiler Design', a: 'Torben Mogensen · DIKU · free edition', src: '/books/compiler-basics.pdf', dl: 'compiler-basics.pdf', accent: 'from-sage-300 to-sage-500' },
        ],
      },
      {
        code: 'CS142', title: 'Web Applications',
        books: [
          { t: 'Eloquent JavaScript 3e', a: 'Marijn Haverbeke · CC BY-NC', src: '/books/eloquentjs.pdf', dl: 'eloquentjs.pdf', accent: 'from-honey-300 to-honey-600' },
        ],
      },
      {
        code: 'CAPSTONE', title: 'Senior Capstone Project',
        books: [
          { t: 'Pro Git 2e', a: 'Chacon & Straub · CC BY-NC-SA', src: '/books/progit.pdf', dl: 'progit.pdf', accent: 'from-blush-300 to-blush-500' },
          { t: 'Software Engineering at Google', a: 'Winters, Manshreck & Wright · free online', url: 'https://www.abseil.io/resources/swe-book', accent: 'from-espresso-300 to-espresso-600' },
        ],
      },
    ],
  },
];

const RECOMMENDED_BOOKS = [
  { title: 'Computer Systems: A Programmer\u2019s Perspective', note: 'CSAPP — the systems deep-dive. Pairs with Terms 4-6.', url: 'https://csapp.cs.cmu.edu/' },
  { title: 'Introduction to Algorithms (CLRS)', note: 'The standard algorithms reference for Terms 4-5.', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
  { title: 'Designing Data-Intensive Applications', note: 'DDIA — modern systems design. Read after Term 5-6.', url: 'https://dataintensive.net/' },
  { title: 'Computer Networking: A Top-Down Approach', note: 'Kurose & Ross — the classic networks companion (Term 5).', url: 'https://gaia.cs.umass.edu/kurose_ross/' },
  { title: 'Introduction to the Theory of Computation', note: 'Sipser — the beloved theory of computation text (Term 6).', url: 'https://math.mit.edu/~sipser/book.html' },
  { title: 'Artificial Intelligence: A Modern Approach', note: 'AIMA — the CS188 companion (Term 7).', url: 'https://aima.cs.berkeley.edu/' },
];

const PLATFORMS = [
  { name: 'LeetCode', note: 'Algorithms practice — start after Term 4', url: 'https://leetcode.com/' },
  { name: 'Codeforces', note: 'Competitive programming contests', url: 'https://codeforces.com/' },
  { name: 'AtCoder', note: 'Clean, well-set contests', url: 'https://atcoder.jp/' },
  { name: 'Project Euler', note: 'Math + programming puzzles', url: 'https://projecteuler.net/' },
  { name: 'Advent of Code', note: 'Yearly December challenge', url: 'https://adventofcode.com/' },
  { name: 'OverTheWire', note: 'Security / Linux wargames', url: 'https://overthewire.org/wargames/' },
  { name: 'Hack The Box', note: 'Practical security labs — after 6.858', url: 'https://www.hackthebox.com/' },
];

const EXTRA_COURSES = [
  { name: 'Missing Semester', note: 'MIT — shell, git, debugging. Do this early.', url: 'https://missing.csail.mit.edu/' },
  { name: 'Full Stack Open', note: 'Helsinki — modern React + Node', url: 'https://fullstackopen.com/en/' },
  { name: 'CS50 Web Programming', note: 'Harvard — Python/JS web, after CS50x', url: 'https://cs50.harvard.edu/web/' },
  { name: 'Fast.ai', note: 'Hands-on deep learning — after 6.036/CS188', url: 'https://www.fast.ai/' },
];

const TOOLS = [
  { name: 'VisuAlgo', note: 'Algorithm visualisations', url: 'https://visualgo.net/' },
  { name: 'Compiler Explorer', note: 'See what your code compiles to', url: 'https://godbolt.org/' },
  { name: 'Excalidraw', note: 'Quick diagrams and system sketches', url: 'https://excalidraw.com/' },
  { name: 'Anki', note: 'Spaced-repetition flashcards for theory', url: 'https://apps.ankiweb.net/' },
];

const QUICK_START = [
  'Every course in your 8-term path has books right here — open the bookshelf below.',
  'Follow Today — two lessons per day, every day. Consistency beats intensity.',
  'Read the matching book chapters as you go; the readers are built into this page.',
  'Do the problem sets. Watching lectures alone is not enough.',
  'Mark lessons complete to build your streak — the dashboard tracks everything.',
  'The commercial classics are listed as recommended companions, never required.',
  'Term 8 is where you prove you can build something real. Start thinking early.',
];

const LinkCard = ({ name, note, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="glass rounded-2xl p-4 flex items-center gap-3 group hover:-translate-y-0.5 transition-transform"
  >
    <span
      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
      style={{
        background: 'linear-gradient(180deg, #fdeec4, #f2d894)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7)',
      }}
    >
      <FiExternalLink className="w-4 h-4 text-espresso-700" />
    </span>
    <div className="min-w-0 flex-1">
      <div className="font-bold text-espresso-800 text-sm group-hover:text-honey-700 transition-colors">{name}</div>
      <div className="text-xs text-espresso-500 truncate">{note}</div>
    </div>
    <FiArrowRight className="w-4 h-4 text-espresso-300 group-hover:text-honey-600 transition-colors shrink-0" />
  </a>
);

/* One book row on the shelf */
const ShelfBook = ({ b, onOpen }) => {
  if (b.url) {
    return (
      <a
        href={b.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-left rounded-2xl p-3 flex items-center gap-3 group hover:-translate-y-0.5 transition-transform"
        style={{ background: 'rgba(255,255,255,.5)', boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.08)' }}
      >
        <div className={`w-9 h-12 rounded-lg shrink-0 bg-gradient-to-br ${b.accent} flex items-center justify-center`}
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 4px 10px rgba(92,65,28,.2)' }}>
          <FiBookOpen className="w-4 h-4 text-white drop-shadow" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-espresso-800 text-sm leading-snug group-hover:text-honey-700 transition-colors">{b.t}</div>
          <div className="text-[11px] text-espresso-500 truncate">{b.a}</div>
        </div>
        <span className="text-[10px] font-bold text-honey-700 shrink-0 flex items-center gap-1">
          ONLINE <FiExternalLink className="w-3 h-3" />
        </span>
      </a>
    );
  }
  return (
    <button
      onClick={() => onOpen(b)}
      className="w-full text-left rounded-2xl p-3 flex items-center gap-3 group hover:-translate-y-0.5 transition-transform"
      style={{ background: 'rgba(255,255,255,.5)', boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.08)' }}
    >
      <div className={`w-9 h-12 rounded-lg shrink-0 bg-gradient-to-br ${b.accent} flex items-center justify-center`}
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 4px 10px rgba(92,65,28,.2)' }}>
        <FiBookOpen className="w-4 h-4 text-white drop-shadow" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold text-espresso-800 text-sm leading-snug group-hover:text-honey-700 transition-colors">{b.t}</div>
        <div className="text-[11px] text-espresso-500 truncate">{b.a}</div>
      </div>
      <span className="text-[10px] font-bold text-honey-700 shrink-0 flex items-center gap-1">
        READ <FiBookOpen className="w-3 h-3" />
      </span>
    </button>
  );
};

const CourseCard = ({ c, onOpen }) => (
  <div
    className="rounded-3xl p-4"
    style={{
      background: 'linear-gradient(180deg, #fffbf0, #fdeec4)',
      border: '1px solid rgba(255,255,255,.75)',
      boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.1)',
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <span
        className="shrink-0 text-[10px] font-display font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg text-espresso-800"
        style={{ background: 'linear-gradient(180deg, #f2d894, #d9a441)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)' }}
      >
        {c.code}
      </span>
      <span className="font-bold text-espresso-800 text-sm truncate">{c.title}</span>
    </div>
    <div className="space-y-2">
      {c.books.map((b) => <ShelfBook key={b.t} b={b} onOpen={onOpen} />)}
    </div>
  </div>
);

const Library = () => {
  const [reading, setReading] = useState(null);
  const [activeTerm, setActiveTerm] = useState(1);

  const openBook = (b) => setReading({
    title: b.t,
    author: b.a,
    src: b.src,
    downloadName: b.dl,
    kind: b.k || 'pdf',
  });

  const term = SHELF.find((s) => s.term === activeTerm) || SHELF[0];

  return (
    <div className="space-y-6">
      {/* ---------- Header ---------- */}
      <motion.div
        className="glass-strong rounded-[1.75rem] p-7 sm:p-9 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(242,201,160,.6) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="course-tag">Library</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
              <FiLayers className="w-3 h-3" />
              27 books & companions · 27 courses · 8 terms
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
            Books, Right Inside the App
          </h1>
          <p className="text-espresso-600 mt-2.5 max-w-2xl">
            Every course on your path now has its books — downloaded into Full Stack Ocean and
            readable in the built-in reader. MIT textbooks, official course readers and free
            editions, organized term by term. No downloads to manage, no external sites.
          </p>
        </div>
      </motion.div>

      {/* ---------- Featured books ---------- */}
      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EMBEDDED_BOOKS.map((b) => (
          <StaggerItem key={b.id}>
            <div className="glass-strong rounded-3xl p-5 h-full flex flex-col relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-36 h-36 rounded-full pointer-events-none opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(242,201,160,.5) 0%, transparent 65%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="relative">
                <div
                  className={`h-24 rounded-2xl bg-gradient-to-br ${b.accent} flex items-center justify-center mb-4`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 6px 16px rgba(92,65,28,.18)' }}
                >
                  <FiBookOpen className="w-10 h-10 text-white drop-shadow" />
                </div>
                <h3 className="font-display text-lg font-bold text-espresso-800">{b.title}</h3>
                <p className="text-[11px] font-bold uppercase tracking-wide text-honey-700 mt-0.5">{b.subtitle}</p>
                <p className="text-xs text-espresso-500 mt-1.5 leading-relaxed">{b.author}</p>
                <p className="text-sm text-espresso-600 mt-2 leading-relaxed">{b.note}</p>
              </div>
              <div className="relative mt-4 pt-3 border-t border-white/50 mt-auto">
                <button onClick={() => setReading(b)} className="btn btn-gold w-full !py-2 text-xs">
                  <FiBookOpen className="w-3.5 h-3.5" />
                  Read in-app
                </button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* ---------- Course bookshelf ---------- */}
      <motion.div
        className="glass-strong rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-espresso-800 flex items-center gap-2">
              <FiGrid className="w-5 h-5 text-honey-600" />
              The Course Bookshelf
            </h2>
            <p className="text-sm text-espresso-500 mt-1">
              All 8 terms · all 24 courses · every single one has books waiting for you.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-honey-700 bg-honey-100/60 rounded-full px-3 py-1.5">
            <FiCheckCircle className="w-3.5 h-3.5" />
            100% course coverage
          </span>
        </div>

        {/* Term selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          {SHELF.map((s) => (
            <button
              key={s.term}
              onClick={() => setActiveTerm(s.term)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTerm === s.term
                  ? 'text-espresso-900'
                  : 'text-espresso-500 hover:text-espresso-700'
              }`}
              style={
                activeTerm === s.term
                  ? {
                      background: 'linear-gradient(180deg, #f2d894, #d9a441)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 3px 9px rgba(138,100,34,.3)',
                    }
                  : { background: 'rgba(255,255,255,.5)', boxShadow: 'inset 0 1px 0 #fff' }
              }
            >
              Term {s.term} · {s.name}
            </button>
          ))}
        </div>

        {/* Courses of the active term */}
        <AnimatePresence mode="wait">
          <motion.div
            key={term.term}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center gap-2 mb-3 text-espresso-600">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-espresso-900 text-sm"
                style={{ background: 'linear-gradient(180deg, #f2d894, #d9a441)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)' }}>
                {term.term}
              </span>
              <span className="font-display font-bold">{term.name}</span>
              <FiMap className="w-3.5 h-3.5 text-espresso-400" />
              <span className="text-xs text-espresso-500">3 courses</span>
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {term.courses.map((c) => (
                <StaggerItem key={c.code}>
                  <CourseCard c={c} onOpen={openBook} />
                </StaggerItem>
              ))}
            </Stagger>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ---------- Recommended (not free) ---------- */}
      <motion.div
        className="glass rounded-3xl p-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
      >
        <h2 className="font-display text-xl font-bold text-espresso-800 mb-1 flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-honey-600" />
          Recommended companions
        </h2>
        <p className="text-sm text-espresso-500 mb-4">
          These are commercial books (not free to redistribute) — worth owning for the deep dives.
          The free editions above already cover every course.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RECOMMENDED_BOOKS.map((b) => (
            <a
              key={b.title}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-4 group hover:-translate-y-0.5 transition-transform"
              style={{ background: 'rgba(255,255,255,.5)', boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.08)' }}
            >
              <div className="font-bold text-espresso-800 text-sm leading-snug">{b.title}</div>
              <div className="text-xs text-espresso-500 mt-1">{b.note}</div>
              <div className="text-[11px] font-bold text-honey-700 mt-2 inline-flex items-center gap-1">
                Official page <FiExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </motion.div>

      {/* ---------- Quick start ---------- */}
      <motion.div
        className="glass rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
      >
        <h2 className="font-display text-xl font-bold text-espresso-800 mb-4 flex items-center gap-2">
          <FiZap className="w-5 h-5 text-honey-600" />
          How to use your curriculum
        </h2>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {QUICK_START.map((s, i) => (
            <StaggerItem key={i}>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-3 text-sm text-espresso-700"
                style={{
                  background: 'linear-gradient(180deg, #fffbf0, #fdeec4)',
                  border: '1px solid rgba(255,255,255,.75)',
                  boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.1)',
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center font-display font-bold text-espresso-900 text-xs shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, #f2d894, #d9a441)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)',
                  }}
                >
                  {i + 1}
                </span>
                {s}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>

      {/* ---------- Platforms / courses / tools ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div
          className="glass rounded-3xl p-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          <h3 className="font-display font-bold text-espresso-800 mb-3 flex items-center gap-2">
            <FiTarget className="w-4 h-4 text-honey-600" /> Practice platforms
          </h3>
          <div className="space-y-2.5">
            {PLATFORMS.map((p) => <LinkCard key={p.name} {...p} />)}
          </div>
        </motion.div>
        <motion.div
          className="glass rounded-3xl p-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          <h3 className="font-display font-bold text-espresso-800 mb-3 flex items-center gap-2">
            <FiLayers className="w-4 h-4 text-honey-600" /> Extra modern courses
          </h3>
          <div className="space-y-2.5">
            {EXTRA_COURSES.map((p) => <LinkCard key={p.name} {...p} />)}
          </div>
        </motion.div>
        <motion.div
          className="glass rounded-3xl p-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          <h3 className="font-display font-bold text-espresso-800 mb-3 flex items-center gap-2">
            <FiTool className="w-4 h-4 text-honey-600" /> Tools & visualisers
          </h3>
          <div className="space-y-2.5">
            {TOOLS.map((p) => <LinkCard key={p.name} {...p} />)}
          </div>
        </motion.div>
      </div>

      <p className="text-center text-[11px] text-espresso-400 leading-relaxed px-6">
        Books hosted here are the official free editions — MIT OCW (CC BY-NC-SA), MIT Press free
        editions, Green Tea Press, MIT PDOS, Brown University (PLAI), UC Davis, the OSTEP authors,
        Beej, OWASP (CC BY-SA), Systems Approach (CC BY), INRIA and the respective authors. All
        materials remain the property of their institutions and authors.
      </p>

      {/* ---------- Reader overlay ---------- */}
      <AnimatePresence>
        {reading && <Reader book={reading} onClose={() => setReading(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Library;
