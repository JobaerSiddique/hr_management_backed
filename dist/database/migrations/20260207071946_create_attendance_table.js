"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
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
        table.unique(['employee_id', 'date']);
    });
}
async function down(knex) {
    return knex.schema.dropTable('attendance');
}
//# sourceMappingURL=20260207071946_create_attendance_table.js.map