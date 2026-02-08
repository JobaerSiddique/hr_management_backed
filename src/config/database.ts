// // src/config/database.ts
// import knex from 'knex';
// import knexConfig from '../../knexfile'; // knexfile is in root

// const environment = process.env.NODE_ENV || 'development';
// const config = knexConfig[environment];

// const db = knex(config);

// export default db;

import knex from 'knex';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const knexFilePath = path.resolve(__dirname, '../../knexfile'); // absolute path to project root
const knexConfig = require(knexFilePath);

const environment = process.env.NODE_ENV || 'development';

if (!knexConfig[environment]) {
  throw new Error(`Knex configuration for environment "${environment}" not found`);
}

const db = knex(knexConfig[environment]);

export default db;
