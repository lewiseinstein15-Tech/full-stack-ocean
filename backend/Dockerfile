# Backend Dockerfile
# Use a single-stage build for reliability

FROM node:21-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . ./

# Create .env if it doesn't exist
RUN echo "NODE_ENV=production" > .env && \
    echo "PORT=5000" >> .env

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "server.js"]