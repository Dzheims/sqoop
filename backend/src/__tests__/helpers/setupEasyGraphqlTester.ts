import path from 'path';
const fs = require('fs');

export const userSchema = fs.readFileSync(
  path.join(__dirname, '../../../../frontend', 'schema.graphql'),
  'utf8'
);
