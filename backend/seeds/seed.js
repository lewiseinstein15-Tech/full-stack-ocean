const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { seedCurriculum } = require('./curriculumData');
const { applyMaterials } = require('../scripts/applyMaterials');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fullstackocean')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Run seed, then attach in-app study materials to every lesson
seedCurriculum()
  .then(async () => {
    const { Curriculum } = require('../models/Curriculum');
    const curriculum = await Curriculum.findOne();
    if (curriculum) {
      const result = await applyMaterials(curriculum);
      console.log(`Materials applied: ${result.applied} lessons` +
        (result.missed.length ? `, missed: ${result.missed.join('; ')}` : ''));
    }
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err.message);
    process.exit(1);
  });