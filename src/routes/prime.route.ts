import { Router } from "express";
import { PrimeController } from "../controllers/prime.controller";
import { validatePrimeInput } from "../middleware/validation.middleware";

const router = Router();

router.get("/check", validatePrimeInput, PrimeController.check);

export default router;
