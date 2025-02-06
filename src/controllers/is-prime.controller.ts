import { Request, Response } from 'express';
import { isPrime } from '../services/prime.service';

export const isPrimeController = (req: Request, res: Response) => {
  const num = Number(req.query.number);
  res.json({
    success: true,
    result: isPrime(num)
  });
};
