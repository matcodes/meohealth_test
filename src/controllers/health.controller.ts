import { Request, Response } from "express";
import { ResponseHandler } from "../utils/response.handler";

export class HealthController {
  static async check(req: Request, res: Response): Promise<void> {
    ResponseHandler.success(req, res, "health-check", {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  static async liveness(req: Request, res: Response): Promise<void> {
    ResponseHandler.success(req, res, "liveness-check", {
      status: "alive",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
    });
  }
}
