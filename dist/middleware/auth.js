"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const jwtHelper_1 = require("@/utils/jwtHelper");
const auth = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError_1.default(401, 'No token provided');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwtHelper_1.jwtHelpers.verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new ApiError_1.default(401, 'Invalid token'));
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map