const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Protect route - verify JWT token
// @access  Private
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies (optional, if using cookie-based auth)
  // else if (req.cookies && req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists'
      });
    }

    // Check if user was deleted/deactivated after token was issued
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'User account is deactivated'
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// @desc    Authorize - check user role
// @access  Private (with role requirement)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized - user not found'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// @desc    Async handler wrapper to catch errors
// @access  Utility
exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Validate ObjectId
// @access  Utility
exports.validateObjectId = (req, res, next) => {
  if (!req.params.id || !require('mongoose').Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  next();
};

// @desc    Send error response
// @access  Utility
exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for debugging
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new Error(message);
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new Error(message);
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new Error(message);
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};