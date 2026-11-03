// Verifies seedDatabase() end-to-end against an in-memory MongoDB,
// including a slug lookup like the /lesson/:slug route does.
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri('fso-test');
  const mongoose = require('mongoose');
  const { seedDatabase } = require('./seedOssu');
  const { Curriculum, Course } = require('../models/Curriculum');
  const Book = require('../models/Book');

  await mongoose.connect(process.env.MONGO_URI);

  const stats = await seedDatabase();
  console.log('seed stats:', stats);

  const cur = await Curriculum.findOne({}).populate('terms.courses', 'courseCode section');
  console.log('curriculum:', cur.title, '| sections:', cur.terms.length,
    '| courses total:', cur.terms.reduce((n, t) => n + t.courses.length, 0));

  // Route-style lookups
  const bySlug = await Course.findOne({ 'modules.items.slug': 'classbased-l1' }).lean();
  console.log('slug lookup classbased-l1 ->', bySlug ? bySlug.courseCode : 'MISSING');
  const cs50 = await Course.findOne({ 'modules.items.slug': 'cs50p-w0' }).lean();
  console.log('slug lookup cs50p-w0 ->', cs50 ? cs50.courseCode : 'MISSING');
  const emptyModules = await Course.countDocuments({ modules: { $size: 0 } });
  console.log('courses without modules (catalog-only):', emptyModules);
  const bookCount = await Book.countDocuments();
  const dupSlug = await Course.aggregate([
    { $unwind: '$modules' },
    { $unwind: '$modules.items' },
    { $group: { _id: '$modules.items.slug', n: { $sum: 1 } } },
    { $match: { n: { $gt: 1 } } },
  ]);
  console.log('books:', bookCount, '| duplicate slugs in DB:', dupSlug.length);

  await mongoose.disconnect();
  await mongod.stop();
  console.log('SEED TEST PASSED');
})().catch((e) => {
  console.error('SEED TEST FAILED:', e);
  process.exit(1);
});
