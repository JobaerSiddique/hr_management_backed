"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const QueryBuilder_1 = __importDefault(require("../../utils/QueryBuilder"));
const employee_service_1 = __importDefault(require("../employee/employee.service"));
class AttendanceService {
    async createOrUpdateAttendance(data) {
        const employeeExists = await employee_service_1.default.employeeExists(data.employee_id);
        if (!employeeExists) {
            throw new ApiError_1.default(404, 'Employee not found');
        }
        const existingAttendance = await (0, database_1.default)('attendance')
            .where({
            employee_id: data.employee_id,
            date: new Date(data.date),
        })
            .first();
        if (existingAttendance) {
            const [updatedAttendance] = await (0, database_1.default)('attendance')
                .where({ id: existingAttendance.id })
                .update({
                check_in_time: data.check_in_time,
                updated_at: new Date(),
            })
                .returning('*');
            return updatedAttendance;
        }
        else {
            const [attendance] = await (0, database_1.default)('attendance')
                .insert({
                employee_id: data.employee_id,
                date: new Date(data.date),
                check_in_time: data.check_in_time,
            })
                .returning('*');
            return attendance;
        }
    }
    async getAttendances(params) {
        const query = (0, database_1.default)('attendance')
            .select('attendance.*', 'employees.name as employee_name')
            .leftJoin('employees', 'attendance.employee_id', 'employees.id');
        const queryBuilder = new QueryBuilder_1.default(query, params);
        if (params.employee_id) {
            queryBuilder.queryBuilder.where('attendance.employee_id', params.employee_id);
            queryBuilder.totalQueryBuilder.where('attendance.employee_id', params.employee_id);
        }
        if (params.from && params.to) {
            queryBuilder.queryBuilder.whereBetween('attendance.date', [params.from, params.to]);
            queryBuilder.totalQueryBuilder.whereBetween('attendance.date', [params.from, params.to]);
        }
        else if (params.date) {
            queryBuilder.queryBuilder.where('attendance.date', params.date);
            queryBuilder.totalQueryBuilder.where('attendance.date', params.date);
        }
        return await queryBuilder
            .sort()
            .paginate()
            .execute();
    }
    async getAttendanceById(id) {
        const attendance = await (0, database_1.default)('attendance')
            .select('attendance.*', 'employees.name as employee_name')
            .leftJoin('employees', 'attendance.employee_id', 'employees.id')
            .where('attendance.id', id)
            .first();
        if (!attendance) {
            throw new ApiError_1.default(404, 'Attendance record not found');
        }
        return attendance;
    }
    async updateAttendance(id, data) {
        const attendance = await this.getAttendanceById(id);
        const updateData = { ...data };
        if (data.date) {
            updateData.date = new Date(data.date);
        }
        updateData.updated_at = new Date();
        if (data.employee_id && data.employee_id !== attendance.employee_id) {
            const employeeExists = await employee_service_1.default.employeeExists(data.employee_id);
            if (!employeeExists) {
                throw new ApiError_1.default(404, 'Employee not found');
            }
        }
        const [updatedAttendance] = await (0, database_1.default)('attendance')
            .where({ id })
            .update(updateData)
            .returning('*');
        return updatedAttendance;
    }
    async deleteAttendance(id) {
        const attendance = await this.getAttendanceById(id);
        await (0, database_1.default)('attendance').where({ id }).delete();
    }
}
exports.AttendanceService = AttendanceService;
exports.default = new AttendanceService();
//# sourceMappingURL=attendance.service.js.map