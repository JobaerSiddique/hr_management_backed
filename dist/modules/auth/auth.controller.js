"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = __importDefault(require("./auth.service"));
const sendResponse_1 = __importDefault(require("@/utils/sendResponse"));
class AuthController {
    constructor() {
        this.login = (0, catchAsync_1.default)(async (req, res, _next) => {
            const data = req.body;
            const result = await auth_service_1.default.login(data);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Login successful',
                data: result,
            });
        });
        this.getProfile = (0, catchAsync_1.default)(async (req, res, _next) => {
            const userId = req.user.id;
            const result = await auth_service_1.default.getProfile(userId);
            (0, sendResponse_1.default)(res, {
                success: true,
                message: 'Profile retrieved successfully',
                data: result,
            });
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map