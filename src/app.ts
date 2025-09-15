import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { config } from "./config/env.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import routes from "./routes";
import { db } from "./config/databaseConnection";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./config/swagger.config";

const app: Application = express();

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.security.corsOrigin,
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
});
app.use(limiter);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// API Routes
app.use(`/api/${config.server.apiVersion}`, routes);

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Swagger Documentation
const specs = swaggerJsdoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ...existing code...

export { app };
