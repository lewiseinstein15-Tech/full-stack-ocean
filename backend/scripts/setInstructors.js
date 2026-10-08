// Set real MIT OCW instructors on the live Course docs (data-only fix).
// Run on VM:  node scripts/setInstructors.js   (with MONGO_URI from ~/.hermes/.env)
const mongoose = require('mongoose');
const Course = require('../models/Curriculum').Course || require('../models/Curriculum');

const INSTRUCTORS = {
  '6.0001': 'Dr. Ana Bell & Prof. John Guttag',
  '18.01SC': 'Prof. David Jerison',
  '6.042J': 'Prof. Tom Leighton',
};

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI env var required');
  await mongoose.connect(uri);
  for (const [code, instructor] of Object.entries(INSTRUCTORS)) {
    const doc = await Course.findOneAndUpdate(
      { courseCode: code },
      { instructor },
      { new: true }
    );
    console.log(code, '->', doc ? doc.instructor : 'NOT FOUND');
  }
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
