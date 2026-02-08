"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
async function testConnection() {
    try {
        const environment = process.env.NODE_ENV || 'development';
        const db = (0, knex_1.default)(knexfile_1.default[environment]);
        console.log('🔍 Testing database connection...');
        console.log('Environment:', environment);
        const result = await db.raw('SELECT NOW() as time, version() as version');
        console.log('✅ Database connection successful!');
        console.log('Time:', result.rows[0].time);
        console.log('PostgreSQL Version:', result.rows[0].version);
        await db.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Database connection failed:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
        if (error.message.includes('SSL') || error.code === '28000') {
            console.error('\n💡 TIP: Neon.psql requires SSL. Make sure your connection string includes:');
            console.error('?sslmode=require at the end of your DATABASE_URL');
        }
        process.exit(1);
    }
}
testConnection();
//# sourceMappingURL=test-db.js.map