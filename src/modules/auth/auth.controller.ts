import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';

import authService from './auth.service';
import { LoginDTO } from '../../interfaces/auth';
import sendResponse from '@/utils/sendResponse';

class AuthController {
  login = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const data: LoginDTO = req.body;
    const result = await authService.login(data);

    sendResponse(res, {
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  getProfile = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.user!.id;
    const result = await authService.getProfile(userId);

    sendResponse(res, {
      success: true,
      message: 'Profile retrieved successfully',
      data: result,
    });
  });
}

export default new AuthController();