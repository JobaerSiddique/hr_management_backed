import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import { JwtPayload } from '../interfaces/common';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid token'));
  }
};