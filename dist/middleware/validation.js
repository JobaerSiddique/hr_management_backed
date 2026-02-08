"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const validate = (schema) => {
    return (req, _res, next) => {
        let dataToValidate;
        if (req.body.data && typeof req.body.data === 'string') {
            try {
                dataToValidate = JSON.parse(req.body.data);
            }
            catch (error) {
                return next(new ApiError_1.default(400, 'Invalid JSON in data field'));
            }
        }
        else {
            dataToValidate = req.body;
        }
        console.log('Data to validate:', dataToValidate);
        const { error } = schema.validate(dataToValidate, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const message = error.details
                .map((detail) => detail.message)
                .join(', ');
            next(new ApiError_1.default(400, message));
        }
        else {
            req.body = { ...dataToValidate };
            next();
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map