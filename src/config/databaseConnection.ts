/**
 * DatabaseConnection
 *
 * Singleton wrapper around mongoose to manage a single shared connection instance
 * across the application. This class:
 *  - Ensures only one connection is created (Singleton pattern)
 *  - Exposes connect() and disconnect() lifecycle methods
 *  - Provides convenient access to the mongoose connection object
 *  - Emits logs for connection events and surfaces errors via DatabaseError
 *
 * Usage:
 *  import { db } from './config/databaseConnection';
 *  await db.connect();
 */
import mongoose from 'mongoose';
import { DatabaseError } from '../errors/DatabaseError';
import { logger } from './logger.config';
import { config } from './env.config';

class DatabaseConnection {
  // Singleton instance
  private static instance: DatabaseConnection;

  // Internal flag to track connection state
  private isConnected: boolean = false;

  // Private constructor prevents direct instantiation (enforces singleton)
  private constructor() {}

  /**
   * Returns the singleton instance of DatabaseConnection.
   * Creates the instance on first call.
   */
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Establishes a connection to MongoDB using mongoose.
   *
   * - No-op if already connected.
   * - Throws DatabaseError if required config (mongoUri) is missing.
   * - Catches and logs connection errors, rethrowing a DatabaseError on failure.
   */
  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('Database is already connected');
      return;
    }

    // Ensure we have a MongoDB URI from env/config
    if (!config.database.mongoUri) {
      throw new DatabaseError('MongoDB URI is not defined');
    }

    try {
      // Connection options:
      // - dbName: use explicit DB name when provided
      // - autoIndex: build indexes automatically (suitable for development; consider disabling in production)
      // - serverSelectionTimeoutMS: how long to try selecting a server (ms)
      // - socketTimeoutMS: socket inactivity timeout (ms)
      const options = {
        dbName: config.database.dbName,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      // Attempt to connect
      await mongoose.connect(config.database.mongoUri, options);
      
      // Mark state and log success
      this.isConnected = true;
      logger.info('Successfully connected to database');

      // Attach event listeners to mongoose.connection to detect runtime issues
      mongoose.connection.on('error', (error) => {
        // Log connection-level errors. Do NOT rethrow here; allow application-level handlers to decide recovery.
        logger.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        // Update internal state when disconnected and log a warning for visibility
        this.isConnected = false;
        logger.warn('Database connection lost');
      });

    } catch (error) {
      // Log the caught error and throw a DatabaseError to surface the failure to callers
      logger.error('Database connection error:', error);
      throw new DatabaseError('Failed to connect to database');
    }
  }

  /**
   * Gracefully closes the mongoose connection.
   *
   * - No-op if not currently connected.
   * - Logs success or throws DatabaseError on failure.
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('Database connection closed');
    } catch (error) {
      logger.error('Error while disconnecting from database:', error);
      throw new DatabaseError('Failed to disconnect from database');
    }
  }

  /**
   * Returns the underlying mongoose.Connection object for direct access when needed.
   */
  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  /**
   * Returns whether this wrapper considers itself connected.
   * Note: This flag is updated on connect/disconnect and on the 'disconnected' event.
   */
  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }
}

// Export a singleton instance for application-wide usage
export const db = DatabaseConnection.getInstance();
