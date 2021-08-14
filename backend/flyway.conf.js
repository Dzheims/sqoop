const { parse } = require('pg-connection-string');
require('dotenv').config();

if (typeof process.env.DATABASE_URL !== 'string') {
  throw new Error('DATABASE_URL must be a string, or must be set');
}

const dbConfig = parse(process.env.DATABASE_URL);
const jdbcUrl = `jdbc:postgresql://${dbConfig.host}/${dbConfig.database}`;

module.exports = {
  flywayArgs: {
    url: jdbcUrl,
    schemas: 'public',
    locations: 'filesystem:./migrations',
    user: dbConfig.user,
    password: dbConfig.password,
  },
  downloads: {
    expirationTimeInMs: -1,
  },
};
