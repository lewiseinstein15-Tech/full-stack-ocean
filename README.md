# Full Stack Ocean - Ultimate Daily Study Platform

🌊 **Interactive web application transforming the MIT OCW curriculum into an engaging daily study experience.**

## Quick Start (Docker)

```bash
cd /home/azureuser/full-stack-ocean
docker-compose up --build -d
docker-compose exec backend node seeds/seed.js
```

Access at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Quick Start (Manual)

```bash
# Terminal 1 - Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Terminal 2 - Seed database
cd backend
node seeds/seed.js

# Terminal 3 - Frontend
cd frontend
npm install
npm start
```

## Deployment

### Deploy to Render (Free Tier)

1. Create a [Render account](https://render.com/)
2. Create a new Web Service for the backend:
   - Connect your repository
   - Environment: Node.js
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables:
     - `MONGO_URI`: Use MongoDB Atlas connection string
     - `JWT_SECRET`: Generate a secure secret
     - `NODE_ENV`: `production`

3. Create a new Static Site for the frontend:
   - Connect your repository
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
   - Add environment variable:
     - `REACT_APP_API_URL`: Your backend URL

### Deploy to Vercel + Railway

1. Backend on Railway:
```bash
npm i -g railway
railway init
railway up
```

2. Frontend on Vercel:
```bash
npm i -g vercel
cd frontend
vercel
```

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router, React Icons, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose ODM)
- **Authentication**: JWT, Bcrypt password hashing
- **Deployment**: Docker, Docker Compose, Nginx, Render-ready

## Features

- 📅 Interactive daily calendar with MIT OCW curriculum
- 🎯 Progress tracking with streaks and achievements
- 🌓 Dark/light/system theme support
- 📱 Fully responsive design
- 🔐 JWT authentication with password reset
- 📊 Learning statistics dashboard
- 🔍 Practice problems browser
- 🏆 Achievement system
- 🔗 Clickable lecture videos and practice links
- 🌊 Sunday review day highlighting

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/forgotpassword` - Forgot password
- `POST /api/auth/resetpassword/:resettoken` - Reset password

### Curriculum
- `GET /api/curriculum` - Get all curricula
- `GET /api/curriculum/today` - Get today's lessons (protected)
- `POST /api/curriculum` - Create curriculum (admin)

### Progress
- `GET /api/progress` - Get user progress (protected)
- `POST /api/progress/lesson/:lessonId/complete` - Mark lesson complete (protected)

## Project Structure

```
full-stack-ocean/
├── backend/
│   ├── server.js
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── middleware/     # Auth middleware
│   ├── seeds/          # Database seeders
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── pages/      # React page components
│   │   ├── components/ # Reusable components
│   │   ├── contexts/   # React contexts
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── SETUP_GUIDE.md
└── README.md
```

## Documentation

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup and deployment instructions.

## License

MIT