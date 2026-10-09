/**
 * Delete the disposable E2E test account + its progress docs from the live DB.
 * Usage (from backend dir):  MONGO_URI=... node scripts/deleteE2EUser.js
 */
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) { console.error('MONGO_URI required'); process.exit(1); }
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const email = 'ocean.e2e.tester@fullstackocean.app';

  const users = db.collection('users');
  const u = await users.findOne({ email });
  if (!u) { console.log('test user not found (already deleted)'); await mongoose.disconnect(); return; }
  const uid = String(u._id);

  const progress = db.collection('userprogresses');
  const p = await progress.findOne({ user: u._id });
  let deletedProgress = 0;
  if (p) { await progress.deleteOne({ _id: p._id }); deletedProgress = 1; }

  await users.deleteOne({ _id: u._id });
  console.log(`deleted test user ${email} (id ${uid}) + progress docs: ${deletedProgress}`);
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
