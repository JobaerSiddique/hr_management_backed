"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable('employees', (table) => {
        table.boolean('is_active').defaultTo(true);
    });
}
async function down(knex) {
    return knex.schema.alterTable('employees', (table) => {
        table.dropColumn('is_active');
    });
}
//# sourceMappingURL=20260207082832_add_is_active_to_employees.js.map