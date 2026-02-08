import { IAttendance, CreateAttendanceDTO, UpdateAttendanceDTO, AttendanceQueryParams } from '../../interfaces/attendance';
export declare class AttendanceService {
    createOrUpdateAttendance(data: CreateAttendanceDTO): Promise<IAttendance>;
    getAttendances(params: AttendanceQueryParams): Promise<{
        data: IAttendance[];
        meta: any;
    }>;
    getAttendanceById(id: number): Promise<IAttendance>;
    updateAttendance(id: number, data: UpdateAttendanceDTO): Promise<IAttendance>;
    deleteAttendance(id: number): Promise<void>;
}
declare const _default: AttendanceService;
export default _default;
//# sourceMappingURL=attendance.service.d.ts.map