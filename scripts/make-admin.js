require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/make-admin.js user@example.com');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    console.log(`Updated ${user.email} to admin`);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run();
