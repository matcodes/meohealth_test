import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

export const errorHandler = (
  err: Error | ValidationError[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  
  if (Array.isArray(err)) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request parameters',
        details: err.map(e => ({ 
          param: e.param,
          message: e.msg 
        }))
      },
      timestamp
    });
  }

  const errorMap: Record<string, number> = {
    RATE_LIMIT_EXCEEDED: 429,
    INVALID_INPUT: 400,
    INTERNAL_SERVER_ERROR: 500
  };

  const statusCode = errorMap[err.name] || 500;
  
  console.error(`[ERROR] ${err.message}`);
  
  res.status(statusCode).json({
    error: {
      code: err.name,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    },
    timestamp
  });
};
