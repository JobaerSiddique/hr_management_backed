"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMiddleware = void 0;
const debugMiddleware = (req, _res, next) => {
    console.log('=== DEBUG REQUEST ===');
    console.log('Headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('=== END DEBUG ===');
    next();
};
exports.debugMiddleware = debugMiddleware;
//# sourceMappingURL=debug.js.map