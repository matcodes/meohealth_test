import express from "express";
import helmet from "helmet";
import isPrimeRouter from "./routes/prime.route";
import healthRouter from "./routes/health.route";
import { errorHandler } from "./middleware/error.middleware";
import { apiLimiter } from "./config/rateLimit.config";

const app = express();

// Security middleware
app.use(helmet());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use("/api/", apiLimiter);

// API Version prefix
const API_VERSION = "v1";

// Routes
app.use(`/api/${API_VERSION}/prime`, isPrimeRouter);
app.use(`/api/${API_VERSION}/health`, healthRouter);

// Error handling
app.use(errorHandler);

export default app;
