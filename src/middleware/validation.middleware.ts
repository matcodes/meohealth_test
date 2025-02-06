import { Request, Response, NextFunction } from "express";

export interface PrimeRequest extends Request {
  query: {
    number: string;
  };
}

export const validatePrimeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { number } = req.query;
  if (!number || typeof number !== "string") {
    return res.status(400).json({
      status: "error",
      message: 'Invalid or missing "number" query parameter.',
    });
  }
  (req as PrimeRequest).query.number = number;
  next();
};
