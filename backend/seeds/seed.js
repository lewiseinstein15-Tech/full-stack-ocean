const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedCurriculum } = require('./seeds/curriculumData');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fullstackocean')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Run seed
seedCurriculum()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err.message);
    process.exit(1);
  });