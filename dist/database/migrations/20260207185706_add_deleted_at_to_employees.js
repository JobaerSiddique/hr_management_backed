"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable("employees", (table) => {
        table.timestamp("deleted_at").nullable().defaultTo(null);
        table.dropColumn("is_active");
    });
}
async function down(knex) {
    return knex.schema.alterTable("employees", (table) => {
        table.boolean("is_active").defaultTo(true);
        table.dropColumn("deleted_at");
    });
}
//# sourceMappingURL=20260207185706_add_deleted_at_to_employees.js.map