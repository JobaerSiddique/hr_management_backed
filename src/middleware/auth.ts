import { Request, Response, NextFunction } from 'express';

import ApiError from '../utils/ApiError';
import { JwtPayload } from '../interfaces/common';
import { jwtHelpers } from '@/utils/jwtHelper';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtHelpers.verifyToken(token, process.env.JWT_SECRET!) as JwtPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid token'));
  }
};