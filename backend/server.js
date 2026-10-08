const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Trust proxy for Render (needed for rate limiting and correct IPs)
app.set('trust proxy', 1);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;

console.log('Environment variables loaded:');
console.log(`- MONGO_URI is set: ${!!mongoUri}`);
if (mongoUri) {
  console.log(`- MONGO_URI length: ${mongoUri.length}`);
  // Check if it looks like a MongoDB URI without exposing credentials
  if (mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://')) {
    console.log('- MONGO_URI appears to be a valid MongoDB connection string');
  } else {
    console.warn('- MONGO_URI does not look like a standard MongoDB URI');
  }
} else {
  console.warn('- MONGO_URI is not set!');
}

async function connectDB() {
  if (!mongoUri || mongoUri.includes('placeholder') || mongoUri.trim() === '') {
    console.warn('No valid MongoDB URI provided - running without database');
    return;
  }
  try {
    await mongoose.connect(mongoUri, {
      // Removed deprecated options: useNewUrlParser, useUnifiedTopology
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      maxPoolSize: 10,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Continuing without MongoDB');
  }
}

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate limiting - now works with trust proxy
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbReady ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Full Stack Ocean API!',
    version: '1.0.0',
    status: 'active'
  });
});

// Import routes
const curriculumRoutes = require('./routes/curriculum');
const progressRoutes = require('./routes/progress');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const jobsRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jobs', jobsRoutes);

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
const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on port ${PORT}`);
  });
};

startServer();

module.exports = app;
