import { Router } from 'express';
import { checkPrime } from "../controllers/is-prime.controller";
import { validatePrimeInput } from "../middleware/validation.middleware";

const router = Router();

router.get("/is-prime", validatePrimeInput, checkPrime);

export default router;
