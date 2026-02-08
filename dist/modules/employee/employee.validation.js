"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeSchema = exports.createEmployeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEmployeeSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).max(100),
    age: joi_1.default.number().integer().min(18).max(100).required(),
    designation: joi_1.default.string().required().min(2).max(100),
    hiring_date: joi_1.default.date().required(),
    date_of_birth: joi_1.default.date().required(),
    salary: joi_1.default.number().positive().required(),
    deleted_at: joi_1.default.date().default(null)
});
exports.updateEmployeeSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100),
    age: joi_1.default.number().integer().min(18).max(100),
    designation: joi_1.default.string().min(2).max(100),
    hiring_date: joi_1.default.date(),
    date_of_birth: joi_1.default.date(),
    salary: joi_1.default.number().positive(),
    deleted_at: joi_1.default.date().default(null)
});
//# sourceMappingURL=employee.validation.js.map