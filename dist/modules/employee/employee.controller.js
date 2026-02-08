"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const employee_service_1 = __importDefault(require("./employee.service"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
class EmployeeController {
    constructor() {
        this.createEmployee = (0, catchAsync_1.default)(async (req, res, next) => {
            const data = req.body;
            console.log(data);
            const photo = req.file;
            console.log(photo);
            if (photo && !photo.path) {
                throw new ApiError_1.default(400, 'Failed to upload photo');
            }
            const result = await employee_service_1.default.createEmployee(data, photo?.path);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Employee created successfully',
                data: result,
            });
        });
        this.getEmployees = (0, catchAsync_1.default)(async (req, res, next) => {
            const params = req.query;
            const result = await employee_service_1.default.getEmployees(params);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Employees retrieved successfully',
                data: result.data,
                meta: result.meta,
            });
        });
        this.getEmployee = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            ;
            const result = await employee_service_1.default.getEmployeeById(id);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Employee retrieved successfully',
                data: result,
            });
        });
        this.updateEmployee = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            ;
            const data = req.body;
            const photo = req.file;
            const result = await employee_service_1.default.updateEmployee(id, data, photo?.path);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Employee updated successfully',
                data: result,
            });
        });
        this.deleteEmployee = (0, catchAsync_1.default)(async (req, res, next) => {
            const id = Number(req.params.id);
            ;
            await employee_service_1.default.softDeleteEmployee(id);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Employee deleted successfully',
                data: null,
            });
        });
    }
}
exports.default = new EmployeeController();
//# sourceMappingURL=employee.controller.js.map