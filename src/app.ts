import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import isPrimeRouter from './routes/is-prime.route';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter } from './config/rateLimit.config';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*'
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api', isPrimeRouter);

// Error handling
app.use(errorHandler);

export default app;
