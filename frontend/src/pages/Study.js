import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiClock, FiCheck, FiFileText, FiBookOpen, FiChevronLeft, FiExternalLink,
  FiDownload, FiTarget, FiSun, FiPlay,
} from 'react-icons/fi';
import { useAuth } from 'contexts/AuthContext';
import { format } from 'date-fns';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];

/* Sliding tab pill */
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
              layoutId="study-tab-pill"
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

/* PDF viewer frame — MIT serves PDFs directly, no framing restrictions */
const PdfFrame = ({ url, title }) => (
  <div className="glass-strong rounded-3xl p-2 sm:p-3">
    <div className="flex items-center justify-between px-3 pb-2">
      <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">{title}</span>
      <div className="flex gap-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-1.5 !px-3 text-[11px]">
          <FiExternalLink className="w-3 h-3" />
          Open
        </a>
        <a href={url} download className="btn btn-cream !py-1.5 !px-3 text-[11px]">
          <FiDownload className="w-3 h-3" />
          Save
        </a>
      </div>
    </div>
    <iframe
      src={`${url}#view=FitH`}
      title={title}
      className="w-full rounded-2xl border border-white/60 bg-white"
      style={{ height: '72vh' }}
    />
  </div>
);

const Study = () => {
  const { slug } = useParams();
  const { fetchLesson, checkLessonCompleted, completeLesson, uncompleteLesson } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'notes');

  const changeTab = (id) => {
    setActiveTab(id);
    const next = new URLSearchParams(searchParams);
    if (id && id !== 'notes') next.set('tab', id);
    else next.delete('tab');
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      const res = await fetchLesson(slug);
      if (!alive) return;
      setData(res);
      const isDone = await checkLessonCompleted(slug);
      if (!alive) return;
      setCompleted(isDone);
      setLoading(false);
    };
    load();
    return () => { alive = false; };
  }, [slug, fetchLesson, checkLessonCompleted]);

  const lesson = data?.lesson;
  const mats = lesson?.materials || {};
  const ctx = data?.context;

  const tabs = useMemo(() => {
    const t = [{ id: 'notes', label: 'Study Notes', icon: FiBookOpen }];
    if (mats.slidesUrl) t.push({ id: 'slides', label: 'Slides', icon: FiFileText });
    if (mats.transcriptUrl) t.push({ id: 'transcript', label: 'Transcript', icon: FiFileText });
    if (mats.practicePdfUrl || mats.practiceZipUrl) t.push({ id: 'practice', label: 'Practice', icon: FiPlay });
    return t;
  }, [mats.slidesUrl, mats.transcriptUrl, mats.practicePdfUrl, mats.practiceZipUrl]);

  useEffect(() => {
    if (!tabs.some((t) => t.id === activeTab) && tabs.length) setActiveTab(tabs[0].id);
  }, [tabs, activeTab]);

  const handleToggleComplete = async () => {
    if (!lesson) return;
    const hours = (lesson.duration || 90) / 60;
    if (completed) {
      const ok = await uncompleteLesson(slug, hours);
      if (ok) setCompleted(false);
    } else {
      const ok = await completeLesson(slug, hours);
      if (ok) setCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="glass rounded-3xl p-16 flex justify-center">
        <div className="gold-spinner" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="glass rounded-3xl p-10 text-center max-w-md mx-auto">
        <h2 className="font-display text-2xl font-bold text-espresso-800 mb-3">Lesson not found</h2>
        <p className="text-espresso-600 mb-6">This study page does not exist or the material was moved.</p>
        <Link to="/today" className="btn btn-gold">
          <FiChevronLeft className="w-4 h-4" />
          Back to Today
        </Link>
      </div>
    );
  }

  const courseTag = lesson.metadata?.course || 'Course';
  const durationChip = `${lesson.duration || 90} min`;
  const dateLabel = ctx?.date ? format(new Date(ctx.date), 'EEEE, MMMM d') : '';

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
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <Link to="/today" className="btn btn-cream !py-1.5 !px-3 text-[11px]">
              <FiChevronLeft className="w-3 h-3" />
              Today
            </Link>
            <span className="course-tag">{courseTag}</span>
            {ctx && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
                <FiSun className="w-3 h-3" />
                Week {ctx.week} · {dateLabel}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs font-bold text-espresso-500">
              <FiClock className="w-3 h-3" />
              {durationChip}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-espresso-800 text-balance">
            {lesson.title}
          </h2>
          {lesson.description && (
            <p className="text-espresso-600 mt-2.5 max-w-2xl">{lesson.description}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={handleToggleComplete}
              className={`btn ${completed ? 'btn-cream' : 'btn-gold'} !py-2.5 !px-6 text-sm`}
            >
              <FiCheck className="w-4 h-4" />
              {completed ? 'Completed — undo?' : 'Mark lesson complete'}
            </button>
            {completed && (
              <span className="status-badge status-completed">
                <FiCheck className="w-3 h-3" />
                Done
              </span>
            )}
            {mats.externalUrl && (
              <a
                href={mats.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-cream !py-2.5 !px-4 text-xs"
                title="Open the original MIT OpenCourseWare page"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                MIT OCW
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* ---------- Video ---------- */}
      {mats.videoId && (
        <motion.div
          className="glass-strong rounded-[1.75rem] p-3 sm:p-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/60 bg-espresso-900/90 shadow-[0_18px_44px_rgba(92,65,28,.28)]">
            <div style={{ paddingTop: '56.25%', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${mats.videoId}?rel=0`}
                title={mats.videoTitle || lesson.title}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          {mats.videoTitle && (
            <p className="text-center text-xs font-bold uppercase tracking-wider text-espresso-500 mt-3">
              {mats.videoTitle}
            </p>
          )}
        </motion.div>
      )}

      {/* ---------- Tabs + material ---------- */}
      <div className="space-y-5">
        <TabBar tabs={tabs} active={activeTab} onChange={changeTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {activeTab === 'notes' && (
              <div className="space-y-5">
                {mats.notes?.summary && (
                  <div className="glass rounded-3xl p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold text-espresso-800 mb-3 flex items-center gap-2">
                      <FiBookOpen className="w-5 h-5 text-honey-600" />
                      Overview
                    </h3>
                    <p className="text-espresso-700 leading-relaxed">{mats.notes.summary}</p>
                  </div>
                )}

                {mats.notes?.concepts?.length > 0 && (
                  <div className="glass rounded-3xl p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold text-espresso-800 mb-4 flex items-center gap-2">
                      <FiSun className="w-5 h-5 text-honey-600" />
                      Key Concepts
                    </h3>
                    <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mats.notes.concepts.map((c) => (
                        <StaggerItem key={c}>
                          <div
                            className="rounded-2xl px-4 py-3 text-sm font-semibold text-espresso-700 flex items-center gap-3"
                            style={{
                              background: 'linear-gradient(180deg, #fffbf0, #fdeec4)',
                              border: '1px solid rgba(255,255,255,.75)',
                              boxShadow: 'inset 0 1px 0 #fff, 0 3px 9px rgba(92,65,28,.1)',
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ background: 'linear-gradient(180deg, #d9a441, #c9932f)' }}
                            />
                            {c}
                          </div>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                )}

                {mats.notes?.focus && (
                  <div
                    className="rounded-[1.5rem] p-6 sm:p-7 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, #f7e7bd 0%, #edd9a4 60%, #e4c988 100%)',
                      border: '1px solid rgba(255,255,255,.7)',
                      boxShadow: '0 14px 34px rgba(138,100,34,.22), inset 0 2px 0 rgba(255,255,255,.75), inset 0 -3px 0 rgba(92,65,28,.12)',
                    }}
                  >
                    <h3 className="font-display text-lg font-bold text-espresso-800 mb-2 flex items-center gap-2">
                      <FiTarget className="w-5 h-5" />
                      Focus for this session
                    </h3>
                    <p className="text-espresso-800 leading-relaxed">{mats.notes.focus}</p>
                  </div>
                )}

                <div className="glass rounded-3xl p-5 text-center">
                  <button
                    onClick={handleToggleComplete}
                    className={`btn ${completed ? 'btn-cream' : 'btn-gold'} !py-2.5 !px-6 text-sm`}
                  >
                    <FiCheck className="w-4 h-4" />
                    {completed ? 'Completed — undo?' : `Finish lesson (+${Math.round((lesson.duration || 90) / 60 * 10) / 10}h)`}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'slides' && mats.slidesUrl && (
              <PdfFrame url={mats.slidesUrl} title="Lecture slides" />
            )}

            {activeTab === 'transcript' && mats.transcriptUrl && (
              <PdfFrame url={mats.transcriptUrl} title="Lecture transcript" />
            )}

            {activeTab === 'practice' && (
              <div className="space-y-5">
                {mats.practicePdfUrl && (
                  <PdfFrame url={mats.practicePdfUrl} title={mats.practiceLabel || 'Problem set'} />
                )}
                {mats.practiceZipUrl && (
                  <div className="glass-strong rounded-3xl p-8 text-center">
                    <h3 className="font-display text-xl font-bold text-espresso-800 mb-2">
                      {mats.practiceLabel || 'Problem set'}
                    </h3>
                    <p className="text-espresso-600 text-sm mb-5">
                      This problem set ships as a code bundle — download it and work in your editor.
                    </p>
                    <a href={mats.practiceZipUrl} download className="btn btn-gold !py-2.5 !px-6 text-sm">
                      <FiDownload className="w-4 h-4" />
                      Download problem set
                    </a>
                  </div>
                )}
                {mats.practiceSolUrl && (
                  <div className="glass rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-bold text-espresso-700">Worked solutions available.</span>
                    <a
                      href={mats.practiceSolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-cream !py-2 !px-4 text-xs"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      Open solutions
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Attribution ---------- */}
      <p className="text-center text-[11px] text-espresso-400 leading-relaxed px-6">
        Study material © Massachusetts Institute of Technology, licensed{' '}
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-espresso-600"
        >
          CC BY-NC-SA 4.0
        </a>
        , via{' '}
        <a
          href="https://ocw.mit.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-espresso-600"
        >
          MIT OpenCourseWare
        </a>
        . Notes and curation by Full Stack Ocean.
      </p>
    </div>
  );
};

export default Study;
