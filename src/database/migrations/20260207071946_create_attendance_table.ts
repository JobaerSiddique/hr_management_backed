import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary();
    table
      .integer('employee_id')
      .notNullable()
      .references('id')
      .inTable('employees')
      .onDelete('CASCADE');
    table.date('date').notNullable();
    table.time('check_in_time').notNullable();
    table.timestamps(true, true);
    
    // Unique constraint for one record per employee per day
    table.unique(['employee_id', 'date']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('attendance');
}