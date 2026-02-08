import { Request, Response, NextFunction } from 'express';
declare class AttendanceController {
    createAttendance: (req: Request, res: Response, next: NextFunction) => void;
    getAttendances: (req: Request, res: Response, next: NextFunction) => void;
    getAttendance: (req: Request, res: Response, next: NextFunction) => void;
    updateAttendance: (req: Request, res: Response, next: NextFunction) => void;
    deleteAttendance: (req: Request, res: Response, next: NextFunction) => void;
}
declare const _default: AttendanceController;
export default _default;
//# sourceMappingURL=attendance.controller.d.ts.map