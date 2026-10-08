import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiSearch, FiClock, FiUsers, FiAward, FiBookOpen, FiCheck,
  FiChevronRight, FiPlay, FiLayers, FiCalendar,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

const COURSE_ORDER = ['6.0001', '18.01SC', '6.042J'];

const Courses = () => {
  const { user, fetchCurriculum, fetchLessons, fetchCourse } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState(null);
  const [lessonStats, setLessonStats] = useState({});
  const [slugToCourse, setSlugToCourse] = useState({});

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const [curData, lessons] = await Promise.all([fetchCurriculum(), fetchLessons()]);

      if (!alive) return;

      // Real courses from the active curriculum (terms.courses is populated)
      const seen = new Map();
      for (const cur of curData?.curricula || []) {
        for (const term of cur.terms || []) {
          for (const c of term.courses || []) {
            if (c && c.courseCode && !seen.has(c.courseCode)) {
              seen.set(c.courseCode, {
                code: c.courseCode,
                title: c.title,
                description: c.description,
                term: `Term ${term.termNumber}`,
              });
            }
          }
        }
      }

      // Lesson aggregates per course + exact slug→course map (case-insensitive keys)
      const stats = {};
      const s2c = {};
      for (const l of lessons || []) {
        const code = (l.course || '').toLowerCase();
        if (!code) continue;
        if (l.slug) s2c[l.slug] = code;
        if (!stats[code]) stats[code] = { total: 0, hours: 0, weeks: new Set(), practice: 0 };
        stats[code].total += 1;
        stats[code].hours += (l.duration || 90) / 60;
        stats[code].weeks.add(l.week);
        if (l.hasPractice) stats[code].practice += 1;
      }
      Object.values(stats).forEach((s) => {
        s.hours = Math.round(s.hours * 10) / 10;
        s.weeks = s.weeks.size;
      });

      setSlugToCourse(s2c);
      setLessonStats(stats);
      setCourses([...seen.values()]);
    };

    load();
    return () => { alive = false; };
  }, [fetchCurriculum, fetchLessons]);

  // Course extras (instructor, weekly hours) straight from the Course docs
  useEffect(() => {
    let alive = true;
    if (!courses) return;
    Promise.all(
      courses.map((c) => fetchCourse(c.code).then((doc) => ({ code: c.code, doc })))
    ).then((results) => {
      if (!alive) return;
      setCourses((prev) =>
        (prev || []).map((c) => {
          const hit = results.find((r) => r.code === c.code);
          return hit?.doc ? { ...c, instructor: hit.doc.instructor, weeklyHours: hit.doc.weeklyHours } : c;
        })
      );
    });
    return () => { alive = false; };
  }, [courses === null, fetchCourse]); // eslint-disable-line react-hooks/exhaustive-deps

  const completedSet = useMemo(
    () => new Set(user?.progress?.completedLessons || []),
    [user]
  );

  const completedByCourse = useMemo(() => {
    const byCourse = {};
    for (const slug of completedSet) {
      const code = slugToCourse[slug];
      if (code) byCourse[code] = (byCourse[code] || 0) + 1;
    }
    return byCourse;
  }, [completedSet, slugToCourse]);

  const filtered = (courses || []).filter((c) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !q || c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'started' && (completedByCourse[(c.code || '').toLowerCase()] || 0) > 0) ||
      (filter === 'fresh' && !(completedByCourse[(c.code || '').toLowerCase()] || 0));
    return matchesSearch && matchesFilter;
  });

  if (courses === null) {
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
            <span className="course-tag">Catalog</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
              <FiCalendar className="w-3 h-3" />
              Term 1 · 7 weeks · Oct 2026 →
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
            Your MIT Course Lineup
          </h1>
          <p className="text-espresso-600 mt-2.5 max-w-2xl">
            Three MIT OpenCourseWare courses, scheduled week by week with videos, slides,
            transcripts and problem sets embedded right in the app.
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
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skeu-input w-full pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'started', label: 'In Progress' },
            { id: 'fresh', label: 'Not Started' },
          ].map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
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
                {f.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ---------- Course grid ---------- */}
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => {
          const stats = lessonStats[(c.code || '').toLowerCase()] || { total: 0, hours: 0, weeks: 0, practice: 0 };
          const done = Math.min(completedByCourse[(c.code || '').toLowerCase()] || 0, stats.total);
          const pct = stats.total ? Math.round((done / stats.total) * 100) : 0;
          return (
            <StaggerItem key={c.code}>
              <Link to={`/courses/${c.code}`} className="group block h-full">
                <div className="glass-strong rounded-[1.5rem] p-6 h-full flex flex-col relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5">
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-60"
                    style={{
                      background: 'radial-gradient(circle, rgba(242,201,160,.55) 0%, transparent 65%)',
                      filter: 'blur(24px)',
                    }}
                  />
                  <div className="relative flex items-start justify-between mb-3">
                    <span
                      className="font-display text-3xl font-bold"
                      style={{
                        background: 'linear-gradient(145deg, #d9a441 0%, #a4762a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {c.code}
                    </span>
                    <span className="status-badge status-completed">
                      <FiPlay className="w-3 h-3" /> Active
                    </span>
                  </div>

                  <h3 className="relative font-display text-lg font-bold text-espresso-800 leading-snug group-hover:text-honey-700 transition-colors">
                    {c.title}
                  </h3>
                  {c.description && (
                    <p className="relative text-sm text-espresso-600 mt-2 line-clamp-3">{c.description}</p>
                  )}

                  <div className="relative grid grid-cols-3 gap-2 mt-5">
                    <div className="rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,.5)' }}>
                      <div className="font-display font-bold text-espresso-800">{stats.total}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-espresso-500">Lessons</div>
                    </div>
                    <div className="rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,.5)' }}>
                      <div className="font-display font-bold text-espresso-800">{stats.hours}h</div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-espresso-500">Material</div>
                    </div>
                    <div className="rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,255,255,.5)' }}>
                      <div className="font-display font-bold text-espresso-800">{stats.practice}</div>
                      <div className="text-[10px] font-bold uppercase tracking-wide text-espresso-500">Psets</div>
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-espresso-500 mb-1.5">
                      <span className="inline-flex items-center gap-1">
                        <FiCheck className="w-3 h-3" /> {done}/{stats.total} lessons done
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(92,65,28,.15)', boxShadow: 'inset 0 1px 3px rgba(92,65,28,.25)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: 'linear-gradient(90deg, #f2d894, #d9a441)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="relative mt-4 pt-4 border-t border-white/50 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-espresso-500">
                      <FiAward className="w-3.5 h-3.5" />
                      {c.instructor || 'MIT Faculty'}
                    </span>
                    <span className="btn btn-gold !py-1.5 !px-3.5 text-[11px]">
                      Open
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      {filtered.length === 0 && (
        <div className="glass rounded-3xl p-12 text-center">
          <p className="text-espresso-600">No courses match your search.</p>
        </div>
      )}

      {/* ---------- Roadmap note ---------- */}
      <motion.div
        className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(180deg, #f2d894, #d9a441)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 4px 12px rgba(138,100,34,.3)',
          }}
        >
          <FiLayers className="w-6 h-6 text-espresso-900" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-espresso-800">The ocean gets deeper</h3>
          <p className="text-sm text-espresso-600 mt-1">
            More MIT courses unlock as you advance through terms. Your current focus is Term 1 —
            keep the daily streak alive on the <Link to="/today" className="underline font-bold text-honey-700">Today page</Link>.
          </p>
        </div>
        <FiClock className="w-5 h-5 text-espresso-400 shrink-0 hidden sm:block" />
      </motion.div>

      <p className="text-center text-[11px] text-espresso-400 leading-relaxed px-6">
        Course materials © Massachusetts Institute of Technology, licensed{' '}
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-espresso-600"
        >
          CC BY-NC-SA 4.0
        </a>
        , via MIT OpenCourseWare.
      </p>
    </div>
  );
};

export default Courses;
