const { Client, Pool } = require('pg')

module.exports = {

  connection: new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  }),

  pool:  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
  }),

};
