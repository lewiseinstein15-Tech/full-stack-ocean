const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const curriculumRoutes = require('./routes/curriculum');
const progressRoutes = require('./routes/progress');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Initialize app
const app = express();

// Connect to MongoDB - with short timeout and graceful failure
if (process.env.MONGO_URI) {
  console.log('Connecting to MongoDB...');
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      console.log('Continuing without MongoDB - API will still respond');
    });
} else {
  console.log('No MongoDB URI provided - running in standalone mode');
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Full Stack Ocean API!',
    version: '1.0.0',
    status: 'active'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/user', userRoutes);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = app;
