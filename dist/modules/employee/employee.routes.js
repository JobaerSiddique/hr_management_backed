"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = __importDefault(require("./employee.controller"));
const validation_1 = require("../../middleware/validation");
const upload_1 = require("../../middleware/upload");
const auth_1 = require("../../middleware/auth");
const employee_validation_1 = require("./employee.validation");
const debug_1 = require("@/middleware/debug");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router
    .route("/")
    .get(employee_controller_1.default.getEmployees)
    .post(upload_1.upload.single('photo'), debug_1.debugMiddleware, (0, validation_1.validate)(employee_validation_1.createEmployeeSchema), employee_controller_1.default.createEmployee);
router
    .route("/:id")
    .get(employee_controller_1.default.getEmployee)
    .put(upload_1.upload.single("photo"), (0, validation_1.validate)(employee_validation_1.updateEmployeeSchema), employee_controller_1.default.updateEmployee)
    .delete(employee_controller_1.default.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map