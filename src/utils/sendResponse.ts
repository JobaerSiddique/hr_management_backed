import { Response } from 'express';

interface SendResponseOptions<T> {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const sendResponse = <T>(res: Response, options: SendResponseOptions<T>): void => {
  const response: any = {
    success: options.success,
    message: options.message,
  };

  if (options.data !== undefined) {
    response.data = options.data;
  }

  if (options.meta) {
    response.meta = options.meta;
  }

  res.status(options.statusCode || 200).json(response);
};

export default sendResponse;