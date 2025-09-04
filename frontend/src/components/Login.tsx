/**
 * Login Component for MERN Authentication
 * 
 * This component provides the user interface for existing users to authenticate.
 * It handles form submission, API communication, and navigation after successful login.
 * 
 * Why we need this:
 * - Allows registered users to access their accounts
 * - Validates user credentials against the backend API
 * - Manages login state and provides user feedback
 * - Stores authentication tokens for future requests
 */

import React, { useState } from 'react';           // React hooks for state management
import { useNavigate, Link } from 'react-router-dom'; // Navigation hooks and components
import axios from 'axios';                           // HTTP client for API requests
import { API_ENDPOINTS } from '../config/api';       // Centralized API endpoint configuration

/**
 * Login Functional Component
 * 
 * Uses React Hooks for state management and side effects.
 * TypeScript ensures type safety throughout the component.
 */
const Login: React.FC = () => {
  // State management using React hooks
  // Why useState? Provides reactive state that re-renders component when changed
  const [username, setUsername] = useState(''); // Stores username input
  const [password, setPassword] = useState(''); // Stores password input
  const [error, setError] = useState('');       // Stores error messages for user feedback
  const [loading, setLoading] = useState(false); // Tracks login request status
  
  // Navigation hook for programmatic routing
  // Why useNavigate? Allows redirecting users after successful login
  const navigate = useNavigate();

  /**
   * Handle Form Submission
   * 
   * This function processes the login form when user clicks submit.
   * It validates input, sends request to backend, and handles the response.
   * 
   * Why async? API calls are asynchronous operations
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior (page refresh)
    // Why prevent default? We want to handle submission with JavaScript
    e.preventDefault();
    
    // Clear any previous error messages
    setError('');
    
    // Set loading state to show user that request is in progress
    // Why loading state? Provides feedback during API call
    setLoading(true);

    try {
      // Send POST request to login endpoint with user credentials
      // Why axios? Provides better error handling and request/response interceptors
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        username,
        password
      });

      // Store authentication token in localStorage for future requests
      // Why localStorage? Persists token across browser sessions
      // Alternative: sessionStorage (expires when tab closes)
      localStorage.setItem('token', response.data.token);
      
      // Store user information for easy access throughout the app
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Navigate to dashboard after successful login
      // Why dashboard? Main protected area of the application
      navigate('/dashboard');
      
    } catch (err: any) {
      // Handle login errors and display user-friendly messages
      // Why generic fallback? Ensures user always gets some feedback
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      // Always reset loading state, regardless of success or failure
      // Why finally? Ensures loading state is cleared in all scenarios
      setLoading(false);
    }
  };

  /**
   * Component Render
   * 
   * Returns the JSX that defines the login form UI.
   * Uses controlled components for form inputs.
   */
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        
        {/* Conditional error message display */}
        {/* Why conditional? Only show errors when they exist */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Login form with onSubmit handler */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}                                    // Controlled component - React manages value
              onChange={(e) => setUsername(e.target.value)}      // Update state on input change
              required                                           // HTML5 validation
            />
          </div>
          
          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"                                    // Hides password text
              id="password"
              value={password}                                   // Controlled component
              onChange={(e) => setPassword(e.target.value)}     // Update state on input change
              required                                          // HTML5 validation
            />
          </div>
          
          {/* Submit button with loading state */}
          <button type="submit" disabled={loading}>
            {/* Dynamic button text based on loading state */}
            {/* Why dynamic? Provides visual feedback during API call */}
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Link to registration page for new users */}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;