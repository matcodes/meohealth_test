import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';
import { ApiResponse } from "../interfaces/response.interfaces";

export const errorHandler = (
  err: Error | ValidationError[],
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const timestamp = new Date().toISOString();

  if (Array.isArray(err)) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        title: "Invalid request parameters",
        details: err.map((e) => ({
          param: e.type === "field" ? e.path : undefined,
          message: e.msg,
        })),
      },
      meta: {
        timestamp,
        requestId: req.headers["x-request-id"]?.toString() || "unknown",
        path: req.path,
      },
    } as unknown as ApiResponse);
  }

  const errorMap: Record<string, number> = {
    RATE_LIMIT_EXCEEDED: 429,
    INVALID_INPUT: 400,
    INTERNAL_SERVER_ERROR: 500,
  };

  const statusCode = errorMap[err.name] || 500;

  console.error(`[ERROR] ${err.message}`);

  res.status(statusCode).json({
    error: {
      code: err.name,
      title: err.message,
      ...(process.env.NODE_ENV === "development" && {
        details: { stack: err.stack },
      }),
    },
    meta: {
      timestamp,
      requestId: req.headers["x-request-id"]?.toString() || "unknown",
      path: req.path,
    },
  } as ApiResponse);
};
