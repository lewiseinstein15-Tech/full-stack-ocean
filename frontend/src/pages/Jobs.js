import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  FiBriefcase, FiSearch, FiMapPin, FiExternalLink, FiClock, FiDollarSign,
  FiRefreshCw, FiGlobe, FiZap, FiFilter, FiAlertTriangle,
} from 'react-icons/fi';
import { Stagger, StaggerItem } from 'components/motion/motion';

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 24;

const timeAgo = (iso) => {
  try {
    return formatDistanceToNow(parseISO(iso), { addSuffix: true });
  } catch {
    return '';
  }
};

const typeLabel = (t) =>
  (t || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* Company logo with gold monogram fallback */
const Logo = ({ job }) => {
  const [failed, setFailed] = useState(false);
  const initials = (job.company || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  if (!job.logo || failed) {
    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-espresso-800 text-lg"
        style={{
          background: 'linear-gradient(180deg, #f2d894, #d9a441)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 3px 9px rgba(138,100,34,.3)',
        }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={job.logo}
      alt={job.company}
      onError={() => setFailed(true)}
      className="w-12 h-12 rounded-xl object-contain shrink-0 bg-white/60 p-1"
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
};

const GoldChip = ({ icon: Icon, children, title }) => (
  <span
    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold text-espresso-700 whitespace-nowrap"
    style={{ background: 'rgba(242,216,148,.45)', border: '1px solid rgba(217,164,65,.35)' }}
    title={title}
  >
    {Icon && <Icon className="w-3 h-3" />}
    {children}
  </span>
);

const SOURCE_LABEL = { remotive: 'Remotive', himalayas: 'Himalayas' };

const isEntryJob = (j) =>
  /entry|intern|junior|trainee|graduate|associate/i.test(j.seniority || '') ||
  /entry|intern|junior|trainee|graduate|associate/i.test(j.title || '');

const isAnywhereJob = (j) =>
  !j.location || /worldwide|anywhere|global|earth/i.test(j.location);

const Jobs = () => {
  const [data, setData] = useState(null); // { jobs, total, entryCount, anywhereCount, categories, sources }
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('all');
  const [entryOnly, setEntryOnly] = useState(false);
  const [anywhereOnly, setAnywhereOnly] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    setSlow(false);
    const slowTimer = setTimeout(() => setSlow(true), 9000);
    try {
      const { data: d } = await axios.get('/jobs', { timeout: 75000 });
      if (!d.success) throw new Error('API error');
      setData(d);
    } catch (e) {
      setError(
        e?.response?.status
          ? `Server responded with ${e.response.status}. The free job boards may be busy — try again.`
          : 'Could not reach the server. If this is the first visit today, the free-tier backend takes up to a minute to wake up.'
      );
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const jobs = data?.jobs || [];

  const filtered = useMemo(() => {
    const ql = q.toLowerCase().trim();
    const cat = category.toLowerCase();
    return jobs.filter((j) => {
      if (source !== 'all' && j.source !== source) return false;
      if (category && String(j.category).toLowerCase() !== cat) return false;
      if (entryOnly && !isEntryJob(j)) return false;
      if (anywhereOnly && !isAnywhereJob(j)) return false;
      if (ql) {
        const hay = `${j.title} ${j.company} ${(j.tags || []).join(' ')} ${j.category} ${j.location}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [jobs, q, category, source, entryOnly, anywhereOnly]);

  const shown = filtered.slice(0, visible);
  const activeFilters = q || category || source !== 'all' || entryOnly || anywhereOnly;

  const clearFilters = () => {
    setQ('');
    setCategory('');
    setSource('all');
    setEntryOnly(false);
    setAnywhereOnly(false);
  };

  const toggleChip = (active, onClick, icon, label, activeIcon) => (
    <button
      key={label}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
        active ? 'text-espresso-800' : 'text-espresso-500 hover:text-espresso-700'
      }`}
      style={
        active
          ? {
              background: 'linear-gradient(180deg, #f2d894 0%, #d9a441 100%)',
              boxShadow: '0 3px 10px rgba(138,100,34,.3), inset 0 1px 0 rgba(255,255,255,.6)',
            }
          : { background: 'rgba(255,255,255,.45)' }
      }
    >
      {active ? activeIcon || icon : icon}
      {label}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ---------- Header ---------- */}
      <motion.div
        className="glass-strong rounded-[1.75rem] p-7 sm:p-9 relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <span
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(180deg, #f2d894, #d9a441)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.6), 0 6px 16px rgba(138,100,34,.35)',
            }}
          >
            <FiBriefcase className="w-7 h-7 text-espresso-900" />
          </span>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-espresso-800">
              Jobs &amp; Internships
            </h1>
            <p className="text-sm text-espresso-600 mt-1">
              Live remote roles for developers, pulled from Remotive &amp; Himalayas — refreshed
              every 30 minutes on the server.
            </p>
          </div>
        </div>

        {data && (
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: 'Live roles', value: data.total },
              { label: 'Entry-level', value: data.entryCount },
              { label: 'Hire from anywhere', value: data.anywhereCount },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-4 py-3 flex flex-col items-center sm:flex-row sm:justify-between gap-1"
                style={{ background: 'rgba(255,255,255,.5)' }}
              >
                <span className="font-display font-bold text-xl text-espresso-800">{s.value}</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-espresso-500 uppercase tracking-wide text-center sm:text-right">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {data && Object.values(data.sources || {}).some((v) => v !== 'ok') && (
          <div className="mt-4 flex items-center gap-2 text-[11px] text-espresso-600">
            <FiAlertTriangle className="w-3.5 h-3.5 shrink-0" />
            One job board is briefly unreachable — showing results from the other.
          </div>
        )}
      </motion.div>

      {/* ---------- Filters ---------- */}
      <motion.div
        className="glass-strong rounded-[1.5rem] p-5 sm:p-6 space-y-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search title, company, or skill (e.g. react, intern, data)..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              className="skeu-input w-full pl-11"
            />
          </div>
          <button onClick={load} className="btn btn-cream !py-2.5 shrink-0" disabled={loading}>
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <FiFilter className="w-3.5 h-3.5 text-espresso-400 mr-1" />
          {toggleChip(
            entryOnly,
            () => {
              setEntryOnly(!entryOnly);
              setVisible(PAGE_SIZE);
            },
            FiZap,
            'Entry-level & internships',
            FiZap
          )}
          {toggleChip(
            anywhereOnly,
            () => {
              setAnywhereOnly(!anywhereOnly);
              setVisible(PAGE_SIZE);
            },
            FiGlobe,
            'Hire from anywhere',
            FiGlobe
          )}
          <span className="w-px h-5 bg-espresso-900/10 mx-1.5" />
          {toggleChip(source === 'all', () => {
            setSource('all');
            setVisible(PAGE_SIZE);
          }, null, 'All boards')}
          {Object.keys(SOURCE_LABEL).map((s) =>
            toggleChip(source === s, () => {
              setSource(source === s ? 'all' : s);
              setVisible(PAGE_SIZE);
            }, null, SOURCE_LABEL[s])
          )}
        </div>

        {data?.categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {toggleChip(!category, () => {
              setCategory('');
              setVisible(PAGE_SIZE);
            }, null, 'All fields')}
            {data.categories.map((c) =>
              toggleChip(
                category === c.name,
                () => {
                  setCategory(category === c.name ? '' : c.name);
                  setVisible(PAGE_SIZE);
                },
                null,
                `${c.name} · ${c.count}`
              )
            )}
          </div>
        )}
      </motion.div>

      {/* ---------- Results ---------- */}
      {loading ? (
        <div className="space-y-3">
          {slow && (
            <p className="text-xs text-espresso-500 text-center">
              First load of the day can take up to a minute — the free-tier server is waking up…
            </p>
          )}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-strong rounded-2xl p-5 h-28 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="glass-strong rounded-2xl p-8 text-center space-y-4">
          <FiAlertTriangle className="w-8 h-8 text-espresso-500 mx-auto" />
          <p className="text-sm text-espresso-600 max-w-md mx-auto">{error}</p>
          <button onClick={load} className="btn btn-gold">
            <FiRefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      ) : shown.length === 0 ? (
        <div className="glass-strong rounded-2xl p-10 text-center space-y-3">
          <FiBriefcase className="w-8 h-8 text-espresso-400 mx-auto" />
          <p className="font-display font-bold text-espresso-700">No roles match your filters</p>
          <p className="text-xs text-espresso-500">
            Try a broader search, or clear the filters to see everything.
          </p>
          {activeFilters && (
            <button onClick={clearFilters} className="btn btn-cream !py-2">
              <FiFilter className="w-3.5 h-3.5" />
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-xs font-bold text-espresso-500 px-1">
            {filtered.length} {filtered.length === 1 ? 'role' : 'roles'}
            {filtered.length !== jobs.length && ` of ${jobs.length}`} · sorted by newest
          </p>
          <Stagger>
            <div className="grid gap-4 sm:grid-cols-2">
              {shown.map((job) => (
                <StaggerItem key={job.id}>
                  <div className="glass-strong rounded-2xl p-5 flex flex-col gap-3 h-full group hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-start gap-3">
                      <Logo job={job} />
                      <div className="min-w-0 flex-1">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display font-bold text-espresso-800 leading-snug hover:underline line-clamp-2"
                          title={job.title}
                        >
                          {job.title}
                        </a>
                        <div className="flex items-center gap-2 text-xs text-espresso-500 mt-0.5 flex-wrap">
                          <span className="truncate font-semibold">{job.company}</span>
                          {job.posted && (
                            <>
                              <span className="text-espresso-300">•</span>
                              <span className="inline-flex items-center gap-1 whitespace-nowrap">
                                <FiClock className="w-3 h-3" />
                                {timeAgo(job.posted)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider text-espresso-500 px-2 py-0.5 rounded-md shrink-0"
                        style={{ background: 'rgba(217,164,65,.18)' }}
                        title={`via ${SOURCE_LABEL[job.source] || job.source}`}
                      >
                        {SOURCE_LABEL[job.source] || job.source}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {isEntryJob(job) && (
                        <GoldChip icon={FiZap} title="Entry-level / internship friendly">
                          Entry-level
                        </GoldChip>
                      )}
                      {isAnywhereJob(job) && (
                        <GoldChip icon={FiGlobe} title="Hires from anywhere">
                          Anywhere
                        </GoldChip>
                      )}
                      {job.type && <GoldChip icon={FiBriefcase}>{typeLabel(job.type)}</GoldChip>}
                      {job.seniority && <GoldChip icon={FiZap}>{job.seniority}</GoldChip>}
                    </div>

                    {job.blurb && (
                      <p
                        className="text-xs text-espresso-600 leading-relaxed overflow-hidden"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {job.blurb}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-espresso-500">
                      {job.location && (
                        <span className="inline-flex items-center gap-1 min-w-0">
                          <FiMapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[220px]">{job.location}</span>
                        </span>
                      )}
                      {job.salary && (
                        <span className="inline-flex items-center gap-1 font-bold text-espresso-700">
                          <FiDollarSign className="w-3 h-3 shrink-0" />
                          {job.salary}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1 min-w-0">
                        {(job.tags || []).slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-espresso-600 truncate max-w-[90px]"
                            style={{ background: 'rgba(255,255,255,.55)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-gold !py-1.5 !px-3 text-[11px] shrink-0"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                        Apply
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>

          {visible < filtered.length && (
            <div className="flex justify-center pt-2">
              <button onClick={() => setVisible(visible + PAGE_SIZE)} className="btn btn-cream">
                Show more ({filtered.length - visible} left)
              </button>
            </div>
          )}

          <p className="text-[10px] text-espresso-400 text-center pt-2">
            Listings from the free public Remotive &amp; Himalayas APIs · aggregated and cached by
            the Full Stack Ocean server · always verify details on the original posting
          </p>
        </>
      )}
    </div>
  );
};

export default Jobs;
