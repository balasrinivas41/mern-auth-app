/**
 * Register Component for MERN Authentication
 * 
 * This component provides the user interface for new users to create accounts.
 * It handles form validation, API communication, and automatic login after registration.
 * 
 * Why we need this:
 * - Allows new users to join the platform
 * - Validates user input before sending to backend
 * - Provides immediate authentication after successful registration
 * - Ensures password confirmation for better user experience
 */

import React, { useState } from 'react';           // React hooks for state management
import { useNavigate, Link } from 'react-router-dom'; // Navigation hooks and components
import axios from 'axios';                           // HTTP client for API requests
import { API_ENDPOINTS } from '../config/api';       // Centralized API endpoint configuration

/**
 * Register Functional Component
 * 
 * Uses React Hooks for state management and form handling.
 * Includes additional validation for password confirmation.
 */
const Register: React.FC = () => {
  // State management for form inputs and UI feedback
  const [username, setUsername] = useState('');         // Stores username input
  const [password, setPassword] = useState('');         // Stores password input
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores password confirmation
  const [error, setError] = useState('');               // Stores validation/API error messages
  const [loading, setLoading] = useState(false);        // Tracks registration request status
  
  // Navigation hook for redirecting after successful registration
  const navigate = useNavigate();

  /**
   * Handle Registration Form Submission
   * 
   * This function processes the registration form with client-side validation
   * before sending the request to the backend API.
   * 
   * Why client-side validation?
   * - Provides immediate feedback to users
   * - Reduces unnecessary API calls
   * - Improves user experience
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();
    
    // Clear any previous error messages
    setError('');

    // Client-side validation: Check if passwords match
    // Why validate here? Immediate feedback without API call
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Client-side validation: Check password length
    // Why 6 characters? Balance between security and usability
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Set loading state to provide user feedback
    setLoading(true);

    try {
      // Send registration request to backend API
      const response = await axios.post(API_ENDPOINTS.REGISTER, {
        username,
        password
        // Note: We don't send confirmPassword to backend - it's only for client validation
      });

      // Store authentication token for immediate login
      // Why immediate login? Better user experience - no need to login after registration
      localStorage.setItem('token', response.data.token);
      
      // Store user information for app usage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
      
    } catch (err: any) {
      // Handle registration errors (username taken, server errors, etc.)
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      // Always reset loading state
      setLoading(false);
    }
  };

  /**
   * Component Render
   * 
   * Returns the JSX for the registration form.
   * Includes password confirmation field for better user experience.
   */
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        
        {/* Display error messages when they exist */}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          
          {/* Password input field */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimum 6 characters"
            />
          </div>
          
          {/* Password confirmation field */}
          {/* Why confirm password? Prevents typos in password entry */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>
          
          {/* Submit button with loading state */}
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        {/* Link to login page for existing users */}
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;