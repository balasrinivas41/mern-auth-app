# =============================================================================
# Frontend Dockerfile for MERN Authentication Application
# =============================================================================
#
# Multi-stage Dockerfile for React frontend application.
# Stage 1: Build the React application
# Stage 2: Serve the built app using Nginx
#
# Why multi-stage builds?
# - Smaller final image (no build tools in production)
# - Better security (no source code in final image)
# - Faster deployment and container startup
# =============================================================================

# =============================================================================
# STAGE 1: Build Stage
# =============================================================================
# This stage compiles the React application and creates optimized static files

# Use Node.js Alpine image for building
# Why Alpine? Smaller base image for faster builds
FROM node:18-alpine as build

# Set working directory for build process
WORKDIR /app

# Copy package files first for better layer caching
# This allows Docker to cache dependency installation if package.json unchanged
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
# Why --silent? Reduces build output noise
# Why npm ci? Faster, more reliable than npm install for production builds
RUN npm ci --silent

# Copy application source code
# Done after dependency installation for optimal caching
COPY . .

# Accept build-time arguments for environment configuration
# This allows passing API URL at build time for different environments
ARG REACT_APP_API_URL=http://localhost:5000

# Convert build argument to environment variable
# React apps read environment variables at build time, not runtime
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React application for production
# Creates optimized static files in /app/build directory
# - Minifies JavaScript and CSS
# - Optimizes images
# - Creates production-ready bundle
RUN npm run build

# =============================================================================
# STAGE 2: Production Stage
# =============================================================================
# This stage serves the built React app using Nginx web server

# Use official Nginx Alpine image for serving static files
# Why Nginx? High-performance web server, perfect for serving static files
# Why Alpine? Smaller image size for production deployment
FROM nginx:alpine

# Copy built React application from build stage
# --from=build specifies the source stage
# /usr/share/nginx/html is the default Nginx document root
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
# This configures Nginx for Single Page Application (SPA) routing
COPY nginx.conf /etc/nginx/nginx.conf

# =============================================================================
# Network Configuration
# =============================================================================

# Expose port 80 for HTTP traffic
# This is the default HTTP port for web servers
EXPOSE 80

# =============================================================================
# Application Startup
# =============================================================================

# Start Nginx in foreground mode
# -g "daemon off;" prevents Nginx from running as background daemon
# This is required for Docker containers (must run in foreground)
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# Build and Run Instructions:
# =============================================================================
#
# Build with custom API URL:
#   docker build --build-arg REACT_APP_API_URL=https://api.example.com -t mern-auth-frontend .
#
# Build with default API URL:
#   docker build -t mern-auth-frontend .
#
# Run container:
#   docker run -p 3001:80 mern-auth-frontend
#
# Access application:
#   http://localhost:3001
#
# =============================================================================
#
# Production Considerations:
# - The API URL is baked into the build at build time
# - For different environments, build separate images with appropriate API URLs
# - Consider using environment-specific docker-compose files
# - Implement proper SSL/TLS termination for production deployments
#
# =============================================================================