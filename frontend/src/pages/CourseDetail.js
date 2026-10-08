import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft, FiClock, FiAward, FiBookOpen, FiCheck, FiPlay,
  FiChevronRight, FiFileText, FiPackage, FiLayers, FiCalendar, FiTarget, FiExternalLink,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

const normLabel = (l) => (l || '').replace(/\s*\(zip\)\s*$/i, '').trim();

/* Sliding tab pill (same family as Study page) */
const TabBar = ({ tabs, active, onChange }) => (
  <div className="glass rounded-2xl p-1.5 flex flex-wrap gap-1 sticky top-20 z-10">
    {tabs.map((t) => {
      const isActive = t.id === active;
      return (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            isActive ? 'text-espresso-800' : 'text-espresso-500 hover:text-espresso-700'
          }`}
        >
          {isActive && (
            <motion.span
              layoutId="course-tab-pill"
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 100%)',
                boxShadow: '0 3px 10px rgba(138,100,34,.3), inset 0 1px 0 rgba(255,255,255,.6)',
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <t.icon className="w-4 h-4 relative z-10" />
          <span className="relative z-10">{t.label}</span>
        </button>
      );
    })}
  </div>
);

const CourseDetail = () => {
  const { courseCode } = useParams();
  const { user, fetchCourse, fetchLessons } = useAuth();
  const [course, setCourse] = useState(undefined); // undefined = loading, null = not found
  const [lessons, setLessons] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const [doc, allLessons] = await Promise.all([fetchCourse(courseCode), fetchLessons()]);
      if (!alive) return;
      setCourse(doc || null);
      setLessons(allLessons || []);
    };
    load();
    return () => { alive = false; };
  }, [courseCode, fetchCourse, fetchLessons]);

  const code = course?.courseCode || courseCode || '';
  const courseLessons = useMemo(() => {
    if (!lessons || !code) return [];
    const norm = (s) => (s || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    return lessons
      .filter((l) => norm(l.course) === norm(code) || norm(l.course).startsWith(norm(code)))
      .sort((a, b) => (a.week - b.week) || ((a.order || 0) - (b.order || 0)));
  }, [lessons, code]);

  const completedSet = useMemo(
    () => new Set(user?.progress?.completedLessons || []),
    [user]
  );

  const practiceItems = useMemo(() => {
    const seen = new Map();
    for (const l of courseLessons) {
      if (!l.hasPractice || !l.slug) continue;
      const m = l.materials || {};
      const label = normLabel(m.practiceLabel) || l.title;
      const key = label;
      if (!seen.has(key)) {
        seen.set(key, {
          key,
          slug: l.slug,
          label,
          week: l.week,
          isPdf: Boolean(m.practicePdfUrl),
          isZip: Boolean(m.practiceZipUrl),
          hasSolutions: Boolean(m.practiceSolUrl),
        });
      }
    }
    return [...seen.values()];
  }, [courseLessons]);

  const stats = useMemo(() => {
    const total = courseLessons.length;
    const done = courseLessons.filter((l) => l.slug && completedSet.has(l.slug)).length;
    const hours = Math.round(courseLessons.reduce((s, l) => s + (l.duration || 90) / 60, 0) * 10) / 10;
    const weeks = new Set(courseLessons.map((l) => l.week)).size;
    return { total, done, hours, weeks, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [courseLessons, completedSet]);

  if (course === undefined || lessons === null) {
    return (
      <div className="glass rounded-3xl p-16 flex justify-center">
        <div className="gold-spinner" />
      </div>
    );
  }

  if (course === null) {
    return (
      <div className="glass rounded-3xl p-10 text-center max-w-md mx-auto">
        <h2 className="font-display text-2xl font-bold text-espresso-800 mb-3">Course not found</h2>
        <p className="text-espresso-600 mb-6">
          The course “{courseCode}” is not part of your curriculum yet.
        </p>
        <Link to="/courses" className="btn btn-gold">
          <FiArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBookOpen },
    { id: 'lectures', label: `Lectures (${courseLessons.length})`, icon: FiPlay },
    { id: 'practice', label: `Practice (${practiceItems.length})`, icon: FiTarget },
  ];

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
          <Link to="/courses" className="btn btn-cream !py-1.5 !px-3 text-[11px] mb-4">
            <FiArrowLeft className="w-3 h-3" />
            All courses
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span
              className="font-display text-4xl font-bold"
              style={{
                background: 'linear-gradient(145deg, #d9a441 0%, #a4762a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {course.courseCode}
            </span>
            <span className="status-badge status-completed">
              <FiPlay className="w-3 h-3" /> Active · {course.term}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-espresso-800 text-balance">
            {course.title}
          </h1>
          {course.description && (
            <p className="text-espresso-600 mt-2.5 max-w-2xl">{course.description}</p>
          )}

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Lessons', value: stats.total, icon: FiLayers },
              { label: 'Material', value: `${stats.hours}h`, icon: FiClock },
              { label: 'Weeks', value: stats.weeks, icon: FiCalendar },
              { label: 'Instructor', value: course.instructor || 'MIT Faculty', icon: FiAward },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: 'rgba(255,255,255,.5)',
                  boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.08)',
                }}
              >
                <s.icon className="w-5 h-5 text-honey-600 shrink-0" />
                <div className="min-w-0">
                  <div className="font-display font-bold text-espresso-800 truncate">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-espresso-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-[11px] font-bold text-espresso-500 mb-1.5">
              <span className="inline-flex items-center gap-1">
                <FiCheck className="w-3 h-3" /> {stats.done}/{stats.total} lessons completed
              </span>
              <span>{stats.pct}%</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(92,65,28,.15)', boxShadow: 'inset 0 1px 3px rgba(92,65,28,.25)' }}>
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stats.pct}%` }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{
                  background: 'linear-gradient(90deg, #f2d894, #d9a441)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5)',
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Tabs ---------- */}
      <div className="space-y-5">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* ---------- Overview ---------- */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="glass rounded-3xl p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-espresso-800 mb-3 flex items-center gap-2">
                    <FiBookOpen className="w-5 h-5 text-honey-600" />
                    About this course
                  </h3>
                  <p className="text-espresso-700 leading-relaxed">
                    {course.description || course.title} — taught by{' '}
                    {course.instructor || 'course staff'} through the official course hub. Term 1
                    courses have every lecture, slide deck, transcript and problem set embedded
                    right here (in-app player and PDF reader); later terms link to their official
                    hubs until their material is embedded. Your completion progress feeds your
                    daily streak either way.
                  </p>
                </div>

                {(course.resources?.lectures?.length > 0 || course.resources?.assignments?.length > 0 || course.resources?.exams?.length > 0) && (
                  <div className="glass rounded-3xl p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold text-espresso-800 mb-4 flex items-center gap-2">
                      <FiLayers className="w-5 h-5 text-honey-600" />
                      Official course hub
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {course.resources.lectures?.map((r, i) => (
                        <a key={`lec${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2 !px-4 text-xs">
                          <FiExternalLink className="w-3.5 h-3.5" /> {r.title || 'Video hub'}
                        </a>
                      ))}
                      {course.resources.assignments?.map((r, i) => (
                        <a key={`asg${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-2 !px-4 text-xs">
                          <FiTarget className="w-3.5 h-3.5" /> {r.title || 'Practice archive'}
                        </a>
                      ))}
                      {course.resources.exams?.map((r, i) => (
                        <a key={`exm${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-2 !px-4 text-xs">
                          <FiBookOpen className="w-3.5 h-3.5" /> {r.title || 'Textbook / notes'}
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-espresso-500 mt-3">
                      This course's lectures and exercises live on the official hub — open these
                      whenever a unit points to the source material.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass rounded-3xl p-6 text-center">
                    <FiPlay className="w-6 h-6 mx-auto text-honey-600 mb-2" />
                    <div className="font-display text-2xl font-bold text-espresso-800">{courseLessons.filter((l) => l.hasVideo).length}</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-espresso-500 mt-1">Video lectures</div>
                  </div>
                  <div className="glass rounded-3xl p-6 text-center">
                    <FiFileText className="w-6 h-6 mx-auto text-honey-600 mb-2" />
                    <div className="font-display text-2xl font-bold text-espresso-800">{courseLessons.filter((l) => (l.materials || {}).slidesUrl).length}</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-espresso-500 mt-1">Slide decks</div>
                  </div>
                  <div className="glass rounded-3xl p-6 text-center">
                    <FiTarget className="w-6 h-6 mx-auto text-honey-600 mb-2" />
                    <div className="font-display text-2xl font-bold text-espresso-800">{practiceItems.length}</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-espresso-500 mt-1">Problem sets</div>
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-espresso-800">Ready to study?</h4>
                    <p className="text-sm text-espresso-600 mt-1">
                      Jump back into today's scheduled lessons and keep your streak alive.
                    </p>
                  </div>
                  <Link to="/today" className="btn btn-gold !py-2.5 !px-6 text-sm">
                    <FiCalendar className="w-4 h-4" />
                    Go to Today
                  </Link>
                </div>
              </div>
            )}

            {/* ---------- Lectures ---------- */}
            {activeTab === 'lectures' && (
              <Stagger className="space-y-3">
                {courseLessons.map((l) => {
                  const isDone = l.slug && completedSet.has(l.slug);
                  return (
                    <StaggerItem key={l.slug || l.title}>
                      <div
                        className="glass rounded-3xl p-4 sm:p-5 flex items-center gap-4 flex-wrap sm:flex-nowrap"
                        style={isDone ? { boxShadow: 'inset 0 0 0 1px rgba(217,164,65,.45), 0 8px 24px rgba(92,65,28,.12)' } : undefined}
                      >
                        <span
                          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-espresso-900"
                          style={{
                            background: isDone
                              ? 'linear-gradient(180deg, #b7e3b7, #8ec98e)'
                              : 'linear-gradient(180deg, #f2d894, #d9a441)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)',
                          }}
                        >
                          {isDone ? <FiCheck className="w-5 h-5" /> : (l.lectureNumber || l.order || '•')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold text-espresso-500">
                              Week {l.week} · {l.day}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-espresso-500">
                              <FiClock className="w-3 h-3" />
                              {l.duration} min
                            </span>
                            {l.hasVideo && (
                              <span className="status-badge">
                                <FiPlay className="w-3 h-3" /> Video
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-espresso-800 truncate mt-0.5">{l.title}</h4>
                          {l.description && (
                            <p className="text-sm text-espresso-500 line-clamp-1">{l.description}</p>
                          )}
                        </div>
                        <Link to={`/study/${l.slug}`} className="btn btn-gold !py-2 !px-4 text-xs shrink-0">
                          <FiPlay className="w-3.5 h-3.5" />
                          Study
                          <FiChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </StaggerItem>
                  );
                })}
                {courseLessons.length === 0 && (
                  <div className="glass rounded-3xl p-10 text-center text-espresso-600">
                    No lessons scheduled for this course yet.
                  </div>
                )}
              </Stagger>
            )}

            {/* ---------- Practice ---------- */}
            {activeTab === 'practice' && (
              <Stagger className="space-y-3">
                {practiceItems.map((p) => {
                  const isDone = completedSet.has(p.slug);
                  return (
                    <StaggerItem key={p.key}>
                      <div className="glass rounded-3xl p-4 sm:p-5 flex items-center gap-4 flex-wrap sm:flex-nowrap">
                        <span
                          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            background: isDone
                              ? 'linear-gradient(180deg, #b7e3b7, #8ec98e)'
                              : 'linear-gradient(180deg, #fdeec4, #f2d894)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7)',
                          }}
                        >
                          {isDone ? <FiCheck className="w-5 h-5 text-espresso-900" /> : <FiTarget className="w-5 h-5 text-espresso-700" />}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-bold text-espresso-500">Week {p.week}</span>
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
                                <FiCheck className="w-3 h-3" /> Solutions
                              </span>
                            )}
                          </div>
                          <h4 className={`font-bold text-espresso-800 mt-0.5 ${isDone ? 'line-through opacity-70' : ''}`}>
                            {p.label}
                          </h4>
                        </div>
                        <Link to={`/study/${p.slug}?tab=practice`} className="btn btn-gold !py-2 !px-4 text-xs shrink-0">
                          <FiTarget className="w-3.5 h-3.5" />
                          Practice
                          <FiChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </StaggerItem>
                  );
                })}
                {practiceItems.length === 0 && (
                  <div className="glass rounded-3xl p-10 text-center text-espresso-600">
                    No problem sets attached to this course yet.
                  </div>
                )}
              </Stagger>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

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

export default CourseDetail;
