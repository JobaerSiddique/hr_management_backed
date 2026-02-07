import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import reportService from './report.service';

class ReportController {
  getMonthlyAttendanceReport = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { month, employee_id } = req.query;
    
    if (!month || typeof month !== 'string') {
      return sendResponse(res, {
        success: false,
        message: 'Month parameter is required (YYYY-MM format)',
        data: null,
      });
    }

    const employeeId = employee_id ? parseInt(employee_id as string) : undefined;
    const result = await reportService.getAttendanceSummary(month, employeeId);

    sendResponse(res, {
      success: true,
      message: 'Attendance report generated successfully',
      data: result,
    });
  });
}

export default new ReportController();