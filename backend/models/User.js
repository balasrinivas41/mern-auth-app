/**
 * User Model for MERN Authentication System
 * 
 * This file defines the User schema and model for MongoDB using Mongoose.
 * It handles user data structure, password hashing, and authentication methods.
 * 
 * Why we need this:
 * - Defines the structure of user data in the database
 * - Provides automatic password hashing for security
 * - Includes methods for password comparison during login
 * - Ensures data validation and consistency
 */

const mongoose = require('mongoose'); // MongoDB object modeling library
const bcrypt = require('bcrypt'); // Library for hashing passwords securely

/**
 * User Schema Definition
 * 
 * Defines the structure and validation rules for user documents.
 * This schema acts as a blueprint for all user records in the database.
 */
const userSchema = new mongoose.Schema({
  // Username field configuration
  username: {
    type: String,          // Data type: string
    required: true,        // Field is mandatory - prevents empty usernames
    unique: true,          // Ensures no duplicate usernames in database
    trim: true,           // Removes leading/trailing whitespace automatically
    minlength: 3,         // Minimum 3 characters - prevents overly short usernames
    maxlength: 20         // Maximum 20 characters - prevents overly long usernames
  },
  
  // Password field configuration
  password: {
    type: String,          // Data type: string
    required: true,        // Field is mandatory - prevents empty passwords
    minlength: 6          // Minimum 6 characters - basic security requirement
    // Note: We don't store max length here because the hashed password will be longer
  }
}, {
  // Schema options
  timestamps: true         // Automatically adds createdAt and updatedAt fields
                          // Why? Helps track when accounts were created and last modified
});

/**
 * Pre-save Middleware for Password Hashing
 * 
 * This middleware runs automatically before saving a user document.
 * It hashes the password for security before storing it in the database.
 * 
 * Why we hash passwords:
 * - Protects user data if database is compromised
 * - Industry standard security practice
 * - One-way encryption - even we can't see the original password
 */
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  // Why this check? Prevents re-hashing already hashed passwords on user updates
  if (!this.isModified('password')) return next();
  
  try {
    console.log(`🔐 Starting password hashing for user: ${this.username}`);
    const hashStartTime = Date.now();
    
    // Generate a salt with complexity factor of 10
    // What is salt? Random data added to password before hashing
    // Why salt? Prevents rainbow table attacks and makes each hash unique
    // Why 10 rounds? Good balance between security and performance
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password with the generated salt
    // This creates a secure, irreversible hash of the password
    this.password = await bcrypt.hash(this.password, salt);
    
    const hashDuration = Date.now() - hashStartTime;
    console.log(`✅ Password hashed successfully in ${hashDuration}ms`);
    
    // Continue with the save operation
    next();
  } catch (error) {
    // If hashing fails, pass the error to the next middleware
    // This will prevent the user from being saved with an unhashed password
    console.error(`💥 Password hashing failed for user ${this.username}:`, error.message);
    next(error);
  }
});

/**
 * Instance Method for Password Comparison
 * 
 * This method is available on each user document instance.
 * It compares a plain text password with the hashed password stored in the database.
 * 
 * Why we need this:
 * - Enables secure login verification
 * - Compares without revealing the original password
 * - Uses bcrypt's secure comparison to prevent timing attacks
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  // Use bcrypt.compare to securely compare the plain text password
  // with the hashed password stored in the database
  // Returns true if passwords match, false otherwise
  console.log(`🔍 Comparing password for user: ${this.username}`);
  const compareStartTime = Date.now();
  
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  
  const compareDuration = Date.now() - compareStartTime;
  console.log(`${isMatch ? '✅' : '❌'} Password comparison completed in ${compareDuration}ms - Match: ${isMatch}`);
  
  return isMatch;
};

/**
 * Export the User Model
 * 
 * This creates a model from the schema and makes it available for use
 * in other parts of the application (like routes and controllers).
 * 
 * The model provides methods for:
 * - Creating new users
 * - Finding existing users
 * - Updating user data
 * - Deleting users
 */
module.exports = mongoose.model('User', userSchema);