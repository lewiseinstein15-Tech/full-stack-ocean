# Full Stack Ocean - Setup Guide

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB (for local development) or Docker

## Option 1: Quick Setup (Docker - Recommended)

The fastest way to get started is using Docker:

```bash
# Clone and enter the directory
cd /home/azureuser/full-stack-ocean

# Build and start all services
docker-compose up --build -d

# Wait for services to be ready, then seed the database
docker-compose exec backend node seeds/seed.js

# Access the app:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:5000
# - MongoDB: mongodb://localhost:27017
```

## Option 2: Manual Setup (Development)

### Backend Setup

```bash
cd /home/azureuser/full-stack-ocean/backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Required: MONGO_URI, JWT_SECRET

# Start the backend server
npm run dev

# In another terminal, seed the database
node seeds/seed.js
```

### Frontend Setup

```bash
cd /home/azureuser/full-stack-ocean/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Access the app:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/fullstackocean
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Full Stack Ocean
```

## Quick Start Script

For quick local development (requires Node.js and MongoDB running):

```bash
cd /home/azureuser/full-stack-ocean
chmod +x setup.sh dev.sh

# First time setup
./setup.sh

# Start development servers
./dev.sh
```

## Project Structure

```
full-stack-ocean/
├── backend/
│   ├── server.js          # Entry point
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   └── Curriculum.js
│   ├── routes/            # Express routes
│   │   ├── auth.js
│   │   ├── curriculum.js
│   │   ├── progress.js
│   │   └── user.js
│   ├── middleware/        # Auth middleware
│   │   └── auth.js
│   ├── seeds/             # Database seeders
│   │   ├── seed.js
│   │   └── curriculumData.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/            # Static assets
│   │   └── index.html
│   ├── src/
│   │   ├── pages/         # React components
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Today.js
│   │   │   ├── Courses.js
│   │   │   ├── CourseDetail.js
│   │   │   ├── WeekView.js
│   │   │   ├── Practice.js
│   │   │   ├── Progress.js
│   │   │   ├── Profile.js
│   │   │   └── auth/
│   │   │       ├── Login.js
│   │   │       ├── Register.js
│   │   │       └── ForgotPassword.js
│   │   ├── components/    # Reusable components
│   │   │   └── layout/
│   │   │       ├── Header.js
│   │   │       ├── Footer.js
│   │   │       ├── Layout.js
│   │   │       └── AuthLayout.js
│   │   ├── contexts/     # React contexts
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   └── package.json
├── docker-compose.yml
├── setup.sh
├── dev.sh
├── README.md
└── .gitignore
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/logout` - Logout user (protected)
- `POST /api/auth/forgotpassword` - Forgot password
- `POST /api/auth/resetpassword/:resettoken` - Reset password

### Curriculum
- `GET /api/curriculum` - Get all curricula
- `GET /api/curriculum/:id` - Get specific curriculum
- `GET /api/curriculum/today` - Get today's lessons (protected)
- `GET /api/curriculum/course/:courseCode` - Get course details
- `POST /api/curriculum` - Create curriculum (admin)
- `PUT /api/curriculum/:id` - Update curriculum (admin)
- `DELETE /api/curriculum/:id` - Delete curriculum (admin)

### Progress
- `GET /api/progress` - Get user progress (protected)
- `POST /progress/lesson/:lessonId/complete` - Mark lesson complete (protected)
- `DELETE /progress/lesson/:lessonId/complete` - Unmark lesson (protected)
- `GET /progress/check/:lessonId` - Check lesson completion (protected)
- `GET /progress/history` - Get progress history (protected)
- `POST /progress/achievement` - Add achievement (protected)
- `PUT /progress/preferences` - Update preferences (protected)

### User
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update profile (protected)
- `PUT /api/user/password` - Update password (protected)
- `DELETE /api/user/account` - Delete account (protected)

## Features

### Frontend
- ✅ Responsive design with Tailwind CSS
- ✅ Dark/light/system theme support
- ✅ Interactive weekly calendar view
- ✅ Daily lesson tracking
- ✅ Progress statistics
- ✅ Achievement system
- ✅ Practice problem browser
- ✅ Course detail pages
- ✅ User authentication
- ✅ Mobile-friendly navigation

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ MongoDB with Mongoose ODM
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ User preferences
- ✅ Curriculum management
- ✅ Link validation for external resources
- ✅ Progress tracking with streaks

## Deployment

For production deployment:

```bash
# Build frontend
cd frontend
npm run build

# Set environment variables
cp ../backend/.env.example ../backend/.env
# Edit .env for production values

# Start backend
cd ../backend
npm start

# Serve frontend with production server (nginx, serve, etc.)
npx serve -s build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --config /usr/local/etc/mongod.conf`
- Check the `MONGO_URI` in `.env` file
- For Docker, MongoDB is included in the compose file

### Port Conflicts
- Frontend: Change `PORT=3000` in `frontend/.env`
- Backend: Change `PORT=5000` in `backend/.env`

### CORS Issues
- Check that the backend CORS configuration allows your frontend origin
- Update the `origin` in `backend/server.js` if needed

## License

MIT License - see LICENSE file for details.