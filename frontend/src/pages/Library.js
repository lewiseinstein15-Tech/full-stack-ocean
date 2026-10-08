import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiBookOpen, FiExternalLink, FiX, FiDownload, FiLayers, FiTarget,
  FiTool, FiZap, FiCheck, FiArrowRight, FiFileText,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

/* Full-screen in-app reader (PDF or HTML book) */
const Reader = ({ book, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(58,42,18,.55)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <a href={book.src} download={book.downloadName} className="btn btn-cream !py-1.5 !px-3 text-[11px]">
            <FiDownload className="w-3.5 h-3.5" />
            Save
          </a>
          <button onClick={onClose} className="btn btn-gold !py-1.5 !px-3 text-[11px]">
            <FiX className="w-3.5 h-3.5" />
            Close
          </button>
        </div>
      </div>
      <iframe
        src={book.src}
        title={book.title}
        className="flex-1 w-full bg-white border-0"
      />
    </motion.div>
  );
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

const RECOMMENDED_BOOKS = [
  { title: 'Computer Systems: A Programmer\u2019s Perspective', note: 'CSAPP — the systems deep-dive. Pairs with Terms 4-6.', url: 'https://csapp.cs.cmu.edu/' },
  { title: 'Introduction to Algorithms (CLRS)', note: 'The standard algorithms reference for Terms 4-5.', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
  { title: 'Designing Data-Intensive Applications', note: 'DDIA — modern systems design. Read after Term 5-6.', url: 'https://dataintensive.net/' },
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
  'Skim the course catalog so you know where every official video, book and problem set lives.',
  'Follow Today — two lessons per day, every day. Consistency beats intensity.',
  'Do the problem sets. Watching lectures alone is not enough.',
  'Mark lessons complete to build your streak — the dashboard tracks everything.',
  'After Term 4, mix in LeetCode / Project Euler for deliberate practice.',
  'This Library is optional enrichment — pick what matches your goals.',
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

const Library = () => {
  const [reading, setReading] = useState(null);

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
              4 embedded books · 24 course hubs
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
            Books, Right Inside the App
          </h1>
          <p className="text-espresso-600 mt-2.5 max-w-2xl">
            The core textbooks of your curriculum — downloaded into Full Stack Ocean and readable
            in the built-in reader. No downloads to manage, no external sites.
          </p>
        </div>
      </motion.div>

      {/* ---------- Embedded books ---------- */}
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

      {/* ---------- Recommended (not free) ---------- */}
      <motion.div
        className="glass rounded-3xl p-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
      >
        <h2 className="font-display text-xl font-bold text-espresso-800 mb-1 flex items-center gap-2">
          <FiFileText className="w-5 h-5 text-honey-600" />
          Recommended companions
        </h2>
        <p className="text-sm text-espresso-500 mb-4">
          These three are commercial books (not free to redistribute) — worth owning for the deep dives.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
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
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
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
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
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
        Books hosted here are the official free editions from MIT Press, Green Tea Press, MIT PDOS and
        the OSTEP authors. All course materials remain the property of their respective institutions
        and authors.
      </p>

      {/* ---------- Reader overlay ---------- */}
      <AnimatePresence>
        {reading && <Reader book={reading} onClose={() => setReading(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Library;
