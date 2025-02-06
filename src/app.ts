import express from 'express';
import isPrimeRouter from './routes/is-prime.route';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(isPrimeRouter);

// Error handling
app.use(errorHandler);

export default app;
