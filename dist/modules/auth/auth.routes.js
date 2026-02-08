"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const validation_1 = require("../../middleware/validation");
const auth_validation_1 = require("./auth.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post('/login', (0, validation_1.validate)(auth_validation_1.loginSchema), auth_controller_1.default.login);
router.get('/profile', auth_1.auth, auth_controller_1.default.getProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map