#!/bin/bash

# Full Stack Ocean - Setup Script
# This script sets up the development environment

set -e

echo "🌊 Full Stack Ocean - Setup Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f2 | cut -d '.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version $NODE_VERSION detected. Version 18+ is recommended."
fi

echo "✅ Node.js $(node -v) detected"

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB or use Docker."
    echo "   You can skip this if using Docker setup."
fi

# Setup backend
echo ""
echo "🔧 Setting up backend..."
cd backend

echo "📦 Installing backend dependencies..."
npm install

# Copy env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your configuration."
fi

echo "✅ Backend setup complete"
cd ..

# Setup frontend
echo ""
echo "🎨 Setting up frontend..."
cd frontend

echo "📦 Installing frontend dependencies..."
npm install

# Create .env file for frontend
if [ ! -f .env ]; then
    echo "📄 Creating .env file for frontend..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
    echo "REACT_APP_APP_NAME=Full Stack Ocean" >> .env
fi

echo "✅ Frontend setup complete"
cd ..

# Optional: Seed database
echo ""
echo "🌱 Would you like to seed the database with curriculum data?"
echo "   (Requires MongoDB to be running)"
read -p "Seed database now? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v mongod &> /dev/null; then
        echo "Starting MongoDB..."
        mkdir -p /tmp/data-db
        mongod --fork --logpath /tmp/mongod.log --dbpath /tmp/data-db || true
        sleep 2
    fi
    
    cd backend
    echo "Seeding database..."
    node seeds/seed.js
    cd ..
fi

echo ""
echo "=================================="
echo "🎉 Setup Complete!"
echo ""
echo "To start the application:"
echo ""
echo "Option 1 - Using Docker:"
echo "  cd /home/azureuser/full-stack-ocean"
echo "  docker-compose up --build"
echo ""
echo "Option 2 - Manual startup:"
echo "  Terminal 1 (Backend):"
echo "  cd /home/azureuser/full-stack-ocean/backend"
echo "  npm run dev"
echo ""
echo "  Terminal 2 (Frontend):"
echo "  cd /home/azureuser/full-stack-ocean/frontend"
echo "  npm start"
echo ""
echo "Option 3 - Quick dev script:"
echo "  (This runs both servers concurrently)"
echo "  cd /home/azureuser/full-stack-ocean"
echo "  ./dev.sh"
echo ""
echo "The app will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "=================================="