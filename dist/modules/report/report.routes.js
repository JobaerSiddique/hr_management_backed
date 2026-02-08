"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = __importDefault(require("./report.controller"));
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.auth);
router.get("/attendance", report_controller_1.default.getMonthlyAttendanceReport);
exports.default = router;
//# sourceMappingURL=report.routes.js.map