import { Request, Response, NextFunction } from "express";

export interface PrimeRequest extends Request {
  query: {
    number: string;
  };
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "INVALID_INPUT";
  }
}

export const validatePrimeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { number } = req.query;
    if (!number || typeof number !== "string") {
      throw new ValidationError('Invalid or missing "number" query parameter.');
    }

    try {
      // Attempt to convert to BigInt to validate the input
      BigInt(number);
    } catch (error) {
      throw new ValidationError(
        "Invalid input: The provided value cannot be converted to a number."
      );
    }

    (req as PrimeRequest).query.number = number;
    next();
  } catch (error) {
    next(error);
  }
};
