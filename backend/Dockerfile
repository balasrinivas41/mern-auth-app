# =============================================================================
# Backend Dockerfile for MERN Authentication Application
# =============================================================================
#
# This Dockerfile creates a production-ready container for the Express.js backend.
# It follows Docker best practices for security, performance, and maintainability.
#
# Key Features:
# - Uses Alpine Linux for smaller image size
# - Runs as non-root user for security
# - Includes health checks for container monitoring
# - Optimized for production deployment
# =============================================================================

# Use official Node.js Alpine image as base
# Why Alpine? Smaller size (~5MB vs ~900MB for full Ubuntu)
# Why Node 18? LTS version with modern features and long-term support
FROM node:18-alpine

# Install curl for health check functionality
# Why curl? Needed for HTTP health checks in Docker/Kubernetes
# --no-cache prevents package index from being stored (smaller image)
RUN apk add --no-cache curl

# Set working directory inside the container
# Why /app? Standard convention for application directory
WORKDIR /app

# Copy package files first for better Docker layer caching
# Why copy package files first? Docker can cache dependency installation
# if package.json hasn't changed, speeding up subsequent builds
COPY package*.json ./

# Install only production dependencies
# Why --only=production? Excludes dev dependencies for smaller image
# Why npm ci? Faster, reliable installs for production (uses package-lock.json)
RUN npm ci --only=production

# Copy application source code
# This is done after dependency installation for better caching
COPY . .

# =============================================================================
# Security: Create and use non-root user
# =============================================================================
# Why non-root? Security best practice - limits potential damage if compromised
# This prevents privilege escalation attacks

# Create a system group for Node.js
RUN addgroup -g 1001 -S nodejs

# Create a system user in the nodejs group
RUN adduser -S nodejs -u 1001

# Change ownership of app directory to nodejs user
# This ensures the nodejs user can read/write application files
RUN chown -R nodejs:nodejs /app

# Switch to non-root user for running the application
USER nodejs

# =============================================================================
# Network Configuration
# =============================================================================

# Expose port 5000 for external access
# This documents which port the container listens on
# The actual port mapping is handled by docker-compose.yml
EXPOSE 5000

# =============================================================================
# Health Check Configuration
# =============================================================================
# Health checks allow Docker/Kubernetes to monitor container health
# and restart unhealthy containers automatically

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Health check parameters explained:
# --interval=30s:     Check every 30 seconds
# --timeout=3s:       Fail if check takes longer than 3 seconds
# --start-period=5s:  Wait 5 seconds before first check (app startup time)
# --retries=3:        Consider unhealthy after 3 consecutive failures

# =============================================================================
# Application Startup
# =============================================================================

# Start the Express.js application
# Why npm start? Uses the start script defined in package.json
# This allows flexibility in how the app is started
CMD ["npm", "start"]

# =============================================================================
# Build and Run Instructions:
# =============================================================================
#
# Build image:
#   docker build -t mern-auth-backend .
#
# Run container:
#   docker run -p 5000:5000 mern-auth-backend
#
# Check health:
#   docker exec <container-id> curl http://localhost:5000/health
#
# =============================================================================