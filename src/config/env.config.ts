import dotenv from 'dotenv';

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiVersion: process.env.API_VERSION || 'v1'
  },
  database: {
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DB_NAME
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    tokenExpire: parseInt(process.env.AUTH_TOKEN_EXPIRE || '36000'),
    refreshTokenExpire: parseInt(process.env.REFRESH_TOKEN_EXPIRE || '604800'),
    saltRounds: parseInt(process.env.SALT_ROUNDS || '10')
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || '100')
  },
  logging: {
    logLevel: process.env.LOG_LEVEL || 'info'
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    sessionSecret: process.env.SESSION_SECRET
  }
};

export default config;