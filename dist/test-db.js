"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const db = (0, knex_1.default)(knexConfig[environment]);
exports.default = db;
//# sourceMappingURL=test-db.js.map