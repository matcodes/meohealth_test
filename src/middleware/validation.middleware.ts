import { query } from 'express-validator';

export const validatePrimeInput = [
  query('number')
    .isString()
    .withMessage('Number must be a string representation')
    .bail()
    .custom((value) => {
      if (!/^-?\d+$/.test(value)) throw new Error('Invalid numeric format');
      const num = BigInt(value);
      if (num <= 1n) throw new Error('Number must be greater than 1');
      return true;
    })
];
