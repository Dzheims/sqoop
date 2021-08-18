const path = require('path');
const { parse } = require('pg-connection-string');
require('dotenv').config();

if (typeof process.env.DATABASE_URL !== 'string') {
  throw new Error('DATABASE_URL is not set');
}

module.exports = {
  connection: parse(process.env.DATABASE_URL),
  preDeleteModelFolder: true,
  schemas: [
    {
      name: 'public',
      ignore: ['flyway_schema_history'],
      modelFolder: path.join(__dirname, 'src', 'models'),
    },
  ],
};
