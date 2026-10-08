const express = require('express');
const https = require('https');

const router = express.Router();

// ---------------------------------------------------------------------------
// Jobs & internships aggregation from free, keyless public job-board APIs.
// Sources: Remotive (remote tech jobs) + Himalayas (remote jobs, worldwide).
// Server-side cache (30 min) keeps us friendly to the free upstreams and the
// global /api rate limiter.
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 30 * 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 15000;
const MAX_JOBS_RESPONSE = 150;

// Himalayas paginates 20/page via nextCursor; pull a few pages for a decent pool
const HIMALAYAS_PAGES = 6;

// Tech / design / product focus for the study platform (normalized, lowercase)
const TECH_CATEGORIES = new Set([
  'software development', 'developer', 'data science', 'data', 'devops',
  'devops & sysadmin', 'sysadmin', 'design', 'product', 'it', 'qa',
  'security', 'hardware engineer', 'research & development', 'web', 'mobile',
]);

const cache = new Map(); // source -> { jobs, ts }

// Minimal redirect-following JSON GET (no external deps, works on any Node)
function httpGetJson(url, depth = 0) {
  return new Promise((resolve, reject) => {
    if (depth > 3) return reject(new Error('too many redirects'));
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'fullstackocean-jobs/1.0', Accept: 'application/json' } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(httpGetJson(new URL(res.headers.location, url).href, depth + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`upstream ${res.statusCode}`));
        }
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (c) => {
          raw += c;
          if (raw.length > 8e6) req.destroy(new Error('upstream response too large'));
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.setTimeout(UPSTREAM_TIMEOUT_MS, () => req.destroy(new Error('upstream timeout')));
    req.on('error', reject);
  });
}

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeRemotive(j) {
  const blurb = stripTags(j.description).slice(0, 200);
  return {
    id: `rem-${j.id}`,
    source: 'remotive',
    title: j.title || '',
    company: j.company_name || '',
    logo: j.company_logo || j.company_logo_url || '',
    url: j.url || '',
    category: j.category || '',
    tags: Array.isArray(j.tags) ? j.tags.slice(0, 8) : [],
    type: j.job_type || '',
    seniority: '',
    location: j.candidate_required_location || '',
    salary: j.salary || '',
    posted: j.publication_date || null,
    blurb,
  };
}

function prettifyTag(t) {
  return String(t || '').replace(/-/g, ' ').trim();
}

function normalizeHimalayas(j) {
  const loc = Array.isArray(j.locationRestrictions) ? j.locationRestrictions : [];
  const seniority = Array.isArray(j.seniority) ? j.seniority.filter(Boolean).join(', ') : String(j.seniority || '');
  let salary = '';
  if (j.minSalary || j.maxSalary) {
    const cur = j.currency || '';
    const lo = j.minSalary ? `${cur}${j.minSalary}` : '';
    const hi = j.maxSalary ? `${cur}${j.maxSalary}` : '';
    salary = `${lo}${lo && hi ? ' – ' : ''}${hi}${j.salaryPeriod ? ` / ${j.salaryPeriod}` : ''}`;
  }
  return {
    id: `him-${j.guid}`,
    source: 'himalayas',
    title: j.title || '',
    company: j.companyName || '',
    logo: j.companyLogo || '',
    url: j.applicationLink || '',
    category: (Array.isArray(j.parentCategories) && j.parentCategories[0]) ||
      (Array.isArray(j.categories) && prettifyTag(j.categories[0])) ||
      '',
    tags: Array.isArray(j.categories) ? j.categories.slice(0, 8).map(prettifyTag) : [],
    type: j.employmentType || '',
    seniority,
    location: loc.join(', '),
    salary,
    posted: j.pubDate || null,
    blurb: stripTags(j.excerpt || j.description).slice(0, 200),
  };
}

function isTech(j) {
  // Remotive: single `category`; Himalayas: `parentCategories` array
  if (Array.isArray(j.parentCategories)) {
    return j.parentCategories.some((c) => TECH_CATEGORIES.has(String(c).toLowerCase().trim()));
  }
  return TECH_CATEGORIES.has(String(j.category || '').toLowerCase().trim());
}

