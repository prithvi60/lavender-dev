# Use Node.js image as base
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src /app/src
COPY public /app/public

# Build production app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
