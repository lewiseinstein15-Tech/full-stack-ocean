/**
 * Create or promote an admin user directly in the live database.
 * Uses the app's own User model so validation + bcrypt hashing apply.
 *
 * Usage:
 *   MONGO_URI=... ADMIN_EMAIL=... ADMIN_USERNAME=... ADMIN_PASSWORD=... [ADMIN_NAME=...] \
 *     node scripts/createAdmin.js
 */
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
  const uri = process.env.MONGO_URI;
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const username = (process.env.ADMIN_USERNAME || '').trim();
  const password = process.env.ADMIN_PASSWORD || '';
  const firstName = process.env.ADMIN_NAME || 'Admin';

  if (!uri || !email || !username || !password) {
    console.error('MONGO_URI, ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD env vars are required');
    process.exit(1);
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log('Connected to database');

  try {
    let user = await User.findOne({ email });
    if (user) {
      // Promote existing account to admin and (re)set its password
      user.role = 'admin';
      user.isActive = true;
      user.password = password;
      if (!user.firstName) user.firstName = firstName;
      await user.save();
      console.log('EXISTING user promoted to admin');
    } else {
      const unameTaken = await User.findOne({ username });
      if (unameTaken) {
        console.error('Username "' + username + '" is already taken by another account');
        process.exit(1);
      }
      user = await User.create({
        username,
        email,
        password,
        firstName,
        role: 'admin'
      });
      console.log('CREATED new admin user');
    }

    const check = await User.findOne({ email }).select('email username firstName role isActive');
    console.log('VERIFY:', JSON.stringify(check, null, 2));
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
