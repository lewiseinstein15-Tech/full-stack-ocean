const mongoose = require('mongoose');

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

// Video Schema — a lecture-video resource attached to a course:
// an embeddable YouTube playlist (playlistId set) or an external video hub
// the student opens in a new tab.
const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  playlistId: String,
  source: String,
  note: String,
  embeddable: {
    type: Boolean,
    default: true
  }
}, { _id: false });

// Item Schema — a single study unit inside a course module
// (a lecture, lab, assignment, project, reading or checkpoint).
// Slugs are the stable ids used by progress tracking, e.g. 'cs50p-w0'.
const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  slug: {
    type: String,
    required: true
  },
  url: String, // primary external link (course page, lecture, book chapter…)
  kind: {
    type: String,
    enum: ['lecture', 'lab', 'assignment', 'project', 'reading', 'exercise', 'checkpoint', 'video'],
    default: 'lecture'
  },
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
  note: String,
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  materials: {
    videoId: String,
    videoTitle: String,
    transcriptUrl: String,
    slidesUrl: String,
    readingUrl: String,
    practiceUrl: String,
    externalUrl: String,
    notes: {
      summary: String,
      concepts: [String],
      focus: String
    }
  }
}, { _id: false });

// Module Schema — an ordered group of items inside a course
// (e.g. "Week 0", "Part I", "Base approach"). No calendar dates:
// the curriculum is self-paced, nothing tells you WHAT to do on a given day.
const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  items: [ItemSchema],
  totalHours: Number
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
  section: {
    type: String,
    default: 'INTRO'
  },
  url: String, // official course/homepage link
  altUrl: String,
  provider: String,
  duration: String, // e.g. '14 weeks'
  effort: String, // e.g. '6-10 hours/week'
  prerequisites: [String],
  topics: [String],
  notes: String,
  weeklyHours: Number,
  instructor: String,
  order: {
    type: Number,
    default: 0
  },
  resources: {
    lectures: [LinkSchema],
    assignments: [LinkSchema],
    exams: [LinkSchema]
  },
  videos: [VideoSchema],
  modules: [ModuleSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CourseSchema.index({ 'modules.items.slug': 1 });
CourseSchema.index({ section: 1, order: 1 });

// Section Schema — a curriculum group ("Intro CS", "Core CS — Math", …).
// Kept under the legacy field name `terms` for API compatibility.
const TermSchema = new mongoose.Schema({
  termNumber: {
    type: Number,
    required: true
  },
  key: String,
  title: String,
  description: String,
  topics: [String],
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

// Curriculum Schema (Main) — small metadata doc; content lives in Course docs
const CurriculumSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Full Stack Ocean — Computer Science'
  },
  description: String,
  source: String, // repo the curriculum is aligned with
  version: {
    type: String,
    default: '4.0.0'
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
