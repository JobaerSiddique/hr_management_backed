"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.raw(`
    DELETE FROM employees
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM employees
      GROUP BY name, date_of_birth
    );
  `);
    await knex.schema.alterTable("employees", (table) => {
        table.unique(["name", "date_of_birth"]);
    });
}
async function down(knex) {
    await knex.schema.alterTable("employees", (table) => {
        table.dropUnique(["name", "date_of_birth"]);
    });
}
//# sourceMappingURL=20260207180157_add_unique_employee_constraint.js.map