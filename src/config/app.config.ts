import { config as envConfig } from "./env.config";

export const appConfig = {
  name: "Restaurant API",
  baseUrl: `http://localhost:${envConfig.server.port}/api/${envConfig.server.apiVersion}`,
  environment: envConfig.server.nodeEnv,
  corsOptions: {
    origin: envConfig.security.corsOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
  },
  rateLimitOptions: {
    windowMs: envConfig.rateLimit.windowMs,
    max: envConfig.rateLimit.max,
    message: "Too many requests, please try again later.",
  },
  MULTI_BRANCH: process.env.MULTI_BRANCH === "true",
};

export default appConfig;
