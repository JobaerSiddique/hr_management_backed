"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, options) => {
    const response = {
        success: options.success,
        message: options.message,
    };
    if (options.data !== undefined) {
        response.data = options.data;
    }
    if (options.meta) {
        response.meta = options.meta;
    }
    res.status(options.statusCode || 200).json(response);
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map