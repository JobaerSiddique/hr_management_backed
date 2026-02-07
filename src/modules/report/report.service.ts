import db from '../../config/database';
import ApiError from '../../utils/ApiError';
import { AttendanceReport } from '../../interfaces/attendance';

export class ReportService {
  async getMonthlyAttendanceReport(month: string, employeeId?: number): Promise<AttendanceReport[]> {
    // Validate month format (YYYY-MM)
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      throw new ApiError(400, 'Month must be in YYYY-MM format');
    }

    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);

    let query = db('attendance')
      .select(
        'employees.id as employee_id',
        'employees.name',
        db.raw('COUNT(attendance.id) as days_present'),
        db.raw(`
          SUM(
            CASE 
              WHEN attendance.check_in_time > '09:45:00' 
              THEN 1 
              ELSE 0 
            END
          ) as times_late
        `)
      )
      .leftJoin('employees', 'attendance.employee_id', 'employees.id')
      .whereBetween('attendance.date', [startDate, endDate])
      .groupBy('employees.id', 'employees.name');

    if (employeeId) {
      query = query.where('employees.id', employeeId);
    }

    query = query.orderBy('employees.id');

    const results = await query;

    return results.map((row: any) => ({
      employee_id: row.employee_id,
      name: row.name,
      days_present: parseInt(row.days_present),
      times_late: parseInt(row.times_late),
    }));
  }

  async getAttendanceSummary(month: string, employeeId?: number) {
    const report = await this.getMonthlyAttendanceReport(month, employeeId);
    
    const totalEmployees = report.length;
    const totalDaysPresent = report.reduce((sum, emp) => sum + emp.days_present, 0);
    const totalLateArrivals = report.reduce((sum, emp) => sum + emp.times_late, 0);

    return {
      summary: {
        month,
        total_employees: totalEmployees,
        total_days_present: totalDaysPresent,
        total_late_arrivals: totalLateArrivals,
      },
      report,
    };
  }
}

export default new ReportService();