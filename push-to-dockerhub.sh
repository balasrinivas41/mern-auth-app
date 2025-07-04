#!/bin/bash

# MERN Authentication App - Docker Hub Push Script
# Run this script to push images to Docker Hub

set -e  # Exit on any error

echo "🚀 MERN Authentication App - Docker Hub Deployment"
echo "=================================================="
echo ""

# Check if images exist
echo "📦 Checking if Docker images are built..."
if ! docker images | grep -q "balasrinivas41/mern-auth-backend"; then
    echo "❌ Backend image not found. Please build images first."
    exit 1
fi

if ! docker images | grep -q "balasrinivas41/mern-auth-frontend"; then
    echo "❌ Frontend image not found. Please build images first."
    exit 1
fi

echo "✅ Docker images found:"
docker images | grep balasrinivas41
echo ""

# Login to Docker Hub
echo "🔐 Logging in to Docker Hub..."
echo "Enter your Docker Hub credentials:"
docker login -u balasrinivas41

if [ $? -ne 0 ]; then
    echo "❌ Docker Hub login failed. Please check your credentials."
    exit 1
fi

echo "✅ Successfully logged in to Docker Hub!"
echo ""

# Push backend images
echo "📤 Pushing backend images to Docker Hub..."
echo "Pushing balasrinivas41/mern-auth-backend:latest..."
docker push balasrinivas41/mern-auth-backend:latest

echo "Pushing balasrinivas41/mern-auth-backend:v1.0..."
docker push balasrinivas41/mern-auth-backend:v1.0

echo "✅ Backend images pushed successfully!"
echo ""

# Push frontend images
echo "📤 Pushing frontend images to Docker Hub..."
echo "Pushing balasrinivas41/mern-auth-frontend:latest..."
docker push balasrinivas41/mern-auth-frontend:latest

echo "Pushing balasrinivas41/mern-auth-frontend:v1.0..."
docker push balasrinivas41/mern-auth-frontend:v1.0

echo "✅ Frontend images pushed successfully!"
echo ""

# Show final status
echo "🎉 All images successfully pushed to Docker Hub!"
echo ""
echo "📍 Your Docker Hub repositories:"
echo "   Backend:  https://hub.docker.com/r/balasrinivas41/mern-auth-backend"
echo "   Frontend: https://hub.docker.com/r/balasrinivas41/mern-auth-frontend"
echo ""
echo "🚀 Anyone can now run your app with:"
echo "   curl -O https://raw.githubusercontent.com/balasrinivas41/mern-auth-app/main/docker-compose.hub.yml"
echo "   docker compose -f docker-compose.hub.yml up -d"
echo ""
echo "✨ Deployment complete! Your MERN app is now globally available!"