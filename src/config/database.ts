// src/config/database.ts
import knex from 'knex';
import knexConfig from '../../knexfile'; // knexfile is in root

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const db = knex(config);

export default db;
