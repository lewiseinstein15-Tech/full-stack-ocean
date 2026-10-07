#!/bin/bash
# Full Stack Ocean - Development Script
# Run both frontend and backend concurrently

cd /home/azureuser/full-stack-ocean

# Run backend in background
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Run frontend
echo "Starting frontend server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait