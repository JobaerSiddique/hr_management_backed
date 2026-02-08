import { AttendanceReport } from '../../interfaces/attendance';
export declare class ReportService {
    getMonthlyAttendanceReport(month: string, employeeId?: number): Promise<AttendanceReport[]>;
    getAttendanceSummary(month: string, employeeId?: number): Promise<{
        summary: {
            month: string;
            total_employees: number;
            total_days_present: number;
            total_late_arrivals: number;
        };
        report: AttendanceReport[];
    }>;
}
declare const _default: ReportService;
export default _default;
//# sourceMappingURL=report.service.d.ts.map