/**
 * Dashboard Component for MERN Authentication
 * 
 * This is a protected component that only authenticated users can access.
 * It displays user information and provides logout functionality.
 * 
 * Why we need this:
 * - Provides a secure area for authenticated users
 * - Demonstrates protected route functionality
 * - Shows user-specific information
 * - Handles user session management (logout)
 */

import React, { useEffect, useState } from 'react'; // React hooks for state and lifecycle management
import { useNavigate } from 'react-router-dom';      // Navigation hook for routing

/**
 * Dashboard Functional Component
 * 
 * Protected component that requires authentication.
 * Automatically redirects to login if user is not authenticated.
 */
const Dashboard: React.FC = () => {
  // State to store user information
  // Why any type? Could be improved with proper TypeScript interface
  const [user, setUser] = useState<any>(null);
  
  // Navigation hook for redirecting unauthenticated users
  const navigate = useNavigate();

  /**
   * Authentication Check Effect
   * 
   * Runs when component mounts to verify user authentication.
   * Redirects to login if user is not authenticated.
   * 
   * Why useEffect? Runs after component renders, perfect for authentication checks
   */
  useEffect(() => {
    // Retrieve authentication token and user data from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    // Check if both token and user data exist
    // Why check both? Token for authentication, userData for display
    if (!token || !userData) {
      // Redirect to login if authentication data is missing
      // Why redirect? Protects this route from unauthenticated access
      navigate('/login');
      return;
    }

    // Parse and set user data from localStorage
    // Why JSON.parse? localStorage stores strings, we need object
    setUser(JSON.parse(userData));
  }, [navigate]); // Dependency array includes navigate to satisfy React hooks rules

  /**
   * Handle User Logout
   * 
   * Clears all authentication data and redirects to login page.
   * This effectively logs the user out of the application.
   */
  const handleLogout = () => {
    // Remove authentication token from localStorage
    // Why remove token? Prevents future authenticated requests
    localStorage.removeItem('token');
    
    // Remove user data from localStorage
    // Why remove user data? Clears all session information
    localStorage.removeItem('user');
    
    // Navigate back to login page
    // Why navigate to login? Standard UX pattern after logout
    navigate('/login');
  };

  /**
   * Loading State Check
   * 
   * Show loading message while user data is being retrieved.
   * This prevents rendering errors when user data is null.
   */
  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  /**
   * Main Dashboard Render
   * 
   * Displays user information and logout functionality.
   * This is the main protected content area.
   */
  return (
    <div className="dashboard-container">
      {/* Dashboard header with welcome message and logout button */}
      <div className="dashboard-header">
        <h1>Welcome, {user.username}!</h1>
        
        {/* Logout button for ending user session */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      {/* Main dashboard content area */}
      <div className="dashboard-content">
        <div className="user-info">
          <h2>Your Account Information</h2>
          <p>✅ You have successfully logged in to your account.</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
        
        {/* Additional dashboard features can be added here */}
        <div className="dashboard-features">
          <h3>Dashboard Features</h3>
          <p>This is a protected area that only authenticated users can access.</p>
          <p>You can add more features here like:</p>
          <ul>
            <li>User profile management</li>
            <li>Application settings</li>
            <li>Data visualization</li>
            <li>User-specific content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;