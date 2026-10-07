const express = require('express');
const { Curriculum, Course } = require('../models/Curriculum');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/curriculum
// @desc    Get all curricula
// @access  Public
router.get('/', async (req, res) => {
  try {
    const curricula = await Curriculum.find({ isActive: true })
      .populate('terms.courses', 'courseCode title description')
      .select('-terms.weeks.days.lessons');

    res.json({
      success: true,
      count: curricula.length,
      curricula
    });
  } catch (error) {
    console.error('Get curricula error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/today
// @desc    Get today's lessons
// @access  Private
router.get('/today', protect, async (req, res) => {
  try {
    // Find the active curriculum
    const curriculum = await Curriculum.findOne({ isActive: true });

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'No active curriculum found'
      });
    }

    // Get today's date
    const today = new Date();
    const todayString = today.toDateString();

    // Find today's day in any term/week
    let todayLessons = null;
    
    for (const term of curriculum.terms) {
      for (const week of term.weeks) {
        for (const day of week.days) {
          const dayDate = new Date(day.date);
          if (dayDate.toDateString() === todayString) {
            todayLessons = {
              term: term.termNumber,
              week: week.weekNumber,
              date: day.date,
              dayOfWeek: day.dayOfWeek,
              lessons: day.lessons,
              isReviewDay: day.isReviewDay,
              reviewNotes: day.reviewNotes,
              courses: term.courses
            };
            break;
          }
        }
        if (todayLessons) break;
      }
      if (todayLessons) break;
    }

    // If no lessons for today (future or not scheduled), find the next upcoming lessons
    if (!todayLessons) {
      for (const term of curriculum.terms) {
        for (const week of term.weeks) {
          for (const day of week.days) {
            const dayDate = new Date(day.date);
            if (dayDate > today) {
              todayLessons = {
                term: term.termNumber,
                week: week.weekNumber,
                date: day.date,
                dayOfWeek: day.dayOfWeek,
                lessons: day.lessons,
                isReviewDay: day.isReviewDay,
                reviewNotes: day.reviewNotes,
                courses: term.courses,
                upcoming: true
              };
              break;
            }
          }
          if (todayLessons) break;
        }
        if (todayLessons) break;
      }
    }

    res.json({
      success: true,
      today: todayLessons
    });
  } catch (error) {
    console.error('Get today error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/:id
// @desc    Get single curriculum with full details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id)
      .populate('terms.courses', 'courseCode title description')
      .populate('createdBy', 'username firstName lastName');

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'Curriculum not found'
      });
    }

    // Filter out terms that are not active or in the past based on query params
    const { term, week, day, date } = req.query;
    
    let result = { ...curriculum.toObject() };

    if (term) {
      result.terms = result.terms.filter(t => t.termNumber === parseInt(term));
    }

    if (week) {
      result.terms = result.terms.map(t => ({
        ...t,
        weeks: t.weeks.filter(w => w.weekNumber === parseInt(week))
      }));
    }

    if (day) {
      result.terms = result.terms.map(t => ({
        ...t,
        weeks: t.weeks.map(w => ({
          ...w,
          days: w.days.filter(d => d.dayOfWeek === day)
        }))
      }));
    }

    if (date) {
      const targetDate = new Date(date);
      result.terms = result.terms.map(t => ({
        ...t,
        weeks: t.weeks.map(w => ({
          ...w,
          days: w.days.filter(d => {
            const dayDate = new Date(d.date);
            return dayDate.toDateString() === targetDate.toDateString();
          })
        }))
      }));
    }

    res.json({
      success: true,
      curriculum: result
    });
  } catch (error) {
    console.error('Get curriculum error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid curriculum ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/:curriculumId/term/:termId
// @desc    Get a specific term with weeks
// @access  Public
router.get('/:curriculumId/term/:termId', async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.curriculumId)
      .populate('terms.courses');

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'Curriculum not found'
      });
    }

    const term = curriculum.terms.id(req.params.termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        error: 'Term not found'
      });
    }

    res.json({
      success: true,
      term
    });
  } catch (error) {
    console.error('Get term error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/curriculum/:curriculumId/week/:weekId
// @desc    Get a specific week with full day details
// @access  Public
router.get('/:curriculumId/term/:termId/week/:weekId', async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.curriculumId)
      .populate('terms.courses');

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'Curriculum not found'
      });
    }

    const term = curriculum.terms.id(req.params.termId);
    if (!term) {
      return res.status(404).json({
        success: false,
        error: 'Term not found'
      });
    }

    const week = term.weeks.id(req.params.weekId);
    if (!week) {
      return res.status(404).json({
        success: false,
        error: 'Week not found'
      });
    }

    res.json({
      success: true,
      week
    });
  } catch (error) {
    console.error('Get week error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});


// @route   GET /api/curriculum/course/:courseCode
// @desc    Get course details
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

// @route   PUT /api/curriculum/:id
// @desc    Update curriculum (admin only)
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    let curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'Curriculum not found'
      });
    }

    curriculum = await Curriculum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      curriculum
    });
  } catch (error) {
    console.error('Update curriculum error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/curriculum/:id
// @desc    Delete curriculum (admin only)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        error: 'Curriculum not found'
      });
    }

    await curriculum.deleteOne();

    res.json({
      success: true,
      message: 'Curriculum deleted successfully'
    });
  } catch (error) {
    console.error('Delete curriculum error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;