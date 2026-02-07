import knex from 'knex';
import knexConfig from '../../knexfile';
import * as dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  const environment = process.env.NODE_ENV || 'development';
  const db = knex(knexConfig[environment]);

  try {
    console.log('🚨 Starting database reset...');
    
    // Drop all tables in correct order (due to foreign keys)
    const tables = [
      'knex_migrations_lock',
      'knex_migrations',
      'attendance',
      'employees',
      'hr_users'
    ];
    
    for (const table of tables) {
      try {
        await db.schema.dropTableIfExists(table);
        console.log(`✅ Dropped table: ${table}`);
      } catch (error) {
        console.log(`⚠️  Could not drop ${table}:`, (error as Error).message);
      }
    }
    
    console.log('✅ Database reset complete!');
    
  } catch (error) {
    console.error('❌ Error during reset:', error);
  } finally {
    await db.destroy();
  }
}

resetDatabase();