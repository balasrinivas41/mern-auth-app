/**
 * Authentication Routes for MERN Auth Application
 * 
 * This file contains all authentication-related API endpoints.
 * It handles user registration, login, and JWT token generation.
 * 
 * Why we need this:
 * - Provides secure user registration and login endpoints
 * - Handles JWT token creation for session management
 * - Validates user input and credentials
 * - Manages authentication errors and responses
 */

const express = require('express');    // Web framework for creating routes
const jwt = require('jsonwebtoken');   // Library for creating and verifying JWT tokens
const User = require('../models/User'); // User model for database operations
const router = express.Router();       // Create a router instance for organizing routes

/**
 * POST /api/auth/register
 * 
 * User Registration Endpoint
 * 
 * This endpoint allows new users to create an account.
 * It validates input, checks for existing users, creates new user,
 * and returns a JWT token for immediate authentication.
 * 
 * Why we need registration:
 * - Allows new users to join the platform
 * - Creates secure user accounts with hashed passwords
 * - Provides immediate authentication after registration
 */
router.post('/register', async (req, res) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`🚀 [${requestId}] Registration attempt started for username: ${req.body.username}`);
  
  try {
    // Extract username and password from request body
    // Destructuring makes the code cleaner and more readable
    const { username, password } = req.body;

    // Input validation - ensure both fields are provided
    // Why validate? Prevents incomplete registrations and database errors
    if (!username || !password) {
      console.log(`❌ [${requestId}] Registration failed: Missing fields`);
      return res.status(400).json({ 
        message: 'Username and password are required',
        error: 'MISSING_FIELDS'
      });
    }

    // Check if username already exists in the database
    // Why check? Prevents duplicate usernames and ensures uniqueness
    console.log(`🔍 [${requestId}] Checking if username exists...`);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`❌ [${requestId}] Registration failed: Username already exists`);
      return res.status(400).json({ 
        message: 'Username already exists',
        error: 'DUPLICATE_USERNAME'
      });
    }

    // Create new user instance
    // The password will be automatically hashed by the User model's pre-save middleware
    console.log(`💾 [${requestId}] Creating new user...`);
    const user = new User({ username, password });
    await user.save();
    console.log(`✅ [${requestId}] User created successfully with ID: ${user._id}`);

    // Generate JWT token for the new user
    // Why JWT? Stateless authentication that doesn't require server-side sessions
    // Token contains user info and expires in 24 hours for security
    const token = jwt.sign(
      { 
        userId: user._id,        // Unique user identifier
        username: user.username  // Username for easy access
      },
      process.env.JWT_SECRET,    // Secret key for signing (from environment variables)
      { expiresIn: '24h' }      // Token expires in 24 hours for security
    );

    // Send success response with token and user info
    // Status 201 = Created (new resource was successfully created)
    const duration = Date.now() - startTime;
    console.log(`🎉 [${requestId}] Registration successful! Duration: ${duration}ms`);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username
        // Note: We never send the password, even hashed, in the response
      }
    });

  } catch (error) {
    // Handle any unexpected errors during registration
    const duration = Date.now() - startTime;
    console.error(`💥 [${requestId}] Registration error after ${duration}ms:`, error.message);
    console.error(`   Stack trace:`, error.stack);
    
    // Send generic error message to client (don't expose internal errors)
    res.status(500).json({ 
      message: 'Server error during registration',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * POST /api/auth/login
 * 
 * User Login Endpoint
 * 
 * This endpoint authenticates existing users.
 * It validates credentials, verifies password, and returns a JWT token.
 * 
 * Why we need login:
 * - Allows registered users to access their accounts
 * - Verifies user credentials securely
 * - Provides JWT tokens for accessing protected resources
 */
router.post('/login', async (req, res) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substr(2, 9);
  
  console.log(`🔐 [${requestId}] Login attempt started for username: ${req.body.username}`);
  
  try {
    // Extract login credentials from request body
    const { username, password } = req.body;

    // Input validation - ensure both fields are provided
    // Why validate? Prevents incomplete login attempts
    if (!username || !password) {
      console.log(`❌ [${requestId}] Login failed: Missing credentials`);
      return res.status(400).json({ 
        message: 'Username and password are required',
        error: 'MISSING_CREDENTIALS'
      });
    }

    // Find user by username in the database
    // Why not case-sensitive? Usernames are typically case-sensitive for security
    console.log(`🔍 [${requestId}] Looking up user in database...`);
    const user = await User.findOne({ username });
    if (!user) {
      // Generic error message to prevent username enumeration attacks
      // Why generic? Prevents attackers from knowing which usernames exist
      console.log(`❌ [${requestId}] Login failed: User not found`);
      return res.status(400).json({ 
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Compare provided password with hashed password in database
    // Uses the comparePassword method from the User model
    console.log(`🔐 [${requestId}] Verifying password...`);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Same generic error message for consistency
      console.log(`❌ [${requestId}] Login failed: Invalid password`);
      return res.status(400).json({ 
        message: 'Invalid credentials',
        error: 'INVALID_CREDENTIALS'
      });
    }

    // Generate JWT token for successful login
    // Same token structure as registration for consistency
    const token = jwt.sign(
      { 
        userId: user._id,        // Unique user identifier
        username: user.username  // Username for easy access
      },
      process.env.JWT_SECRET,    // Secret key for signing
      { expiresIn: '24h' }      // Token expires in 24 hours
    );

    // Send success response with token and user info
    const duration = Date.now() - startTime;
    console.log(`🎉 [${requestId}] Login successful! Duration: ${duration}ms`);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username
        // Additional user info can be added here as needed
      }
    });

  } catch (error) {
    // Handle any unexpected errors during login
    const duration = Date.now() - startTime;
    console.error(`💥 [${requestId}] Login error after ${duration}ms:`, error.message);
    console.error(`   Stack trace:`, error.stack);
    
    // Send generic error message to client
    res.status(500).json({ 
      message: 'Server error during login',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
});

/**
 * Export the router
 * 
 * This makes the authentication routes available for use in the main server file.
 * The routes will be mounted at '/api/auth' as configured in server.js
 */
module.exports = router;