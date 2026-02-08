// import type { Knex } from 'knex';
// import * as dotenv from 'dotenv';
// import path from 'path';

// dotenv.config();

// const config: { [key: string]: Knex.Config } = {
//   development: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: path.join(__dirname, './src/database/migrations'), // points to root/database/migrations
//       extension: 'ts',
//     },
//     seeds: {
//       directory: path.join(__dirname, './src/database/seeds'),
//       extension: 'ts',
//     },
//     pool: { min: 2, max: 10 },
//   },
//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: path.join(__dirname, './src/database/migrations'),
//     },
//     seeds: {
//       directory: path.join(__dirname, './src/database/seeds'),
//     },
//     pool: { min: 2, max: 10 },
//   },
// };

// export default config;


import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './src/database/migrations' },
    seeds: { directory: './src/database/seeds' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: { directory: './src/database/migrations' },
    seeds: { directory: './src/database/seeds' },
  }
};

module.exports = config; // CommonJS export for runtime
