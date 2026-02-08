// import knex from 'knex';
// import knexConfig from '../knexfile';

// async function testConnection() {
//   try {
//     const environment = process.env.NODE_ENV || 'development';
//     const db = knex(knexConfig[environment]);
    
//     console.log('🔍 Testing database connection...');
//     console.log('Environment:', environment);
    
//     // Test connection
//     const result = await db.raw('SELECT NOW() as time, version() as version');
    
//     console.log('✅ Database connection successful!');
//     console.log('Time:', result.rows[0].time);
//     console.log('PostgreSQL Version:', result.rows[0].version);
    
//     await db.destroy();
//     process.exit(0);
//   } catch (error: any) {
//     console.error('❌ Database connection failed:');
//     console.error('Error message:', error.message);
//     console.error('Error code:', error.code);
//     console.error('Full error:', error);
    
//     // Check if it's an SSL issue
//     if (error.message.includes('SSL') || error.code === '28000') {
//       console.error('\n💡 TIP: Neon.psql requires SSL. Make sure your connection string includes:');
//       console.error('?sslmode=require at the end of your DATABASE_URL');
//     }
    
//     process.exit(1);
//   }
// }

// testConnection();

import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile'); // ✅ require bypasses TS rootDir issue
const db = knex(knexConfig[environment]);

export default db;
