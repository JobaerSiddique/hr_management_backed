import { PaginationParams } from "./common";
export interface IAttendance {
    id: number;
    employee_id: number;
    date: Date;
    check_in_time: string;
    created_at: Date;
    updated_at: Date;
}
export interface CreateAttendanceDTO {
    employee_id: number;
    date: Date;
    check_in_time: string;
}
export interface UpdateAttendanceDTO {
    employee_id?: number;
    date?: Date;
    check_in_time?: string;
}
export interface AttendanceQueryParams extends PaginationParams {
    employee_id?: number;
    from?: string;
    to?: string;
    date?: string;
}
export interface AttendanceReport {
    employee_id: number;
    name: string;
    days_present: number;
    times_late: number;
}
//# sourceMappingURL=attendance.d.ts.map