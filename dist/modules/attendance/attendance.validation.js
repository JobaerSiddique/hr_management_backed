"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAttendanceSchema = exports.createAttendanceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAttendanceSchema = joi_1.default.object({
    employee_id: joi_1.default.number().integer().positive().required(),
    date: joi_1.default.date().required(),
    check_in_time: joi_1.default.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
        .required()
        .messages({
        'string.pattern.base': 'check_in_time must be in HH:MM:SS format',
    }),
});
exports.updateAttendanceSchema = joi_1.default.object({
    employee_id: joi_1.default.number().integer().positive(),
    date: joi_1.default.date(),
    check_in_time: joi_1.default.string().pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
});
//# sourceMappingURL=attendance.validation.js.map