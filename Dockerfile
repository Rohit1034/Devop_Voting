# Stage 1: Build the React application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies (npm ci is preferred for CI/CD like Jenkins if package-lock is present)
RUN npm ci || npm install

# Copy the rest of your application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration to handle React Router
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage to Nginx's serving directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
