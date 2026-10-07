const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      reminderTime: {
        type: String,
        default: '08:00'
      }
    },
    dailyGoal: {
      type: Number,
      default: 2 // hours per day
    }
  },
  progress: {
    currentTerm: {
      type: Number,
      default: 1
    },
    currentWeek: {
      type: Number,
      default: 1
    },
    streak: {
      type: Number,
      default: 0
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curriculum'
    }],
    totalHours: {
      type: Number,
      default: 0
    },
    achievements: [String]
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_ROUNDS) || 12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Update 'updatedAt' field on save
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPassword field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Generate email verification token
UserSchema.methods.getEmailVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');

  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Update streak logic
UserSchema.methods.updateStreak = function() {
  const now = new Date();
  const lastActive = new Date(this.progress.lastActive);
  const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    this.progress.streak += 1;
  } else if (diffDays > 1) {
    this.progress.streak = 0;
  }

  this.progress.lastActive = now;
};

// Check if user has completed lesson
UserSchema.methods.hasCompletedLesson = function(lessonId) {
  return this.progress.completedLessons.includes(lessonId);
};

// Add completed lesson
UserSchema.methods.addCompletedLesson = function(lessonId, hours = 1.5) {
  if (!this.progress.completedLessons.includes(lessonId)) {
    this.progress.completedLessons.push(lessonId);
    this.progress.totalHours += hours;
    this.updateStreak();
  }
};

// Remove completed lesson (uncomplete)
UserSchema.methods.removeCompletedLesson = function(lessonId, hours = 1.5) {
  const index = this.progress.completedLessons.indexOf(lessonId);
  if (index > -1) {
    this.progress.completedLessons.splice(index, 1);
    this.progress.totalHours = Math.max(0, this.progress.totalHours - hours);
  }
};

module.exports = mongoose.model('User', UserSchema);