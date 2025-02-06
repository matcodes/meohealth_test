import { Request, Response, NextFunction } from 'express';

export const validateNumberParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const num = Number(req.query.number);
  
  if (!Number.isInteger(num) || num < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid integer greater than 1'
    });
  }
  
  next();
};
