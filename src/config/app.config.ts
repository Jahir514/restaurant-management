import { config } from './env.config';

export const appConfig = {
  name: 'Restaurant API',
  baseUrl: `http://localhost:${config.server.port}/api/${config.server.apiVersion}`,
  environment: config.server.nodeEnv,
  corsOptions: {
    origin: config.security.corsOrigin,
    credentials: true,
    optionsSuccessStatus: 200
  },
  rateLimitOptions: {
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: 'Too many requests, please try again later.'
  }
};