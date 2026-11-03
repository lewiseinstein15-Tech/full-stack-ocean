const express = require('express');
const { Curriculum, Course } = require('../models/Curriculum');
const Book = require('../models/Book');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/curriculum
// @desc    Get the curriculum: sections with their courses (self-paced, no dates)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const curriculum = await Curriculum.findOne({ isActive: true })
      .populate('terms.courses', 'courseCode title description section url altUrl provider duration effort prerequisites notes order')
      .select('-createdBy');

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'No active curriculum found'
      });
    }

    res.json({
      success: true,
      curriculum: {
        title: curriculum.title,
        description: curriculum.description,
        source: curriculum.source,
        version: curriculum.version,
        sections: (curriculum.terms || []).map((t) => ({
          termNumber: t.termNumber,
          key: t.key,
          title: t.title,
          description: t.description,
          topics: t.topics,
          courses: t.courses
        }))
      }
    });
  } catch (error) {
    console.error('Get curricula error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/books
// @desc    Get the Great Readings bookshelf, grouped by category
// @access  Public
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ category: 1, order: 1 }).lean();
    const grouped = {};
    for (const b of books) {
      (grouped[b.category] = grouped[b.category] || []).push(b);
    }
    res.json({
      success: true,
      count: books.length,
      categories: Object.keys(grouped),
      books
    });
  } catch (error) {
    console.error('Get books error:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/curriculum/lessons
// @desc    Get all study items from all courses (flat list, curriculum order)
// @access  Public
router.get('/lessons', async (req, res) => {
  try {
    const docs = await Course.find().sort({ section: 1, order: 1 }).lean();
    const lessons = [];
    for (const doc of docs) {
      for (const [mi, mod] of (doc.modules || []).entries()) {
        for (const item of mod.items || []) {
          const m = item.materials || {};
          lessons.push({
            slug: item.slug,
            title: item.title,
            description: item.description || null,
            duration: item.duration || 90,
            order: item.order,
            kind: item.kind || 'lecture',
            isReview: Boolean(item.isReview),
            course: doc.courseCode,
            courseTitle: doc.title,
            module: mod.title,
            moduleIndex: mi,
            materials: {
              videoId: m.videoId || null,
              videoTitle: m.videoTitle || null,
              slidesUrl: m.slidesUrl || null,
              transcriptUrl: m.transcriptUrl || null,
              readingUrl: m.readingUrl || null,
              practiceUrl: m.practiceUrl || null,
              externalUrl: item.url || m.externalUrl || null,
            },
            hasVideo: Boolean(m.videoId),
            hasPractice: Boolean(m.practiceUrl)
          });
        }
      }
    }
    res.json({ success: true, count: lessons.length, lessons });
  } catch (error) {
    console.error('Get lessons error:', error.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/curriculum/lesson/:slug
// @desc    Get a single study item (with its course + module context)
// @access  Public
router.get('/lesson/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ 'modules.items.slug': req.params.slug }).lean();
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Lesson not found'
      });
    }

    for (const mod of course.modules || []) {
      const item = (mod.items || []).find((l) => l.slug === req.params.slug);
      if (item) {
        return res.json({
          success: true,
          lesson: {
            ...item,
            metadata: { course: course.courseCode, ...(item.metadata || {}) }
          },
          context: {
            course: {
              courseCode: course.courseCode,
              title: course.title,
              url: course.url
            },
            module: {
              title: mod.title,
              description: mod.description
            }
          }
        });
      }
    }
    return res.status(404).json({ success: false, error: 'Lesson not found' });
  } catch (error) {
    console.error('Get lesson error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/course/:courseCode
// @desc    Get course details including all modules and items
// @access  Public
router.get('/course/:courseCode', async (req, res) => {
  try {
    const course = await Course.findOne({
      courseCode: req.params.courseCode.toUpperCase()
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/curriculum
// @desc    Create new curriculum (admin only)
// @access  Private/Admin
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const curriculum = await Curriculum.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      curriculum
    });
  } catch (error) {
    console.error('Create curriculum error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;
