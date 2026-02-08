"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.alterTable("employees", (table) => {
        table.boolean("is_active").defaultTo(true).alter();
    });
}
async function down(knex) {
    return knex.schema.alterTable("employees", (table) => {
        table.boolean("is_active").defaultTo(false).alter();
    });
}
//# sourceMappingURL=20260207173803_update_is_active_default_true.js.map