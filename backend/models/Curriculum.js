const mongoose = require('mongoose');

// Comment Schema for Practice/Notes
const CommentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['note', 'question', 'solution'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Link Schema for Lecture/Practice links
const LinkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  isValid: {
    type: Boolean,
    default: true
  },
  lastChecked: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Lesson Schema (Individual lecture/activity)
const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  slug: String, // stable id for deep links, e.g. 6-0001-w1-l1
  lectureLink: LinkSchema,
  practiceLink: LinkSchema,
  duration: {
    type: Number, // in minutes
    default: 90
  },
  order: {
    type: Number,
    required: true
  },
  isReview: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  materials: {
    videoId: String,
    videoTitle: String,
    recitationVideoId: String,
    transcriptUrl: String,
    slidesUrl: String,
    readingUrl: String,
    practicePdfUrl: String,
    practiceSolUrl: String,
    practiceZipUrl: String,
    practiceLabel: String,
    externalUrl: String,
    notes: {
      summary: String,
      concepts: [String],
      focus: String
    }
  }
}, { _id: false });

// Day Schema
const DaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  lessons: [LessonSchema],
  isReviewDay: {
    type: Boolean,
    default: false
  },
  reviewNotes: String
}, { _id: false });

// Week Schema
const WeekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  title: String,
  description: String,
  days: [DaySchema],
  totalHours: Number,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { _id: false });

// Course Schema
const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  term: {
    type: String,
    enum: ['TERM1', 'TERM2', 'TERM3', 'TERM4', 'TERM5', 'TERM6', 'TERM7', 'TERM8'],
    default: 'TERM1'
  },
  weeklyHours: Number,
  instructor: String,
  resources: {
    lectures: [LinkSchema],
    assignments: [LinkSchema],
    exams: [LinkSchema]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Term Schema
const TermSchema = new mongoose.Schema({
  termNumber: {
    type: Number,
    required: true
  },
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  weeks: [WeekSchema],
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: false
  }
});

// Curriculum Schema (Main)
const CurriculumSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Full Stack Ocean - Ultimate Daily Timetable'
  },
  description: String,
  version: {
    type: String,
    default: '1.0.0'
  },
  startDate: {
    type: Date,
    default: new Date('2026-10-07')
  },
  isActive: {
    type: Boolean,
    default: true
  },
  terms: [TermSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = {
  Curriculum: mongoose.model('Curriculum', CurriculumSchema),
  Term: mongoose.model('Term', TermSchema),
  Course: mongoose.model('Course', CourseSchema)
};