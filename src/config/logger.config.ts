/**
 * Logger configuration using Winston
 *
 * This file configures a centralized logger for the application. It:
 * - Defines a JSON log format with timestamps
 * - Uses Console and File transports
 * - Honors the log level from env.config (with a sensible default)
 *
 * Notes:
 * - Logs are written to the "logs" directory (relative to process cwd)
 * - Error-level messages are written to logs/error.log
 * - All messages are written to logs/combined.log
 */

import winston from 'winston';
import { config } from './env.config';

// Define a combined format:
// 1) timestamp() - add an ISO timestamp
// 2) json() - ensures structured JSON output for parsers
// 3) printf() - allows custom shaping of the final object before stringifying
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    // Return a single-line JSON string containing timestamp, level, message and any extra metadata.
    // Keeping logs as single-line JSON is helpful for log collectors and readability in log files.
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta
    });
  })
);

// Create the logger instance.
// The level is read from the environment-backed config; fallback to 'info' if not set.
export const logger = winston.createLogger({
  level: config?.logging?.logLevel || 'info',
  format: logFormat,
  transports: [
    // Console transport: useful for local development and container stdout
    new winston.transports.Console(),

    // File transport for errors only. Keeps error entries separate for easy monitoring.
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error',
      dirname: 'logs' 
    }),

    // File transport for all combined logs (info and above)
    new winston.transports.File({ 
      filename: 'combined.log',
      dirname: 'logs' 
    })
  ]
});