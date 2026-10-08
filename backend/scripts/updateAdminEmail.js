/**
 * Update an existing account's email/username in the live database.
 * Usage:
 *   MONGO_URI=... OLD_EMAIL=... NEW_EMAIL=... NEW_USERNAME=... node scripts/updateAdminEmail.js
 */
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
  const uri = process.env.MONGO_URI;
  const oldEmail = (process.env.OLD_EMAIL || '').toLowerCase().trim();
  const newEmail = (process.env.NEW_EMAIL || '').toLowerCase().trim();
  const newUsername = (process.env.NEW_USERNAME || '').trim();

  if (!uri || !oldEmail || !newEmail) {
    console.error('MONGO_URI, OLD_EMAIL, NEW_EMAIL, NEW_USERNAME env vars are required');
    process.exit(1);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log('Connected to database');

  try {
    // Make sure the target email is not already used by a different account
    const existing = await User.findOne({ email: newEmail });
    if (existing && existing.email !== oldEmail) {
      console.error('Target email already in use by another account');
      process.exit(1);
    }

    const user = await User.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail, username: newUsername },
      { new: true }
    ).select('email username firstName role isActive');

    if (!user) {
      console.error('No user found with email: ' + oldEmail);
      process.exit(1);
    }
    console.log('UPDATED:', JSON.stringify(user, null, 2));
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
