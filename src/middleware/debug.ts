import { Request, Response, NextFunction } from 'express';

export const debugMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log('=== DEBUG REQUEST ===');
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('File:', (req as any).file);
  console.log('=== END DEBUG ===');
  next();
};