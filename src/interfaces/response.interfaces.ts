export interface ApiResponse<T = boolean> {
  data?: {
    type: string;
    attributes: {
      result: T;
    };
  };
  error?: {
    code: string;
    title: string;
    details?: Record<string, unknown>;
  };
  meta: {
    timestamp: string;
    requestId: string;
    path: string;
  };
}
