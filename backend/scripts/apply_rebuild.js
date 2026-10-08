/* Full Stack Ocean — curriculum rebuild (Task 28).
 * 1) Term 1: upgrade 6.0001 lesson materials to the 6.100L Fall 2022 edition (slug-keyed; slugs preserved).
 * 2) Terms 2-8: replace every course lesson (13 per course) with real, correctly-ordered
 *    lectures + materials + notes. Positional replacement: the Nth lesson of a course (in
 *    document order) receives the Nth new lesson; existing slug is KEPT (progress safety).
 * 3) Course docs: update descriptions/resources to newest editions (2026 where live).
 * REVIEW lessons are left untouched.
 *
 * Run on the VM:  cd backend && node scripts/apply_rebuild.js
 */
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { Curriculum, Course } = require('../models/Curriculum');

const DATA_DIR = path.join(__dirname, 'courses_data');

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
}

const T1_PATCH = loadJson('t1_60001.json');
const TERM_FILES = {
  2: ['t2_cs50x.json', 't2_1801scb.json', 't2_18006.json'],
  3: ['t3_cs61a.json', 't3_cs61b.json', 't3_stat110.json'],
  4: ['t4_6006.json', 't4_6046j.json', 't4_6004.json'],
  5: ['t5_n2t.json', 't5_6828.json', 't5_6829.json'],
  6: ['t6_6830.json', 't6_6045j.json', 't6_cse341.json'],
  7: ['t7_6036.json', 't7_cs188.json', 't7_6858.json'],
  8: ['t8_cs143.json', 't8_cs142.json', 't8_capstone.json'],
};
const COURSE_DOCS = loadJson('course_docs.json').courses;

/* Course code in DB (metadata.course) -> data file course code */
const CODE_MAP = {
  'CS50x': 'CS50x', 'CS50X': 'CS50x',
  '18.01SC-B': '18.01SC-B',
  '18.06': '18.06',
  'CS61A': 'CS61A', 'CS61B': 'CS61B', 'STAT110': 'STAT110',
  '6.006': '6.006', '6.046J': '6.046J', '6.004': '6.004',
  'N2T': 'N2T', '6.828': '6.828', '6.829': '6.829',
  '6.830': '6.830', '6.045J': '6.045J', 'CSE341': 'CSE341',
  '6.036': '6.036', 'CS188': 'CS188', '6.858': '6.858',
  'CS143': 'CS143', 'CS142': 'CS142', 'CAPSTONE': 'CAPSTONE',
};

function toLink(l) {
  if (!l || !l.url) return undefined;
  return { url: l.url, title: l.title || '', isValid: true, lastChecked: new Date() };
}

function toMaterials(m) {
  if (!m) return undefined;
  const out = {};
  const allowed = ['videoId', 'videoTitle', 'recitationVideoId', 'transcriptUrl', 'slidesUrl',
    'readingUrl', 'practicePdfUrl', 'practiceSolUrl', 'practiceZipUrl', 'practiceLabel', 'externalUrl'];
  for (const k of allowed) {
    if (m[k] !== undefined && m[k] !== null && m[k] !== '') out[k] = m[k];
  }
  if (m.notes) {
    out.notes = {
      summary: m.notes.summary || '',
      concepts: Array.isArray(m.notes.concepts) ? m.notes.concepts : [],
      focus: m.notes.focus || '',
    };
  }
  return out;
}

