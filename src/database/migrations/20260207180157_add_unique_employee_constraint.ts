import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  // remove duplicates first
  await knex.raw(`
    DELETE FROM employees
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM employees
      GROUP BY name, date_of_birth
    );
  `);

  // then add unique constraint
  await knex.schema.alterTable("employees", (table) => {
    table.unique(["name", "date_of_birth"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("employees", (table) => {
    table.dropUnique(["name", "date_of_birth"]);
  });
}
