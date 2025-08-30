import mongoose from 'mongoose';
import { DatabaseError } from '../errors/DatabaseError';
import { logger } from './logger.config';
import { config } from './env.config';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('Database is already connected');
      return;
    }

    if (!config.database.mongoUri) {
      throw new DatabaseError('MongoDB URI is not defined');
    }

    try {
      const options = {
        dbName: config.database.dbName,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      await mongoose.connect(config.database.mongoUri, options);
      
      this.isConnected = true;
      logger.info('Successfully connected to database');

      mongoose.connection.on('error', (error) => {
        logger.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', () => {
        this.isConnected = false;
        logger.warn('Database connection lost');
      });

    } catch (error) {
      logger.error('Database connection error:', error);
      throw new DatabaseError('Failed to connect to database');
    }
  }

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

  public getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }
}

export const db = DatabaseConnection.getInstance();
