import express from 'express';
import { postgraphile } from 'postgraphile';
import { TagsFilePlugin } from 'postgraphile/plugins';
import PgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import path from 'path';
import * as Environment from './Environment';

require('dotenv').config();

const port = process.env.PORT || 5050;
const app = express();

app
  .use(
    postgraphile(process.env.DATABASE_URL, 'public', {
      watchPg: Environment.isDev,
      dynamicJson: true,
      ignoreRBAC: false,
      ignoreIndexes: false,
      showErrorStack: Environment.isDev,
      appendPlugins: [PgSimplifyInflector, TagsFilePlugin],
      graphqlRoute: '/graphql',
      graphiqlRoute: '/graphiql',
      graphiql: Environment.isDev,
      exportGqlSchemaPath: path.join(
        __dirname,
        '../../frontend',
        'schema.graphql'
      ),
      enhanceGraphiql: Environment.isDev,
      disableQueryLog: Environment.isDev,
      simpleCollections: 'both',
      graphileBuildOptions: {
        pgOmitListSuffix: true,
      },
      jwtSecret: process.env.JWT_SECRET,
      jwtPgTypeIdentifier: 'public.jwt_token',
    })
  )
  .listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
  });
