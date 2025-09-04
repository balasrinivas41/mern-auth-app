/**
 * Main Application Component for MERN Auth Frontend
 * 
 * This is the root component that sets up routing and navigation for the entire application.
 * It defines the structure of our single-page application (SPA) and manages client-side routing.
 * 
 * Why we need this:
 * - Creates a single-page application with multiple views
 * - Handles navigation between login, register, and dashboard pages
 * - Provides a consistent layout structure for all pages
 * - Manages URL routing without full page refreshes
 */

import React from 'react';
// React Router components for client-side routing
// BrowserRouter: Enables HTML5 history API for clean URLs
// Routes: Container for all route definitions
// Route: Individual route definition
// Navigate: Programmatic navigation component
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import our custom components
import Login from './components/Login';           // User login form
import Register from './components/Register';     // User registration form
import Dashboard from './components/Dashboard';   // Protected user dashboard

// Import global styles
import './App.css';

/**
 * App Component
 * 
 * The main component that renders our entire application.
 * It sets up the routing structure and defines which component
 * should render for each URL path.
 * 
 * Why we structure it this way:
 * - Single entry point for all application routes
 * - Clean separation of concerns (each page is a separate component)
 * - Easy to add new routes in the future
 * - Consistent layout wrapper for all pages
 */
function App() {
  return (
    // Router wrapper enables routing throughout the entire app
    // BrowserRouter uses HTML5 history API for clean URLs (no # symbols)
    <Router>
      <div className="App">
        {/* 
          Routes container - only one route will match and render at a time
          This is different from Switch in older React Router versions
        */}
        <Routes>
          {/* Login route - handles user authentication */}
          <Route path="/login" element={<Login />} />
          
          {/* Register route - handles new user registration */}
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard route - protected area for authenticated users */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 
            Default route - redirects to login when user visits root URL
            Why redirect to login? Ensures unauthenticated users start at login page
            Navigate component provides declarative navigation
          */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as the default export
// This allows other files to import and use this component
export default App;
