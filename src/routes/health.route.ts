import { Router } from "express";
import { HealthController } from "../controllers/health.controller";

const router = Router();

router.get("/check", HealthController.check);
router.get("/liveness", HealthController.liveness);

export default router;