function applyLesson(lesson, data) {
  lesson.title = data.title;
  if (data.lecture && data.lecture.url) lesson.lectureLink = toLink(data.lecture);
  else if (lesson.lectureLink) lesson.lectureLink = undefined;
  if (data.practice && data.practice.url) lesson.practiceLink = toLink(data.practice);
  else if (lesson.practiceLink) lesson.practiceLink = undefined;
  lesson.materials = toMaterials(data.materials) || {};
  lesson.duration = data.duration || 90;
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) { console.error('MONGO_URI required'); process.exit(1); }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log('Connected to DB');

  const curriculum = await Curriculum.findOne();
  if (!curriculum) { console.error('No curriculum found'); process.exit(1); }

  /* ---------- 1) Term 1 patch (slug-keyed) ---------- */
  let t1Applied = 0, t1Missed = [];
  const t1BySlug = new Map(T1_PATCH.lessons.map((l) => [l.slug, l]));
  for (const term of curriculum.terms) {
    for (const week of term.weeks) {
      for (const day of week.days) {
        for (const lesson of day.lessons) {
          const data = t1BySlug.get(lesson.slug);
          if (data) {
            applyLesson(lesson, data);
            t1Applied += 1;
            t1BySlug.delete(lesson.slug);
          }
        }
      }
    }
  }
  t1Missed = [...t1BySlug.keys()];
  console.log(`Term 1: applied ${t1Applied}, missed ${t1Missed.length}${t1Missed.length ? ' -> ' + t1Missed.join(', ') : ''}`);

  /* ---------- 2) Terms 2-8 positional replacement ---------- */
  const stats = {};
  for (const term of curriculum.terms) {
    const termNumber = term.termNumber;
    if (termNumber === 1) continue;
    const files = TERM_FILES[termNumber];
    if (!files) continue;
    const byCourse = {};
    for (const f of files) {
      const d = loadJson(f);
      byCourse[d.course] = d.lessons;
    }
    const counters = {};
    let replaced = 0, kept = 0, missingData = [];
    for (const week of term.weeks) {
      for (const day of week.days) {
        for (const lesson of day.lessons) {
          const code = lesson.metadata && lesson.metadata.course;
          if (code === 'REVIEW' || !code) { kept += 1; continue; }
          const dataKey = CODE_MAP[code];
          const list = dataKey && byCourse[dataKey];
          if (!list) { missingData.push(code); kept += 1; continue; }
          const idx = counters[code] = (counters[code] || 0);
          if (idx >= list.length) { kept += 1; continue; }
          const data = list[idx];
          applyLesson(lesson, data);
          counters[code] += 1;
          replaced += 1;
        }
      }
    }
    stats[termNumber] = { replaced, kept, missingData: [...new Set(missingData)] };
    console.log(`Term ${termNumber}: replaced ${replaced}, kept (review/extra) ${kept}`,
      stats[termNumber].missingData.length ? 'MISSING: ' + stats[termNumber].missingData.join(',') : '');
    // warn if a course's data list wasn't fully consumed
    for (const [course, list] of Object.entries(byCourse)) {
      const used = Object.entries(CODE_MAP).filter(([k, v]) => v === course)
        .reduce((n, [k]) => n + (counters[k] || 0), 0);
      if (used < list.length) console.warn(`  Term ${termNumber} ${course}: only ${used}/${list.length} lessons used`);
    }
  }

  /* ---------- 3) Course docs update ---------- */
  let docsUpdated = 0;
  const allCourses = await Course.find({});
  for (const course of allCourses) {
    const upd = COURSE_DOCS[course.courseCode];
    if (!upd) continue;
    if (upd.description) course.description = upd.description;
    if (upd.lectures) course.resources.lectures = upd.lectures.map((l) => ({ ...l, isValid: true, lastChecked: new Date() }));
    if (upd.assignments) course.resources.assignments = upd.assignments.map((l) => ({ ...l, isValid: true, lastChecked: new Date() }));
    await course.save();
    docsUpdated += 1;
  }
  console.log(`Course docs updated: ${docsUpdated}`);

  curriculum.version = '2.1.0';
  await curriculum.save();
  console.log('Curriculum saved (version 2.1.0)');
  await mongoose.disconnect();

  const totalReplaced = Object.values(stats).reduce((n, s) => n + s.replaced, 0);
  console.log(`DONE. Term1 patched: ${t1Applied}; Terms2-8 replaced: ${totalReplaced}; docs: ${docsUpdated}`);
}

main().catch((e) => { console.error('FATAL', e); process.exit(1); });
