/**
 * MERN Authentication Backend Server
 * 
 * This is the main entry point for our Express.js backend server.
 * It handles authentication, database connections, and API routing.
 * 
 * Why we need this:
 * - Provides a secure API for user authentication
 * - Handles password hashing and JWT token generation
 * - Connects to MongoDB for data persistence
 * - Enables secure communication between frontend and database
 */

// Import required packages
const express = require('express'); // Web framework for Node.js - handles HTTP requests/responses
const mongoose = require('mongoose'); // MongoDB object modeling library - provides schema-based solution
const cors = require('cors'); // Cross-Origin Resource Sharing - allows frontend to communicate with backend
require('dotenv').config(); // Loads environment variables from .env file for security

// Create Express application instance
// Why Express? It's lightweight, flexible, and has excellent middleware support
const app = express();

/**
 * Middleware Configuration
 * 
 * Middleware functions execute during the request-response cycle.
 * They have access to request and response objects and can modify them.
 */

// Request logging middleware for debugging user interactions
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Unknown';
  
  console.log(`🔍 [${timestamp}] ${method} ${url}`);
  console.log(`   📱 User-Agent: ${userAgent}`);
  console.log(`   🌍 IP: ${ip}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    // Log request body but hide sensitive data
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) {
      sanitizedBody.password = '[HIDDEN]';
    }
    console.log(`   📦 Body:`, sanitizedBody);
  }
  
  next();
});

// Enable CORS for all routes
// Why: Allows our React frontend (localhost:3000/3001) to make requests to our API (localhost:5000)
// Without this, browsers would block cross-origin requests for security reasons
app.use(cors());

// Parse JSON request bodies
// Why: Enables our server to understand JSON data sent from the frontend
// This is essential for handling login/registration form data
app.use(express.json());

/**
 * Database Connection Setup
 * 
 * We use MongoDB because:
 * - It's NoSQL and flexible for user data
 * - Great for rapid development and prototyping
 * - Excellent integration with Node.js through Mongoose
 * - Scalable for future growth
 */

// Connect to MongoDB using connection string from environment variables
// Why environment variables? Keeps sensitive data like database URLs out of code
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,    // Use new MongoDB connection string parser
  useUnifiedTopology: true, // Use new unified topology engine for better connection handling
});

// Get the default connection and set up event listeners
const db = mongoose.connection;

// Handle connection errors
// Why: Provides immediate feedback if database connection fails
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Handle successful connection
// Why: Confirms database is ready to receive queries
db.once('open', () => {
  console.log('✅ Successfully connected to MongoDB');
});

/**
 * Route Configuration
 * 
 * We organize routes into separate modules for better code organization.
 * Each route module handles a specific area of functionality.
 */

// Authentication routes (register, login, etc.)
// Why separate auth routes? Keeps authentication logic organized and reusable
app.use('/api/auth', require('./routes/auth'));

/**
 * Health Check Endpoint
 * 
 * Essential for monitoring and Docker health checks.
 * Allows external services to verify our API is running properly.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'MERN Auth API'
  });
});

/**
 * Default Route
 * 
 * Provides a simple response for the root endpoint.
 * Useful for testing and confirming the API is accessible.
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Auth API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      health: '/health'
    }
  });
});

/**
 * Server Startup
 * 
 * Configure and start the HTTP server.
 */

// Use PORT from environment variables or default to 5000
// Why environment variables? Allows deployment platforms to set their own ports
const PORT = process.env.PORT || 5000;

// Start server on all network interfaces (0.0.0.0)
// Why 0.0.0.0? Makes server accessible from Docker containers and external connections
// Why not just localhost? localhost only allows local connections, not Docker inter-container communication
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
});