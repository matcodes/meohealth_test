import { Response, Request } from "express";
import { ApiResponse } from "../interfaces/response.interfaces";

export class ResponseHandler {
  static success<T>(
    req: Request,
    res: Response,
    type: string,
    result: T
  ): void {
    const response: ApiResponse<T> = {
      data: {
        type,
        attributes: {
          result,
        },
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"]?.toString() || "unknown",
        path: req.path,
      },
    };

    res.json(response);
  }
}
