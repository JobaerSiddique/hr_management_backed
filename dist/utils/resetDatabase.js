"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const knexFilePath = path_1.default.resolve(__dirname, '../../knexfile');
const knexConfig = require(knexFilePath);
const environment = process.env.NODE_ENV || 'development';
const db = (0, knex_1.default)(knexConfig[environment]);
async function resetDatabase() {
    try {
        console.log('🚨 Resetting database...');
        const tables = ['attendance', 'employees', 'hr_users', 'knex_migrations', 'knex_migrations_lock'];
        for (const table of tables) {
            try {
                await db.schema.dropTableIfExists(table);
                console.log(`✅ Dropped table: ${table}`);
            }
            catch (err) {
                console.log(`⚠️ Could not drop table ${table}:`, err.message);
            }
        }
        console.log('✅ Database reset complete!');
    }
    catch (err) {
        console.error('❌ Error resetting database:', err);
    }
    finally {
        await db.destroy();
    }
}
resetDatabase();
//# sourceMappingURL=resetDatabase.js.map