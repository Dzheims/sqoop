const { parse } = require('pg-connection-string');
require('dotenv').config();

const databaseUrl =
  (process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL) ||
  'postgres://postgres:@postgres:5432/postgres';

const dbConfig = parse(databaseUrl);
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
