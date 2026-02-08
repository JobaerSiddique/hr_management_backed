"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const report_service_1 = __importDefault(require("./report.service"));
class ReportController {
    constructor() {
        this.getMonthlyAttendanceReport = (0, catchAsync_1.default)(async (req, res, _next) => {
            const { month, employee_id } = req.query;
            if (!month || typeof month !== 'string') {
                return (0, sendResponse_1.default)(res, {
                    success: false,
                    message: 'Month parameter is required (YYYY-MM format)',
                    data: null,
                });
            }
            const employeeId = employee_id ? parseInt(employee_id) : undefined;
            const result = await report_service_1.default.getAttendanceSummary(month, employeeId);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Attendance report generated successfully',
                data: result,
            });
        });
    }
}
exports.default = new ReportController();
//# sourceMappingURL=report.controller.js.map