import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("employees", (table) => {
    table.timestamp("deleted_at").nullable().defaultTo(null);
    table.dropColumn("is_active"); // optional if you want to remove is_active
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("employees", (table) => {
    table.boolean("is_active").defaultTo(true);
    table.dropColumn("deleted_at");
  });
}
