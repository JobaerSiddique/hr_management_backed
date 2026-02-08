// // src/config/database.ts
// import knex from 'knex';
// import knexConfig from '../../knexfile'; // knexfile is in root

// const environment = process.env.NODE_ENV || 'development';
// const config = knexConfig[environment];

// const db = knex(config);

// export default db;


import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment]; // use require instead of import

const db = knex(config);

export default db;
