// Build + seed the full 8-term Full Stack Ocean curriculum.
// - 24 courses in the PDF's order, 8 terms
// - every study day = exactly 2 lessons
// - dates count from the learner's real start date (2026-10-08)
// - Term 1 keeps the real MIT materials (slugs preserved -> completions survive)
// - Terms 2-8 carry official course hub links from the PDF
// Run on VM:  cd backend && MONGO_URI=... node scripts/buildFullCurriculum.js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { Curriculum, Course } = require('../models/Curriculum');
const M = require('./materialsData.js');
const materialsData = M.materials || M;
const { COURSES, T1_WEEKS, TERM_TABLES, TERM_TITLES, TECHNIQUES, TECHNIQUE_DEFAULT } = require('./curriculumTables.js');

const START = Date.UTC(2026, 9, 8); // 2026-10-08 — the day Lewis actually started studying

const filesMap = (() => {
  const p = path.join(__dirname, 'materialsFiles.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
})();

const localize = (url) => (url && filesMap[url]) || url || undefined;

const bySlugMaterials = {};
for (const item of materialsData) {
  if (item.slug) bySlugMaterials[item.slug] = item;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const fmt = (utcMs) => new Date(utcMs).toISOString().replace(/T.*$/, '');
const weekdayOf = (utcMs) => WEEKDAYS[new Date(utcMs).getUTCDay()];

const slugifyCourse = (code) => code.replace(/\./g, '').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();

// ---------------------------------------------------------------- T1 lessons
function t1Lesson(slug) {
  const item = bySlugMaterials[slug];
  const mats = item && item.materials ? item.materials : {};
  const lesson = {
    slug,
    title: (item && item.title) || slug,
    description: undefined, // filled from old DB below
    duration: (item && item.duration) || 90,
    order: 0,
    isReview: false,
    metadata: { course: item ? item.course : 'REVIEW', term: 1 },
    materials: {},
  };
  const F = ['videoId', 'videoTitle', 'recitationVideoId', 'transcriptUrl', 'slidesUrl', 'readingUrl',
    'practicePdfUrl', 'practiceSolUrl', 'practiceZipUrl', 'practiceLabel', 'externalUrl'];
  for (const f of F) {
    const v = mats[f];
    if (v === undefined || v === null || v === '') continue;
    lesson.materials[f] = /Url$/.test(f) ? localize(v) : v;
  }
  if (mats.notes) lesson.materials.notes = mats.notes;
  return lesson;
}

function t1Review(slug, title, summary, focus, duration, isReview) {
  return {
    slug, title, duration, order: 0, isReview,
    metadata: { course: 'REVIEW', term: 1 },
    materials: { notes: { summary, focus } },
  };
}

const T1_REVIEWS = {
  '6-0001-midterm': t1Review('6-0001-midterm', 'Midterm Review — 6.0001',
    'Consolidation checkpoint for the first half of MIT 6.0001. Re-implement one recursion exercise and one OOP exercise from scratch without notes, redo the hardest Pset 0-2 problems, and re-watch any lecture segment that still feels foggy.',
    'Target: every pset problem from the first half re-solved cleanly, and a written list of your three weakest topics with the fix for each.', 120, false),
  '18-01-midterm': t1Review('18-01-midterm', 'Midterm Review — 18.01SC (1A)',
    'Checkpoint for differential calculus. Rederive the derivative rules from the limit definition, redo the hardest differentiation pset problems, and sketch one graph per rule to show you know what it means geometrically.',
    'Target: the chain rule, product rule and implicit differentiation each explained in two sentences plus one worked example, no notes.', 120, false),
  '6-042-midterm': t1Review('6-042-midterm', 'Midterm Review — 6.042J',
    'Checkpoint for mathematical reasoning. Write one full induction proof and one well-ordering proof from blank paper, redo the trickiest number-theory exercises, and state every definition from the first half precisely.',
    'Target: a clean induction proof with base case, hypothesis, step and conclusion labeled — plus GCD and modular arithmetic problems re-solved.', 120, false),
  '6-0001-final': t1Review('6-0001-final', 'Final Review — 6.0001',
    'Full-course consolidation for MIT 6.0001. Redo the hardest problems from Psets 3-5, re-derive the complexity of the searching and sorting algorithms you learned, and write a one-page course summary from memory.',
    'Target: big-O of merge sort, selection sort and binary search derived (not remembered), plus one complete program written from a blank file.', 150, false),
  '18-01-final': t1Review('18-01-final', 'Final Review — 18.01SC (1A)',
    'Full-course consolidation for differentiation. Take a full past 18.01 exam (from the practice archive), closed notes, then review every miss until each is re-solved correctly.',
    'Target: a complete exam scored honestly, with every missed problem re-derived from its definition.', 150, false),
  '6-042-final': t1Review('6-042-final', 'Final Review — 6.042J',
    'Full-course consolidation for mathematics for CS. Re-solve the RSA pipeline end to end — key generation, encryption, decryption — and write the proof sketch of Euler\u2019s theorem from memory.',
    'Target: one page: RSA from first principles, with every step justified. This is the pay-off lecture of the whole course.', 150, false),
};

function sundayLesson(term, pdfWeek, technique) {
  const tech = TECHNIQUES[technique] || TECHNIQUE_DEFAULT;
  return {
    slug: `t${term}-review-w${pdfWeek}`,
    title: `Weekly Review — ${tech.title}`,
    description: 'A 30-minute consolidation ritual from the curriculum: the technique changes weekly, the rule never does — no notes allowed.',
    duration: 30,
    order: 0,
    isReview: true,
    metadata: { course: 'REVIEW', term, pdfWeek },
    materials: {
      notes: {
        summary: tech.summary,
        focus: 'Keep it to 30 minutes, close the notes, and write what you actually remember — the gaps you find are tomorrow\u2019s study plan.',
      },
    },
  };
}

// Title normalizer for T2-T8 cells: "Lec 0 Scratch" -> "Lecture 0: Scratch"
function titleify(cell) {
  return cell
    .replace(/^Lec\s+/, 'Lecture ')
    .replace(/^Ch\s+/, 'Chapter ')
    .replace(/^(Lecture|Chapter)\s+(\S+)\s+(.*)$/, '$1 $2: $3')
    .replace(/^MIDTERM\s*/, 'Midterm: ')
    .replace(/^FINAL\s*/, 'Final: ')
    .replace(/:\s*$/, '');
}

// ---------------------------------------------------------------- assemble
function buildTermLessons() {
  const terms = [];

  // ----- Term 1
  {
    const lessons = [];
    let seq = 0;
    for (let w = 0; w < T1_WEEKS.length; w++) {
      const row = T1_WEEKS[w];
      const pdfWeek = w + 1;
      for (const cell of row.slice(0, -1)) {
        if (!cell) continue;
        const lesson = bySlugMaterials[cell] ? t1Lesson(cell) : T1_REVIEWS[cell];
        if (!lesson) throw new Error(`Unknown T1 slot: ${cell}`);
        lesson.order = ++seq;
        lesson.metadata.pdfWeek = pdfWeek;
        lessons.push(lesson);
      }
      const sun = row[row.length - 1];
      if (sun) {
        const sl = sundayLesson(1, pdfWeek, sun);
        sl.order = ++seq;
        lessons.push(sl);
      }
    }
    terms.push({ term: 1, title: TERM_TITLES[1] || 'Foundations I', lessons });
  }

  // ----- Terms 2-8
  for (const tt of TERM_TABLES) {
    const lessons = [];
    const seqByCourse = {};
    let seq = 0;
    for (let w = 0; w < tt.weeks.length; w++) {
      const row = tt.weeks[w];
      const pdfWeek = w + 1;
      for (let c = 0; c < 3; c++) {
        const courseCode = tt.courses[c];
        const cell = row[c];
        if (!cell) continue;
        const course = COURSES[courseCode];
        const n = (seqByCourse[courseCode] = (seqByCourse[courseCode] || 0) + 1);
        const isExam = /^(MIDTERM|FINAL)/.test(cell);
        lessons.push({
          slug: `${slugifyCourse(courseCode)}-t${tt.term}-l${String(n).padStart(2, '0')}`,
          title: titleify(cell),
          description: `Week ${pdfWeek} of ${course.title} — Term ${tt.term} of the Full Stack Ocean path. ${course.description}`,
          duration: isExam ? 120 : 90,
          order: ++seq,
          isReview: false,
          metadata: { course: courseCode, term: tt.term, pdfWeek },
          materials: {
            externalUrl: course.watch,
            readingUrl: course.notes,
            notes: {
              summary: `${titleify(cell)} is a unit of ${course.title} (${courseCode}). Work through it on the official course hub: watch the lecture, study the matching notes, and do the practice problems for this unit.`,
              focus: 'Watch the lecture end to end, write a one-page summary in your own words, then attempt the matching exercises. Mark complete only when the exercises are done.',
            },
          },
        });
      }
      const sl = sundayLesson(tt.term, pdfWeek, row[3]);
      sl.order = ++seq;
      lessons.push(sl);
    }
    terms.push({ term: tt.term, title: tt.title, lessons });
  }
  return terms;
}

// ---------------------------------------------------------------- schedule
// Every day = exactly 2 lessons, dates counting from START. Days are grouped
// into 7-day weeks; a new week starts at each term boundary.
function scheduleTerms(terms) {
  let dayIndex = 0;
  for (const t of terms) {
    const days = [];
    for (let i = 0; i < t.lessons.length; i += 2) {
      const lessons = t.lessons.slice(i, i + 2);
      const ms = START + dayIndex * 86400000;
      days.push({
        date: new Date(ms),
        dayOfWeek: weekdayOf(ms),
        lessons,
        isReviewDay: lessons.every((l) => l.isReview),
      });
      dayIndex++;
    }
    // group days into weeks of 7
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      const chunk = days.slice(i, i + 7);
      weeks.push({
        weekNumber: weeks.length + 1,
        title: `Term ${t.term} · Week ${weeks.length + 1} — ${t.title}`,
        description: `Week ${weeks.length + 1} of Term ${t.term} (${t.title}) of the Full Stack Ocean path.`,
        startDate: chunk[0].date,
        endDate: chunk[chunk.length - 1].date,
        days: chunk,
        totalHours: Math.round(chunk.reduce((s, d) => s + d.lessons.reduce((x, l) => x + (l.duration || 90) / 60, 0), 0) * 10) / 10,
        courses: [],
      });
    }
    t.days = days;
    t.weeks = weeks;
    t.startDate = days[0].date;
    t.endDate = days[days.length - 1].date;
  }
  return terms;
}

// ---------------------------------------------------------------- main
async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI env var required');
  await mongoose.connect(uri);
  console.log('connected');

  // Carry over descriptions from the current (old) curriculum for T1 slugs.
  const old = await Curriculum.findOne({ isActive: true });
  const oldDesc = {};
  if (old) {
    for (const term of old.terms || []) {
      for (const week of term.weeks || []) {
        for (const day of week.days || []) {
          for (const l of day.lessons || []) {
            if (l.slug) oldDesc[l.slug] = { description: l.description, duration: l.duration };
          }
        }
      }
    }
  }
  console.log('old lesson descriptions found:', Object.keys(oldDesc).length);

  const terms = scheduleTerms(buildTermLessons());
  for (const t of terms) {
    for (const l of t.lessons) {
      if (oldDesc[l.slug]) {
        if (oldDesc[l.slug].description) l.description = oldDesc[l.slug].description;
        if (oldDesc[l.slug].duration) l.duration = oldDesc[l.slug].duration;
      }
    }
  }

  // ---- insert course docs
  const courseIds = {};
  for (const [code, c] of Object.entries(COURSES)) {
    const doc = await Course.findOneAndUpdate(
      { courseCode: code.toUpperCase() },
      {
        courseCode: code.toUpperCase(),
        title: c.title,
        description: c.description,
        term: `TERM${c.term}`,
        weeklyHours: c.weeklyHours,
        instructor: c.instructor,
        resources: {
          lectures: [{ title: 'Video hub', url: c.watch, description: 'Official lecture videos' }],
          assignments: [{ title: 'Practice archive', url: c.practice, description: 'Official problem sets and labs' }],
          exams: [{ title: 'Textbook / notes', url: c.notes, description: 'Official textbook and notes' }],
        },
      },
      { new: true, upsert: true }
    );
    courseIds[code] = doc._id;
  }
  console.log('courses upserted:', Object.keys(courseIds).length);

  // attach course refs to weeks
  for (const t of terms) {
    const codes = t.term === 1
      ? ['6.0001', '18.01SC', '6.042J']
      : TERM_TABLES.find((x) => x.term === t.term).courses;
    const ids = codes.map((c) => courseIds[c]);
    for (const w of t.weeks) w.courses = ids;
    t.courseRefs = ids;
  }

  // ---- wipe + insert curriculum
  await Curriculum.deleteMany({});
  const totalLessons = terms.reduce((s, t) => s + t.lessons.length, 0);
  const cur = await Curriculum.create({
    title: 'Full Stack Ocean of Computer Science',
    description: 'The complete 8-term self-study path: Foundations, Systems, Theory, AI, Security and Capstone. 24 courses, 2 lessons every day, dated from your real start date.',
    version: '2.0',
    startDate: new Date(START),
    isActive: true,
    terms: terms.map((t) => ({
      termNumber: t.term,
      title: t.title,
      description: `Term ${t.term} — ${t.title} (${t.lessons.length} lessons, ${t.weeks.length} weeks)`,
      startDate: t.startDate,
      endDate: t.endDate,
      weeks: t.weeks,
      courses: t.courseRefs,
      isActive: t.term === 1,
    })),
  });
  console.log('curriculum created:', cur._id);

  // ---- verification summary
  console.log('--- summary ---');
  console.log('total lessons:', totalLessons);
  for (const t of terms) {
    console.log(`Term ${t.term} (${t.title}): ${t.lessons.length} lessons, ${t.days.length} days, ${fmt(t.startDate.getTime())} -> ${fmt(t.endDate.getTime())}`);
  }
  const first = terms[0].days[0];
  console.log('day 1:', fmt(first.date.getTime()), first.dayOfWeek, '->', first.lessons.map((l) => `${l.slug} (${l.title})`).join(' | '));
  const today = new Date('2026-10-08');
  const day1 = terms[0].days.find((d) => d.date.toISOString().startsWith('2026-10-08'));
  console.log('today (2026-10-08):', day1 ? day1.lessons.map((l) => l.slug).join(' | ') : 'NOT FOUND');

  // T1 materials with local paths?
  const sample = bySlugMaterials['6-0001-w1-l1'];
  if (sample) {
    const l = terms[0].lessons.find((x) => x.slug === '6-0001-w1-l1');
    console.log('sample materials keys:', Object.keys(l.materials));
    console.log('slides local:', l.materials.slidesUrl);
  }

  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
