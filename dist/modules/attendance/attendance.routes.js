"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = __importDefault(require("./attendance.controller"));
const validation_1 = require("../../middleware/validation");
const auth_1 = require("../../middleware/auth");
const attendance_validation_1 = require("./attendance.validation");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router
    .route('/')
    .get(attendance_controller_1.default.getAttendances)
    .post((0, validation_1.validate)(attendance_validation_1.createAttendanceSchema), attendance_controller_1.default.createAttendance);
router
    .route('/:id')
    .get(attendance_controller_1.default.getAttendance)
    .put((0, validation_1.validate)(attendance_validation_1.updateAttendanceSchema), attendance_controller_1.default.updateAttendance)
    .delete(attendance_controller_1.default.deleteAttendance);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map