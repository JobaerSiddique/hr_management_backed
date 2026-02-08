"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function clearMigrations() {
    await database_1.default.raw('DROP TABLE IF EXISTS _knex_migrations');
    await database_1.default.raw('DROP TABLE IF EXISTS _knex_migrations_lock');
    console.log('Migrations table cleared!');
    process.exit(0);
}
clearMigrations();
//# sourceMappingURL=clearMigrations.js.map