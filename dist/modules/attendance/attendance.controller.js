"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attendance_service_1 = __importDefault(require("./attendance.service"));
const catchAsync_1 = __importDefault(require("@/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("@/utils/sendResponse"));
class AttendanceController {
    constructor() {
        this.createAttendance = (0, catchAsync_1.default)(async (req, res, next) => {
            const data = req.body;
            const result = await attendance_service_1.default.createOrUpdateAttendance(data);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance recorded successfully',
                data: result,
            });
        });
        this.getAttendances = (0, catchAsync_1.default)(async (req, res, next) => {
            const params = req.query;
            const result = await attendance_service_1.default.getAttendances(params);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance records retrieved successfully',
                data: result.data,
                meta: result.meta,
            });
        });
        this.getAttendance = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            const result = await attendance_service_1.default.getAttendanceById(id);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance record retrieved successfully',
                data: result,
            });
        });
        this.updateAttendance = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            const data = req.body;
            const result = await attendance_service_1.default.updateAttendance(id, data);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance record updated successfully',
                data: result,
            });
        });
        this.deleteAttendance = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            await attendance_service_1.default.deleteAttendance(id);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance record deleted successfully',
                data: null,
            });
        });
    }
}
exports.default = new AttendanceController();
//# sourceMappingURL=attendance.controller.js.map