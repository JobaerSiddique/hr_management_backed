import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('employees', (table) => {
    table.boolean('is_active').defaultTo(true); // new column
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('employees', (table) => {
    table.dropColumn('is_active'); // remove column if rolling back
  });
}
