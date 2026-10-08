import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSearch, FiClock, FiCheck, FiPlay, FiFileText, FiPackage,
  FiAward, FiChevronRight, FiLayers, FiTarget,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

const COURSE_ORDER = ['6.0001', '18.01SC', '6.042J'];

const normLabel = (l) => (l || '').replace(/\s*\(zip\)\s*$/i, '').trim();

const Practice = () => {
  const { user, fetchLessons, completeLesson, uncompleteLesson } = useAuth();
  const [lessons, setLessons] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [busySlug, setBusySlug] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchLessons().then((data) => {
      if (alive) setLessons(data || []);
    });
    return () => { alive = false; };
  }, [fetchLessons]);

  const completedSet = useMemo(
    () => new Set(user?.progress?.completedLessons || []),
    [user]
  );

  /* One card per unique problem set (course + label), linked to its first lesson */
  const practiceItems = useMemo(() => {
    if (!lessons) return [];
    const seen = new Map();
    for (const l of lessons) {
      if (!l.hasPractice || !l.slug) continue;
      const m = l.materials || {};
      const label = normLabel(m.practiceLabel) || l.title;
      const key = `${l.course}::${label}`;
      if (!seen.has(key)) {
        seen.set(key, {
          key,
          slug: l.slug,
          course: l.course || 'Course',
          label,
          lessonTitle: l.title,
          description: l.description,
          week: l.week,
          day: l.day,
          duration: l.duration || 90,
          isPdf: Boolean(m.practicePdfUrl),
          isZip: Boolean(m.practiceZipUrl),
          hasSolutions: Boolean(m.practiceSolUrl),
        });
      }
    }
    const items = [...seen.values()];
    items.sort((a, b) =>
      (COURSE_ORDER.indexOf(a.course) - COURSE_ORDER.indexOf(b.course)) ||
      (a.week - b.week) ||
      a.label.localeCompare(b.label)
    );
    return items;
  }, [lessons]);

  const courses = useMemo(() => {
    const set = new Set(practiceItems.map((p) => p.course));
    return COURSE_ORDER.filter((c) => set.has(c));
  }, [practiceItems]);

  const completedCount = useMemo(
    () => practiceItems.filter((p) => completedSet.has(p.slug)).length,
    [practiceItems, completedSet]
  );

  const filters = useMemo(() => {
    const f = [{ id: 'all', label: 'All', icon: FiLayers }];
    courses.forEach((c) => f.push({ id: c, label: c, icon: FiTarget }));
    f.push({ id: 'completed', label: 'Completed', icon: FiCheck });
    return f;
  }, [courses]);

  const filtered = practiceItems.filter((p) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.label.toLowerCase().includes(q) ||
      p.lessonTitle.toLowerCase().includes(q) ||
      p.course.toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'completed' && completedSet.has(p.slug)) ||
      activeFilter === p.course;
    return matchesSearch && matchesFilter;
  });

  const handleToggleComplete = async (p) => {
    if (busySlug) return;
    setBusySlug(p.slug);
    const hours = (p.duration || 90) / 60;
    if (completedSet.has(p.slug)) {
      await uncompleteLesson(p.slug, hours);
    } else {
      await completeLesson(p.slug, hours);
    }
    setBusySlug(null);
  };

  if (lessons === null) {
    return (
      <div className="glass rounded-3xl p-16 flex justify-center">
        <div className="gold-spinner" />
      </div>
    );
  }

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
            <span className="course-tag">Practice</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
              <FiLayers className="w-3 h-3" />
              {practiceItems.length} problem sets
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
              <FiAward className="w-3 h-3" />
              {completedCount} completed
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
            Problem Sets, Right Here
          </h1>
          <p className="text-espresso-600 mt-2.5 max-w-2xl">
            Every assignment from your MIT courses opens inside the app — PDFs render in the
            built-in reader and code bundles download straight to your machine. No external
            link-chasing.
          </p>
        </div>
      </motion.div>

      {/* ---------- Search & filter ---------- */}
      <motion.div
        className="glass rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
          <input
            type="text"
            placeholder="Search by topic, set, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skeu-input w-full pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isActive ? 'text-espresso-800' : 'text-espresso-500 hover:text-espresso-700'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 100%)',
                        boxShadow: '0 3px 10px rgba(138,100,34,.3), inset 0 1px 0 rgba(255,255,255,.6)',
                      }
                    : { background: 'rgba(255,255,255,.45)' }
                }
              >
                <f.icon className="w-3.5 h-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ---------- Results ---------- */}
      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-display text-xl font-bold text-espresso-800 mb-2">No problem sets found</h3>
          <p className="text-espresso-600 text-sm">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="text-xs font-bold uppercase tracking-wider text-espresso-400 px-2">
          Showing {filtered.length} {filtered.length === 1 ? 'set' : 'sets'}
        </div>
      )}

      <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((p) => {
          const isCompleted = completedSet.has(p.slug);
          return (
            <StaggerItem key={p.key}>
              <div
                className="glass rounded-3xl p-5 sm:p-6 h-full flex flex-col relative overflow-hidden"
                style={{
                  boxShadow: isCompleted
                    ? 'inset 0 0 0 1px rgba(217,164,65,.45), 0 8px 24px rgba(92,65,28,.12)'
                    : undefined,
                }}
              >
                <span
                  className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
                  style={{
                    background: isCompleted
                      ? 'linear-gradient(180deg, #8ec98e, #5da45d)'
                      : 'linear-gradient(180deg, #f2d894, #d9a441)',
                  }}
                />
                <div className="flex items-start justify-between gap-3 pl-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="course-tag">{p.course}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-espresso-500">
                        <FiClock className="w-3 h-3" />
                        Week {p.week} · ≈{p.duration} min
                      </span>
                    </div>
                    <h3 className={`font-display text-lg font-bold text-espresso-800 ${isCompleted ? 'line-through opacity-70' : ''}`}>
                      {p.label}
                    </h3>
                    <p className="text-sm text-espresso-500 mt-0.5">
                      From lesson: {p.lessonTitle}
                    </p>
                    {p.description && (
                      <p className="text-sm text-espresso-600 mt-2 line-clamp-2">{p.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.isPdf && (
                        <span className="status-badge">
                          <FiFileText className="w-3 h-3" /> In-app PDF reader
                        </span>
                      )}
                      {p.isZip && (
                        <span className="status-badge">
                          <FiPackage className="w-3 h-3" /> Code bundle
                        </span>
                      )}
                      {p.hasSolutions && (
                        <span className="status-badge status-completed">
                          <FiCheck className="w-3 h-3" /> Solutions included
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleComplete(p)}
                    disabled={busySlug === p.slug}
                    title={isCompleted ? 'Mark as not done' : 'Mark as done'}
                    className="shrink-0 p-2.5 rounded-2xl transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
                    style={
                      isCompleted
                        ? {
                            background: 'linear-gradient(180deg, #b7e3b7, #8ec98e)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7), 0 3px 9px rgba(93,164,93,.35)',
                          }
                        : {
                            background: 'rgba(255,255,255,.55)',
                            boxShadow: 'inset 0 1px 0 #fff, 0 2px 6px rgba(92,65,28,.12)',
                          }
                    }
                  >
                    <FiCheck className={`w-5 h-5 ${isCompleted ? 'text-espresso-900' : 'text-espresso-400'}`} />
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/50 flex items-center justify-between gap-3 pl-2">
                  <span className="text-xs font-bold text-espresso-500">
                    {isCompleted ? 'Completed — nice work' : 'Ready when you are'}
                  </span>
                  <Link
                    to={`/study/${p.slug}?tab=practice`}
                    className="btn btn-gold !py-2 !px-4 text-xs"
                  >
                    <FiPlay className="w-3.5 h-3.5" />
                    Practice in-app
                    <FiChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <p className="text-center text-[11px] text-espresso-400 leading-relaxed px-6">
        Problem sets © Massachusetts Institute of Technology, licensed{' '}
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-espresso-600"
        >
          CC BY-NC-SA 4.0
        </a>
        , via MIT OpenCourseWare. Curation by Full Stack Ocean.
      </p>
    </div>
  );
};

export default Practice;
