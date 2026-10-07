const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { username, email, password, firstName, lastName } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with that email or username'
      });
    }

    // Create user
    user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if user exists (include password field)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account has been deactivated'
      });
    }

    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last active
    user.progress.lastActive = new Date();
    await user.save();

    // Create token
    const token = user.getSignedJwtToken();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        preferences: user.preferences,
        progress: user.progress
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/auth/logout
// @desc    Logout user
// @access  Private
router.get('/logout', require('../middleware/auth'), (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @route   POST /api/auth/forgotpassword
// @desc    Forgot password
// @access  Public
router.post('/forgotpassword', [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'No user found with that email'
      });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // In production, send this via email
    res.json({
      success: true,
      message: 'Password reset token generated',
      resetToken // Remove in production - send via email
    });
  } catch (error) {
    console.error('Forgot password error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/auth/resetpassword/:resettoken
// @desc    Reset password
// @access  Public
router.post('/resetpassword/:resettoken', async (req, res) => {
  try {
    const { password } = req.body;
    const { resettoken } = req.params;

    // Hash token and compare
    const hashedToken = crypto
      .createHash('sha256')
      .update(resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired reset token'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;