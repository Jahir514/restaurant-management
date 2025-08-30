import { app } from './app';
import { db } from './config/databaseConnection';
import { logger } from './config/logger.config';
import { config } from './config/env.config';

const port = config.server.port;

const server = app.listen(port, async () => {
  await db.connect();
  logger.info(`Server is running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received');
  await gracefulShutdown();
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received');
  await gracefulShutdown();
});

async function gracefulShutdown() {
  logger.info('Starting graceful shutdown...');
  
  try {
    await server.close();
    logger.info('Server closed');
    
    await db.disconnect();
    logger.info('Database disconnected');
    
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
}