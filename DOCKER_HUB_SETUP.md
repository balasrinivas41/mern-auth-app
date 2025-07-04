# Docker Hub Setup and Deployment Guide

## Prerequisites

1. **Docker Hub Account**: Create an account at [hub.docker.com](https://hub.docker.com)
2. **Docker Installed**: Ensure Docker is installed and running

## Step 1: Login to Docker Hub

```bash
# Login to Docker Hub (you'll be prompted for username and password)
docker login

# Alternative: Login with username directly
docker login -u balasrinivasdevanaboyina
```

## Step 2: Push Images to Docker Hub

The images are already built and tagged. Push them to Docker Hub:

```bash
# Push backend image
docker push balasrinivasdevanaboyina/mern-auth-backend:latest
docker push balasrinivasdevanaboyina/mern-auth-backend:v1.0

# Push frontend image
docker push balasrinivasdevanaboyina/mern-auth-frontend:latest
docker push balasrinivasdevanaboyina/mern-auth-frontend:v1.0
```

## Step 3: Verify Images on Docker Hub

After pushing, verify the images are available:
- Backend: https://hub.docker.com/r/balasrinivasdevanaboyina/mern-auth-backend
- Frontend: https://hub.docker.com/r/balasrinivasdevanaboyina/mern-auth-frontend

## Step 4: Test Deployment from Docker Hub

```bash
# Test using the production compose file
docker compose -f docker-compose.hub.yml up -d

# Check status
docker compose -f docker-compose.hub.yml ps

# View logs
docker compose -f docker-compose.hub.yml logs -f

# Clean up
docker compose -f docker-compose.hub.yml down
```

## For End Users (After Publishing)

Once images are on Docker Hub, anyone can run your MERN app with:

```bash
# Download the docker-compose.hub.yml file
curl -O https://raw.githubusercontent.com/balasrinivas41/mern-auth-app/main/docker-compose.hub.yml

# Start the application
docker compose -f docker-compose.hub.yml up -d

# Access the application
# Frontend: http://localhost:3001
# Backend: http://localhost:5000
```

## Docker Hub Repository Settings

1. **Repository Description**: "Full-stack MERN authentication app with JWT, bcrypt, and Docker containerization"
2. **Tags**: 
   - `latest` - Latest stable version
   - `v1.0` - Version 1.0 release
3. **README**: Link to your GitHub repository for documentation

## Image Information

- **Backend Image**: `balasrinivasdevanaboyina/mern-auth-backend`
  - Base: `node:18-alpine`
  - Size: ~171MB
  - Features: Express.js, MongoDB, JWT, bcrypt, health checks

- **Frontend Image**: `balasrinivasdevanaboyina/mern-auth-frontend`
  - Base: `nginx:alpine` 
  - Size: ~54MB
  - Features: React, TypeScript, responsive design

## Security Note

⚠️ **Important**: Change the JWT_SECRET in production deployments:

```yaml
environment:
  JWT_SECRET: your_actual_secure_secret_key_here
```