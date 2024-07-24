# Use Node.js image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json /app/
COPY tailwind*.js /app/
COPY tsconfig*.json /app/

# Install dependencies
RUN npm install --force
#RUN npm install

# Copy the rest of the application code
COPY src /app/src
COPY public /app/public


# Build production app
RUN npm run build 

FROM nginx:stable-alpine

# Copy the built React app from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000/tcp
CMD ["nginx", "-g", "daemon off;"]