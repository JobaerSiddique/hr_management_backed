// src/database/seeds/create_hr_users.ts
import { Knex } from 'knex';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config(); // Make sure env variables are loaded

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('hr_users').del();

  const adminPass = process.env.Admin_pass;
  const saltRounds = Number(process.env.SALT) ;

  if (!adminPass) {
    throw new Error('Admin_pass environment variable is not set');
  }

  const password = await bcrypt.hash(adminPass, saltRounds);

  await knex('hr_users').insert([
    {
      email: 'admin@hr.com',
      password_hash: password,
      name: 'HR Admin',
    },
  ]);
}
