import React, { useState, useEffect } from 'react';
import { FiClock, FiCheck, FiPlay, FiFileText, FiSun, FiMap, FiChevronsRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';
import { format, isToday, isTomorrow } from 'date-fns';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

const Today = () => {
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

  const handleToggleComplete = async (lesson) => {
    const lessonId = lesson._id || lesson.id;
    const hours = (lesson.duration || 90) / 60;
    if (lessonStatus[lessonId]) {
      await uncompleteLesson(lessonId, hours);
      setLessonStatus((prev) => ({ ...prev, [lessonId]: false }));
    } else {
      const result = await completeLesson(lessonId, hours);
      if (result) {
        setLessonStatus((prev) => ({ ...prev, [lessonId]: true }));
      }
    }
  };

  const getDayLabel = (date) => {
    const d = new Date(date);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'EEEE, MMMM d, yyyy');
  };

  const doneCount = Object.values(lessonStatus).filter(Boolean).length;
  const totalCount = today?.lessons?.length || 0;
  const progressPct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ---------- Header ---------- */}
      <motion.div
        className="glass-strong rounded-[1.75rem] p-7 sm:p-9 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(223,195,122,.6) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-espresso-400">
              {today?.term ? `TERM ${today.term} · WEEK ${today.week}` : 'DAILY LESSONS'}
            </p>
            {today?.isReviewDay && (
              <span className="status-badge status-review">
                <FiSun className="w-3 h-3" />
                Review Day
              </span>
            )}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800">
            {loading ? 'Loading…' : today ? getDayLabel(today.date) : 'Today'}
          </h2>
          {today?.upcoming && (
            <p className="text-espresso-600 mt-2.5">
              No lessons scheduled for today. Next lessons: {today.dayOfWeek}
            </p>
          )}
          {!loading && totalCount > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold text-espresso-500 mb-2">
                <span>
                  {doneCount} / {totalCount} lessons completed
                </span>
                <span className="text-honey-700">{progressPct}%</span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #e5d6a8, #efe2bd)',
                  boxShadow: 'inset 0 2px 4px rgba(92,65,28,.18)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 60%, #c9932f 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* ---------- Review day ---------- */}
      {today?.isReviewDay && today?.reviewNotes && (
        <motion.div
          className="glass rounded-3xl p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
        >
          <h3 className="font-display font-bold text-espresso-800 mb-2 flex items-center gap-2">
            <FiMap className="w-5 h-5 text-honey-600" />
            Review Focus
          </h3>
          <p className="text-espresso-600">{today.reviewNotes}</p>
        </motion.div>
      )}

      {/* ---------- Lessons ---------- */}
      {loading ? (
        <div className="glass rounded-3xl p-12 flex justify-center">
          <div className="gold-spinner" />
        </div>
      ) : today?.lessons && today.lessons.length > 0 ? (
        <Stagger className="space-y-5" delay={0.09}>
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
                  {/* gold left rail */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-1.5 rounded-full"
                    style={{
                      background: completed
                        ? 'linear-gradient(180deg, #a3c4ae, #7fa98c)'
                        : 'linear-gradient(180deg, #f2d894, #d9a441)',
                    }}
                  />
                  <div className="flex items-start justify-between gap-4 pl-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                        <span className="course-tag">
                          {lesson.metadata?.course || 'Course'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
                          <FiClock className="w-3.5 h-3.5" />
                          {lesson.duration || 90} min
                        </span>
                        {lesson.isReview && (
                          <span className="status-badge status-review">
                            <FiSun className="w-3 h-3" />
                            Review
                          </span>
                        )}
                        {completed && (
                          <span className="status-badge status-completed">
                            <FiCheck className="w-3 h-3" />
                            Done
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-lg font-bold text-espresso-800 mb-1">
                        {lesson.title}
                      </h4>
                      {lesson.description && (
                        <p className="text-sm text-espresso-600 mb-4">{lesson.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3">
                        {lesson.lectureLink && (
                          <a
                            href={lesson.lectureLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-gold !py-2 !px-4 text-xs"
                          >
                            <FiPlay className="w-3.5 h-3.5" />
                            Watch Lecture
                            <FiChevronsRight className="w-3 h-3" />
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
                            Practice Problems
                          </a>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleComplete(lesson)}
                      className={`btn-round w-12 h-12 shrink-0 ${
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
                      <motion.span
                        animate={completed ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="flex"
                      >
                        <FiCheck className="w-5 h-5" />
                      </motion.span>
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      ) : (
        !loading &&
        !today?.upcoming && (
          <div className="glass rounded-3xl p-10 text-center text-espresso-600">
            No lessons available for today. Rest and recharge. 🌊
          </div>
        )
      )}
    </div>
  );
};

export default Today;
