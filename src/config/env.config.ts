/**
 * Environment Configuration
 * This file manages all environment variables and configuration settings
 * for the Restaurant application
 */

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  // Server configuration settings
  server: {
    port: process.env.PORT || 3000, // Server port number
    nodeEnv: process.env.NODE_ENV || "development", // Node environment (development/production)
    apiVersion: process.env.API_VERSION || "v1", // API version for routing
  },

  // Database configuration for MongoDB
  database: {
    mongoUri: process.env.MONGO_URI, // MongoDB connection string
    dbName: process.env.MONGO_DB_NAME, // Database name
  },

  // Authentication settings
  auth: {
    jwtSecret: process.env.JWT_SECRET, // Secret key for JWT tokens
    tokenExpire: parseInt(process.env.AUTH_TOKEN_EXPIRE || "36000"), // Token expiration time (10 hours default)
    refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRE || "604800"), // Refresh token expiration (7 days default)
    saltRounds: parseInt(process.env.SALT_ROUNDS || "10"), // Number of salt rounds for password hashing
  },

  // Rate limiting configuration to prevent abuse
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || "15") * 60 * 1000, // Time window for rate limiting (15 minutes default)
    max: parseInt(process.env.RATE_LIMIT_MAX || "100"), // Maximum requests per window
  },

  // Logging configuration
  logging: {
    logLevel: process.env.LOG_LEVEL || "info", // Logging level (debug/info/warn/error)
  },

  // Security settings
  security: {
    corsOrigin:
      process.env.CORS_ORIGIN ||
      "http://localhost:3000" ||
      "http://localhost:3001", // Allowed CORS origin
    sessionSecret: process.env.SESSION_SECRET, // Secret for session management
  },
};

// Export the configuration object as default
export default config;
