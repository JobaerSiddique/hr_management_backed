import { Request, Response, NextFunction } from 'express';


import attendanceService from './attendance.service';
import { CreateAttendanceDTO, UpdateAttendanceDTO, AttendanceQueryParams } from '../../interfaces/attendance';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';

class AttendanceController {
  createAttendance = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const data: CreateAttendanceDTO = req.body;
    const result = await attendanceService.createOrUpdateAttendance(data);

    sendResponse(res, {
      success: true,
      message: 'Attendance recorded successfully',
      data: result,
    });
  });

  getAttendances = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const params: AttendanceQueryParams = req.query;
    const result = await attendanceService.getAttendances(params);

    sendResponse(res, {
      success: true,
      message: 'Attendance records retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  });

  getAttendance = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const result = await attendanceService.getAttendanceById(id);

    sendResponse(res, {
      success: true,
      message: 'Attendance record retrieved successfully',
      data: result,
    });
  });

  updateAttendance = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    const data: UpdateAttendanceDTO = req.body;
    const result = await attendanceService.updateAttendance(id, data);

    sendResponse(res, {
      success: true,
      message: 'Attendance record updated successfully',
      data: result,
    });
  });

  deleteAttendance = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const id = Number(req.params.id);
    await attendanceService.deleteAttendance(id);

    sendResponse(res, {
      success: true,
      message: 'Attendance record deleted successfully',
      data: null,
    });
  });
}

export default new AttendanceController();