// import knex from 'knex';

// import * as dotenv from 'dotenv';

// dotenv.config();

// async function resetDatabase() {
// const knexConfig = require('../../knexfile'); // ✅ runtime require
// const environment = process.env.NODE_ENV || 'development';
// const db = knex(knexConfig[environment]);

//   try {
//     console.log('🚨 Starting database reset...');
    
//     // Drop all tables in correct order (due to foreign keys)
//     const tables = [
//       'knex_migrations_lock',
//       'knex_migrations',
//       'attendance',
//       'employees',
//       'hr_users'
//     ];
    
//     for (const table of tables) {
//       try {
//         await db.schema.dropTableIfExists(table);
//         console.log(`✅ Dropped table: ${table}`);
//       } catch (error) {
//         console.log(`⚠️  Could not drop ${table}:`, (error as Error).message);
//       }
//     }
    
//     console.log('✅ Database reset complete!');
    
//   } catch (error) {
//     console.error('❌ Error during reset:', error);
//   } finally {
//     await db.destroy();
//   }
// }

// resetDatabase();






import knex from 'knex';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const knexFilePath = path.resolve(__dirname, '../../knexfile');
const knexConfig = require(knexFilePath);

const environment = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[environment]);

async function resetDatabase() {
  try {
    console.log('🚨 Resetting database...');
    
    const tables = ['attendance', 'employees', 'hr_users', 'knex_migrations', 'knex_migrations_lock'];

    for (const table of tables) {
      try {
        await db.schema.dropTableIfExists(table);
        console.log(`✅ Dropped table: ${table}`);
      } catch (err) {
        console.log(`⚠️ Could not drop table ${table}:`, (err as Error).message);
      }
    }

    console.log('✅ Database reset complete!');
  } catch (err) {
    console.error('❌ Error resetting database:', err);
  } finally {
    await db.destroy();
  }
}

resetDatabase();