async function fetchCached(name, loader) {
  const hit = cache.get(name);
  if (hit && Date.now() - hit.ts < CACHE_TTL_MS) return hit.jobs;
  let jobs = await loader();
  jobs = jobs.filter((j) => j.title && j.url);
  cache.set(name, { jobs, ts: Date.now() });
  return jobs;
}

const LOADERS = {
  remotive: () =>
    httpGetJson('https://remotive.com/api/remote-jobs?limit=100').then((d) =>
      (Array.isArray(d.jobs) ? d.jobs : []).filter(isTech).map(normalizeRemotive)
    ),

  himalayas: async () => {
    let raw = [];
    let cursor = null;
    const seen = new Set();
    for (let p = 0; p < HIMALAYAS_PAGES; p++) {
      let url = 'https://himalayas.app/jobs/api?limit=20';
      if (cursor) url += `&cursor=${encodeURIComponent(cursor)}`;
      const data = await httpGetJson(url);
      const page = Array.isArray(data.jobs) ? data.jobs : [];
      page.forEach((j) => {
        if (j && j.guid && !seen.has(j.guid)) {
          seen.add(j.guid);
          raw.push(j);
        }
      });
      cursor = data.nextCursor;
      if (!cursor) break;
    }
    return raw.filter(isTech).map(normalizeHimalayas);
  },
};

async function loadSource(name) {
  const loader = LOADERS[name];
  if (!loader) throw new Error(`unknown source: ${name}`);
  return fetchCached(name, loader);
}

const ANYWHERE_RE = /worldwide|anywhere|global|earth/i;
const ENTRY_RE = /entry|intern|junior|trainee|graduate|associate/i;

function isAnywhere(j) {
  if (!j.location) return true; // no restrictions listed = open broadly
  return ANYWHERE_RE.test(j.location);
}

function isEntry(j) {
  return ENTRY_RE.test(j.seniority || '') || ENTRY_RE.test(j.title || '');
}

// @route   GET /api/jobs
// @desc    Live remote jobs & internships (Remotive + Himalayas), cached 30 min
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { q = '', category = '', source = 'all', entry, anywhere } = req.query;
    const names = source === 'all' || !LOADERS[source] ? Object.keys(LOADERS) : [source];

    const settled = await Promise.allSettled(names.map(loadSource));
    const sources = {};
    let all = [];
    settled.forEach((r, i) => {
      sources[names[i]] = r.status === 'fulfilled' ? 'ok' : 'upstream error';
      if (r.status === 'fulfilled') all = all.concat(r.value);
    });

    // Honest category chips derived from live data
    const categoryCounts = {};
    all.forEach((j) => {
      if (j.category) categoryCounts[j.category] = (categoryCounts[j.category] || 0) + 1;
    });
    const categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const ql = String(q).toLowerCase().trim();
    const cat = String(category).toLowerCase().trim();
    const wantEntry = entry === 'true' || entry === '1';
    const wantAnywhere = anywhere === 'true' || anywhere === '1';

    let jobs = all.filter((j) => {
      if (cat && String(j.category).toLowerCase() !== cat) return false;
      if (wantEntry && !isEntry(j)) return false;
      if (wantAnywhere && !isAnywhere(j)) return false;
      if (ql) {
        const hay = `${j.title} ${j.company} ${(j.tags || []).join(' ')} ${j.category} ${j.location}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });

    jobs.sort((a, b) => new Date(b.posted || 0) - new Date(a.posted || 0));

    res.json({
      success: true,
      count: jobs.length,
      total: all.length,
      entryCount: all.filter(isEntry).length,
      anywhereCount: all.filter(isAnywhere).length,
      sources,
      categories,
      jobs: jobs.slice(0, MAX_JOBS_RESPONSE),
    });
  } catch (error) {
    console.error('Jobs route error:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
