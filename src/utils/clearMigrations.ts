import db from '../config/database';

async function clearMigrations() {
  await db.raw('DROP TABLE IF EXISTS _knex_migrations');
  await db.raw('DROP TABLE IF EXISTS _knex_migrations_lock');
  console.log('Migrations table cleared!');
  process.exit(0);
}

clearMigrations();
