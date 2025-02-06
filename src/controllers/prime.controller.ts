import { Response, NextFunction } from "express";
import { isPrime } from "../services/prime.service";
import { PrimeRequest } from "../middleware/validation.middleware";
import { ResponseHandler } from "../utils/response.handler";

export class PrimeController {
  static async check(
    req: PrimeRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { number } = req.query;
    let numBigInt: bigint;
    try {
      numBigInt = BigInt(number);
      const result = isPrime(numBigInt);

      ResponseHandler.success(req, res, "prime-check", number, result);
    } catch (error) {
      next(error);
    }
  }
}
