const { parse } = require('pg-connection-string');
require('dotenv').config();

const [databaseUrl, environment] =
  process.env.NODE_ENV === 'test'
    ? [process.env.DATABASE_URL_TEST, 'test']
    : [process.env.DATABASE_URL, 'development'];

if (typeof databaseUrl !== 'string') {
  throw new Error(`${environment} DATABASE_URL is not set`);
}

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
