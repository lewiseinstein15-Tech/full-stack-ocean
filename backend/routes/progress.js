const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/progress
 * @desc    Get user's progress overview
 * @access  Private
 */
router.get('/', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id)
      .select('progress preferences');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Calculate weekly summary
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Sunday
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // completedLessons are lesson slugs (strings)
    const weeklyLessons = user.progress.completedLessons.filter((slug) => typeof slug === 'string');

    res.json({
      success: true,
      progress: {
        currentTerm: user.progress.currentTerm,
        currentWeek: user.progress.currentWeek,
        streak: user.progress.streak,
        totalHours: user.progress.totalHours,
        lastActive: user.progress.lastActive,
        achievements: user.progress.achievements,
        weekly: {
          lessonsCompleted: weeklyLessons.length,
          completedSlugs: weeklyLessons,
          hoursLogged: Math.round((user.progress.totalHours || 0) * 10) / 10
        }
      }
    });
  } catch (error) {
    console.error('Get progress error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   POST /api/progress/lesson/:lessonId/complete
 * @desc    Mark a lesson as completed
 * @access  Private
 */
router.post('/lesson/:lessonId/complete', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { lessonId } = req.params;
    const hours = req.body.hours || 1.5;

    if (typeof hours !== 'number' || hours < 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hours value'
      });
    }

    user.addCompletedLesson(lessonId, hours);
    await user.save();

    res.json({
      success: true,
      message: 'Lesson marked as completed',
      progress: {
        streak: user.progress.streak,
        totalHours: user.progress.totalHours,
        completedCount: user.progress.completedLessons.length
      }
    });
  } catch (error) {
    console.error('Complete lesson error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   DELETE /api/progress/lesson/:lessonId/complete
 * @desc    Unmark a lesson as completed
 * @access  Private
 */
router.delete('/lesson/:lessonId/complete', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const { lessonId } = req.params;
    const hours = req.query.hours || 1.5;

    user.removeCompletedLesson(lessonId, parseFloat(hours));
    await user.save();

    res.json({
      success: true,
      message: 'Lesson unmarked',
      progress: {
        streak: user.progress.streak,
        totalHours: user.progress.totalHours,
        completedCount: user.progress.completedLessons.length
      }
    });
  } catch (error) {
    console.error('Uncomplete lesson error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   GET /api/progress/check/:lessonId
 * @desc    Check if a lesson is completed
 * @access  Private
 */
router.get('/check/:lessonId', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const { lessonId } = req.params;

    const hasCompleted = await User.exists({
      _id: req.user.id,
      'progress.completedLessons': lessonId
    });

    res.json({
      success: true,
      completed: !!hasCompleted
    });
  } catch (error) {
    console.error('Check lesson completion error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   GET /api/progress/history
 * @desc    Get user's progress history
 * @access  Private
 */
router.get('/history', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id)
      .populate('progress.completedLessons', 'order title description metadata')
      .select('progress');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      history: user.progress.completedLessons
        .filter(l => l !== null)
        .map(l => ({
          lessonId: l._id,
          title: l.title,
          description: l.description,
          course: l.metadata?.course,
          completedAt: l.createdAt
        }))
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    });
  } catch (error) {
    console.error('Get history error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   POST /api/progress/achievement
 * @desc    Add an achievement
 * @access  Private
 */
router.post('/achievement', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const { achievement } = req.body;

    if (!achievement) {
      return res.status(400).json({
        success: false,
        error: 'Achievement name is required'
      });
    }

    const user = await User.findById(req.user.id);
    
    if (!user.progress.achievements.includes(achievement)) {
      user.progress.achievements.push(achievement);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Achievement added',
      achievements: user.progress.achievements
    });
  } catch (error) {
    console.error('Add achievement error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

/**
 * @route   PUT /api/progress/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', require('../middleware/auth').protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const { preferences } = req.body;

    const user = await User.findById(req.user.id);

    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
      await user.save();
    }

    res.json({
      success: true,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;