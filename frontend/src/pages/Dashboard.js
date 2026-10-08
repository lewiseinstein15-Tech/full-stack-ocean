import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiCheck, FiPlay, FiFileText, FiAward, FiTrendingUp, FiSun, FiZap, FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';
import { format, isToday, isTomorrow } from 'date-fns';
import { Stagger, StaggerItem, CountUp } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

const StatCard = ({ icon: Icon, value, label, tone, delay }) => {
  const tones = {
    honey: { bg: 'linear-gradient(180deg, #fff8e5, #f4e5ae)', color: '#a87f2f' },
    sage: { bg: 'linear-gradient(180deg, #f0f6f1, #cfe3d5)', color: '#476b52' },
    blush: { bg: 'linear-gradient(180deg, #fdf0e2, #fbe3cd)', color: '#8a5a32' },
    vanilla: { bg: 'linear-gradient(180deg, #fffbf0, #fdeec4)', color: '#6b4e17' },
  };
  const t = tones[tone];
  return (
    <motion.div
      className="glass rounded-3xl p-5 flex items-center gap-4"
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
      }}
      whileHover={{ y: -5 }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          background: t.bg,
          border: '1px solid rgba(255,255,255,.75)',
          boxShadow: 'inset 0 1px 0 #fff, 0 4px 10px rgba(92,65,28,.14)',
        }}
      >
        <Icon className="w-6 h-6" style={{ color: t.color }} />
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-espresso-800 leading-none">
          <CountUp value={value} />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-espresso-500 mt-1.5">{label}</div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { user, fetchToday, completeLesson, uncompleteLesson, checkLessonCompleted } = useAuth();
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonStatus, setLessonStatus] = useState({});

  useEffect(() => {
    const loadToday = async () => {
      setLoading(true);
      const data = await fetchToday();
      setToday(data);
      if (data?.lessons) {
        const status = {};
        for (const lesson of data.lessons) {
          status[lesson._id || lesson.id] = await checkLessonCompleted(lesson._id || lesson.id);
        }
        setLessonStatus(status);
      }
      setLoading(false);
    };
    loadToday();
  }, [fetchToday, checkLessonCompleted]);

  const handleCompleteLesson = async (lessonId, hours) => {
    await completeLesson(lessonId, hours);
    setLessonStatus((prev) => ({ ...prev, [lessonId]: true }));
  };

  const handleUncompleteLesson = async (lessonId, hours) => {
    await uncompleteLesson(lessonId, hours);
    setLessonStatus((prev) => ({ ...prev, [lessonId]: false }));
  };

  const getDayLabel = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEEE, MMMM d');
  };

  const firstName = user?.firstName || user?.username || 'friend';

  return (
    <div className="space-y-8">
      {/* ---------- Hero banner ---------- */}
      <motion.div
        className="glass-strong rounded-[1.75rem] p-7 sm:p-9 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(242,201,160,.65) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative flex flex-wrap items-center gap-6 justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-espresso-400 mb-2">
              {user?.progress?.currentWeek
                ? `TERM ${user.progress.currentTerm || 1} · WEEK ${user.progress.currentWeek}`
                : 'YOUR DAILY RITUAL'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
              Welcome back, <em className="text-honey-600 shimmer-text">{firstName}</em>
            </h2>
            <p className="text-espresso-600 mt-2.5 max-w-md">
              {loading
                ? "Preparing today's lessons…"
                : today?.lessons?.length
                ? `${today.lessons.length} lesson${today.lessons.length === 1 ? '' : 's'} waiting for you today.`
                : 'No lessons scheduled — enjoy the calm sea.'}
            </p>
          </div>

          <motion.div
            className="shrink-0"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #f2d894 0%, #d9a441 55%, #c9932f 100%)',
                border: '1px solid rgba(138,100,34,.5)',
                boxShadow:
                  '0 12px 28px rgba(138,100,34,.35), inset 0 2px 0 rgba(255,255,255,.7), inset 0 -3px 0 rgba(92,65,28,.2)',
              }}
            >
              <FiSun className="w-11 h-11 text-espresso-800" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- Stats ---------- */}
      <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={0.08}>
        <StatCard icon={FiZap} value={user?.progress?.streak || 0} label="Day streak" tone="honey" />
        <StatCard
          icon={FiCheck}
          value={user?.progress?.completedLessons?.length || 0}
          label="Lessons done"
          tone="sage"
        />
        <StatCard
          icon={FiClock}
          value={Math.round(user?.progress?.totalHours || 0)}
          label="Hours studied"
          tone="blush"
        />
        <StatCard
          icon={FiAward}
          value={user?.progress?.achievements?.length || 0}
          label="Achievements"
          tone="vanilla"
        />
      </Stagger>

      {/* ---------- Today's schedule ---------- */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl font-bold text-espresso-800">Today's Schedule</h3>
          <Link to="/today" className="btn btn-cream !py-2 !px-4 text-xs">
            <FiCalendar className="w-3.5 h-3.5" />
            Open Today
          </Link>
        </div>

        {loading ? (
          <div className="glass rounded-3xl p-10 flex justify-center">
            <div className="gold-spinner" />
          </div>
        ) : today?.upcoming ? (
          <motion.div className="glass rounded-3xl p-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-espresso-600">
              No lessons scheduled for today. Next up:{' '}
              <strong className="text-honey-700">{getDayLabel(today.date)}</strong>
            </p>
          </motion.div>
        ) : today ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <h4 className="font-display text-lg font-bold text-espresso-800">
                {getDayLabel(today.date)}
              </h4>
              {today.isReviewDay && (
                <span className="status-badge status-review">
                  <FiSun className="w-3 h-3" />
                  Review Day
                </span>
              )}
            </div>

            {today.isReviewDay ? (
              <div className="glass rounded-3xl p-6">
                <h5 className="font-bold text-espresso-800 mb-2 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-honey-600" />
                  Review Notes
                </h5>
                <p className="text-espresso-600">{today.reviewNotes}</p>
              </div>
            ) : (
              <Stagger className="space-y-4" delay={0.1}>
                {today.lessons.map((lesson, idx) => {
                  const lessonId = lesson._id || lesson.id;
                  const completed = lessonStatus[lessonId];
                  return (
                    <StaggerItem key={lessonId || idx}>
                      <motion.div
                        className={`glass rounded-3xl p-5 sm:p-6 relative overflow-hidden ${
                          completed ? 'completed' : ''
                        }`}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                              <span className="course-tag">
                                {lesson.metadata?.course || 'Course'}
                              </span>
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
                                <FiClock className="w-3.5 h-3.5" />
                                {lesson.duration || 90} min
                              </span>
                              {completed && (
                                <span className="status-badge status-completed">
                                  <FiCheck className="w-3 h-3" />
                                  Done
                                </span>
                              )}
                            </div>
                            <h5 className="font-display text-lg font-bold text-espresso-800 mb-1">
                              {lesson.title}
                            </h5>
                            {lesson.description && (
                              <p className="text-sm text-espresso-600 mb-4">
                                {lesson.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3">
                              {lesson.slug ? (
                                <Link
                                  to={`/study/${lesson.slug}`}
                                  className="btn btn-gold !py-2 !px-4 text-xs"
                                >
                                  <FiBookOpen className="w-3.5 h-3.5" />
                                  Start Studying
                                </Link>
                              ) : (
                                <>
                                  {lesson.lectureLink && (
                                    <a
                                      href={lesson.lectureLink.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-gold !py-2 !px-4 text-xs"
                                    >
                                      <FiPlay className="w-3.5 h-3.5" />
                                      Watch Lecture
                                    </a>
                                  )}
                                  {lesson.practiceLink && (
                                    <a
                                      href={lesson.practiceLink.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-cream !py-2 !px-4 text-xs"
                                    >
                                      <FiFileText className="w-3.5 h-3.5" />
                                      Practice
                                    </a>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          {/* Complete toggle */}
                          <button
                            onClick={() =>
                              completed
                                ? handleUncompleteLesson(lessonId, (lesson.duration || 90) / 60)
                                : handleCompleteLesson(lessonId, (lesson.duration || 90) / 60)
                            }
                            className={`btn-round w-11 h-11 shrink-0 ${
                              completed ? '!text-sage-600' : ''
                            }`}
                            style={
                              completed
                                ? {
                                    background: 'linear-gradient(180deg, #e7f0e9, #bfd8c8)',
                                    border: '1px solid rgba(95,138,109,.4)',
                                  }
                                : undefined
                            }
                            title={completed ? 'Mark as incomplete' : 'Mark as complete'}
                            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            <FiCheck className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </div>
        ) : (
          <div className="glass rounded-3xl p-8 text-center text-espresso-600">
            No lessons available for today.
          </div>
        )}
      </section>

      {/* ---------- Quick actions ---------- */}
      <section>
        <h3 className="font-display text-2xl font-bold text-espresso-800 mb-4">Quick Actions</h3>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4" delay={0.09}>
          {[
            {
              to: '/courses',
              icon: FiPlay,
              title: 'Browse Courses',
              sub: 'Explore the full MIT lineup',
            },
            {
              to: '/progress',
              icon: FiTrendingUp,
              title: 'My Progress',
              sub: 'Track your learning journey',
            },
            {
              to: '/practice',
              icon: FiAward,
              title: 'Achievements',
              sub: 'View your earned badges',
            },
          ].map((a) => (
            <StaggerItem key={a.to}>
              <Link to={a.to} className="block">
                <motion.div
                  className="glass rounded-3xl p-6 text-center h-full"
                  whileHover={{ y: -6, rotate: -0.4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(180deg, #fff8e5, #f4e5ae)',
                      border: '1px solid rgba(255,255,255,.75)',
                      boxShadow: 'inset 0 1px 0 #fff, 0 4px 10px rgba(92,65,28,.14)',
                    }}
                  >
                    <a.icon className="w-6 h-6 text-honey-600" />
                  </div>
                  <h5 className="font-display font-bold text-espresso-800">{a.title}</h5>
                  <p className="text-xs text-espresso-500 mt-1">{a.sub}</p>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
};

export default Dashboard;
