"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
class EmployeeService {
    async createEmployee(data, photoPath) {
        const employeeData = {
            name: data.name,
            age: data.age,
            designation: data.designation,
            salary: data.salary,
            hiring_date: new Date(data.hiring_date),
            date_of_birth: new Date(data.date_of_birth),
            photo_path: photoPath || null,
        };
        try {
            const [employee] = await (0, database_1.default)("employees")
                .insert(employeeData)
                .returning("*");
            return employee;
        }
        catch (error) {
            if (error.code === "23505") {
                throw new ApiError_1.default(409, "Employee already exists (duplicate name and date of birth).");
            }
            throw new ApiError_1.default(500, `Database error: ${error.message}`);
        }
    }
    async getEmployees(params) {
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 10;
        const offset = (page - 1) * limit;
        let query = (0, database_1.default)('employees').select('*');
        if (params.search) {
            query = query.where((builder) => {
                builder.where('name', 'ILIKE', `%${params.search}%`)
                    .orWhere('designation', 'ILIKE', `%${params.search}%`);
            });
        }
        if (params.designation) {
            query = query.where('designation', params.designation);
        }
        if (params.minSalary) {
            query = query.where('salary', '>=', params.minSalary);
        }
        if (params.maxSalary) {
            query = query.where('salary', '<=', params.maxSalary);
        }
        let countQuery = (0, database_1.default)('employees').count('* as total');
        if (params.search) {
            countQuery = countQuery.where((builder) => {
                builder.where('name', 'ILIKE', `%${params.search}%`)
                    .orWhere('designation', 'ILIKE', `%${params.search}%`);
            });
        }
        if (params.designation) {
            countQuery = countQuery.where('designation', params.designation);
        }
        if (params.minSalary) {
            countQuery = countQuery.where('salary', '>=', params.minSalary);
        }
        if (params.maxSalary) {
            countQuery = countQuery.where('salary', '<=', params.maxSalary);
        }
        if (params.sort) {
            const [field, order] = params.sort.startsWith('-')
                ? [params.sort.substring(1), 'desc']
                : [params.sort, 'asc'];
            query = query.orderBy(field, order);
        }
        else {
            query = query.orderBy('id', 'desc');
        }
        query = query.limit(limit).offset(offset);
        const [data, countResult] = await Promise.all([
            query,
            countQuery.first(),
        ]);
        const total = Number(countResult?.total) || 0;
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }
    async getEmployeeById(id) {
        const employee = await (0, database_1.default)('employees')
            .where({ id })
            .first();
        if (!employee) {
            throw new ApiError_1.default(404, 'Employee not found');
        }
        return employee;
    }
    async updateEmployee(id, data, photoPath) {
        const employee = await this.getEmployeeById(id);
        const updateData = { ...data };
        if (data.hiring_date) {
            updateData.hiring_date = new Date(data.hiring_date);
        }
        if (data.date_of_birth) {
            updateData.date_of_birth = new Date(data.date_of_birth);
        }
        if (photoPath) {
            updateData.photo_path = photoPath;
        }
        updateData.updated_at = new Date();
        const [updatedEmployee] = await (0, database_1.default)('employees')
            .where({ id })
            .update(updateData)
            .returning('*');
        return updatedEmployee;
    }
    async softDeleteEmployee(id) {
        const employee = await this.getEmployeeById(id);
        const [updatedEmployee] = await (0, database_1.default)('employees')
            .where({ id })
            .update({
            is_active: false,
            updated_at: new Date(),
        })
            .returning('*');
        return updatedEmployee;
    }
    async employeeExists(id) {
        const employee = await (0, database_1.default)('employees')
            .where({ id })
            .first();
        return !!employee;
    }
}
exports.EmployeeService = EmployeeService;
exports.default = new EmployeeService();
//# sourceMappingURL=employee.service.js.map