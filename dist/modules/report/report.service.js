"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
class ReportService {
    async getMonthlyAttendanceReport(month, employeeId) {
        const monthRegex = /^\d{4}-\d{2}$/;
        if (!monthRegex.test(month)) {
            throw new ApiError_1.default(400, 'Month must be in YYYY-MM format');
        }
        const [year, monthNum] = month.split('-').map(Number);
        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);
        let query = (0, database_1.default)('attendance')
            .select('employees.id as employee_id', 'employees.name', database_1.default.raw('COUNT(attendance.id) as days_present'), database_1.default.raw(`
          SUM(
            CASE 
              WHEN attendance.check_in_time > '09:45:00' 
              THEN 1 
              ELSE 0 
            END
          ) as times_late
        `))
            .leftJoin('employees', 'attendance.employee_id', 'employees.id')
            .whereBetween('attendance.date', [startDate, endDate])
            .groupBy('employees.id', 'employees.name');
        if (employeeId) {
            query = query.where('employees.id', employeeId);
        }
        query = query.orderBy('employees.id');
        const results = await query;
        return results.map((row) => ({
            employee_id: row.employee_id,
            name: row.name,
            days_present: parseInt(row.days_present),
            times_late: parseInt(row.times_late),
        }));
    }
    async getAttendanceSummary(month, employeeId) {
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
exports.ReportService = ReportService;
exports.default = new ReportService();
//# sourceMappingURL=report.service.js.map