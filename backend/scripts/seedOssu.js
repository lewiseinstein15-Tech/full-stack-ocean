// Seeds the OSSU-aligned curriculum (sections -> courses -> modules -> items)
// and the Great Readings bookshelf. Idempotent: wipes the three content
// collections and re-inserts. Runs standalone (`node scripts/seedOssu.js`)
// or on server boot when the database is empty (see server.js).
require('dotenv').config();

const mongoose = require('mongoose');
const { Curriculum, Course } = require('../models/Curriculum');
const Book = require('../models/Book');
const { sections, courses } = require('../seeds/ossuData');
const courseModules = require('../seeds/ossuModules');
const { books } = require('../seeds/ossuBooks');

const VERSION = '4.0.0-ossu';

async function seedDatabase() {
  // Courses first so the curriculum can reference their ObjectIds
  await Course.deleteMany({});
  await Curriculum.deleteMany({});
  await Book.deleteMany({});

  const modulesByCode = courseModules;
  const courseDocs = courses.map((c) => {
    const mods = modulesByCode[c.courseCode] || [];
    // ensure every item carries a global order within its course
    const modules = mods.map((m) => ({
      title: m.title,
      description: m.description,
      items: (m.items || []).map((it) => ({ ...it, metadata: { course: c.courseCode, ...(it.metadata || {}) } }))
    }));
    return Course.create({ ...c, modules });
  });

  const insertedCourses = await Promise.all(courseDocs);
  const byCode = {};
  for (const doc of insertedCourses) byCode[doc.courseCode] = doc._id;

  const terms = sections.map((s) => ({
    termNumber: s.termNumber,
    key: s.key,
    title: s.title,
    description: s.description,
    topics: s.topics || [],
    isActive: true,
    courses: courses
      .filter((c) => c.section === s.key)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((c) => byCode[c.courseCode])
      .filter(Boolean)
  }));

  await Curriculum.create({
    title: 'Full Stack Ocean — Computer Science',
    description:
      'A complete, self-paced education in computer science aligned with the OSSU curriculum. Browse courses, study the material, track what you have finished — no calendar, nothing tells you what to do on a given day.',
    source: 'https://github.com/lewiseinstein15-Tech/computer-science',
    version: VERSION,
    isActive: true,
    terms
  });

  await Book.insertMany(books);

  const itemCount = insertedCourses.reduce(
    (n, c) => n + (c.modules || []).reduce((m, mod) => m + (mod.items || []).length, 0),
    0
  );
  return {
    courses: insertedCourses.length,
    sections: terms.length,
    items: itemCount,
    books: books.length,
    version: VERSION
  };
}

let seedPromise = null;

// Auto-seed on boot when the database has no current-version curriculum.
async function seedIfEmpty() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    try {
      const existing = await Curriculum.findOne({ version: VERSION });
      const courseCount = await Course.countDocuments();
      if (existing && courseCount > 0) {
        console.log(`Curriculum ${VERSION} already present (${courseCount} courses) — skipping seed`);
        return null;
      }
      console.log('Seeding OSSU-aligned curriculum…');
      const stats = await seedDatabase();
      console.log(
        `Seeded: ${stats.sections} sections, ${stats.courses} courses, ${stats.items} study items, ${stats.books} books`
      );
      return stats;
    } catch (err) {
      console.error('Auto-seed failed (server continues without it):', err.message);
      return null;
    } finally {
      seedPromise = null;
    }
  })();
  return seedPromise;
}

async function connectAndSeed() {
  const uri = process.env.MONGO_URI;
  if (!uri || uri.includes('placeholder')) {
    console.error('MONGO_URI not set — cannot seed.');
    process.exit(1);
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const stats = await seedDatabase();
  console.log('Seed complete:', stats);
  await mongoose.disconnect();
}

if (require.main === module) {
  connectAndSeed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
  });
}

module.exports = { seedDatabase, seedIfEmpty, VERSION };
