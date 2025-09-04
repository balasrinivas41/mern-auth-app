/**
 * API Configuration for MERN Authentication Frontend
 * 
 * This file centralizes all API endpoint configurations and base URL settings.
 * It provides a single source of truth for backend communication.
 * 
 * Why we need this:
 * - Centralizes API endpoint management
 * - Allows easy switching between development and production APIs
 * - Prevents hardcoded URLs throughout the application
 * - Makes the app more maintainable and flexible
 */

/**
 * API Base URL Configuration
 * 
 * Uses environment variable for flexibility across different environments.
 * Falls back to localhost for development if no environment variable is set.
 * 
 * Why environment variables?
 * - Different URLs for development, staging, and production
 * - Keeps sensitive information out of the codebase
 * - Allows easy deployment configuration
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * API Endpoints Object
 * 
 * Defines all API endpoints used throughout the application.
 * This object provides a centralized location for all backend endpoints.
 * 
 * Why centralize endpoints?
 * - Easy to update URLs when backend changes
 * - Prevents typos in endpoint URLs
 * - Makes the codebase more maintainable
 * - Provides IntelliSense support for endpoint names
 */
export const API_ENDPOINTS = {
  // Authentication endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,       // POST - User login endpoint
  REGISTER: `${API_BASE_URL}/api/auth/register`, // POST - User registration endpoint
  
  // Health check endpoint (for monitoring)
  HEALTH: `${API_BASE_URL}/health`,              // GET - Server health check
  
  // Future endpoints can be added here as the application grows
  // USER_PROFILE: `${API_BASE_URL}/api/user/profile`,
  // CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
};

/**
 * Default export of the base URL
 * 
 * Allows other parts of the application to access the base URL
 * for custom API calls or configuration purposes.
 */
export default API_BASE_URL;