/* Attach real MIT OCW material (videos, PDFs, notes) to every curriculum lesson.
 *
 * - Matches lessons by course + week + exact title
 * - Sets lesson.slug (stable deep-link id) and lesson.materials
 * - Usable as a CLI (node scripts/applyMaterials.js) or as a module from seeds/seed.js
 *
 * Material © MIT OpenCourseWare, CC BY-NC-SA 4.0.
 */
const mongoose = require('mongoose');
const MATERIALS = require('./materialsData');

async function applyMaterials(curriculum) {
  let applied = 0;
  const missed = [];

  for (const entry of MATERIALS) {
    let found = false;
    for (const term of curriculum.terms) {
      for (const week of term.weeks) {
        if (week.weekNumber !== entry.week) continue;
        for (const day of week.days) {
          for (const lesson of day.lessons) {
            const course = lesson.metadata && lesson.metadata.course;
            if (course === entry.course && lesson.title === entry.title) {
              lesson.slug = entry.slug;
              lesson.materials = entry.materials;
              applied += 1;
              found = true;
            }
          }
        }
      }
    }
    if (!found) missed.push(`${entry.course} W${entry.week} ${entry.title}`);
  }

  await curriculum.save();
  return { applied, missed };
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI env var required');
    process.exit(1);
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log('Connected to database');
  const { Curriculum } = require('../models/Curriculum');
  const curriculum = await Curriculum.findOne();
  if (!curriculum) {
    console.error('No curriculum found - run the base seed first');
    process.exit(1);
  }
  const result = await applyMaterials(curriculum);
  console.log('APPLIED:', result.applied, 'of', MATERIALS.length);
  if (result.missed.length) {
    console.error('MISSED:', JSON.stringify(result.missed, null, 2));
    process.exit(1);
  }
  await mongoose.disconnect();
}

if (require.main === module) {
  main().catch((err) => {
    console.error('FATAL:', err.message);
    process.exit(1);
  });
}

module.exports = { applyMaterials };
