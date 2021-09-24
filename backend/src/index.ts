import express from 'express';
import { postgraphile } from 'postgraphile';
import { TagsFilePlugin } from 'postgraphile/plugins';
import PgSimplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import NewsApiPlugin from './api/newsApi/newsApi';
import TwitterApiPlugin from './api/twitterApi/twitterApi';
import UnionAndInterfacesApiPlugin from './api/unionsAndInterfaces/unionsAndInterfaces';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import * as Environment from './Environment';

require('dotenv').config();

const port = process.env.PORT || 5050;
const app = express();

const corsOptions = {
  origin: '/graphql',
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cookieParser(process.env.JWT_SECRET));
app
  .use(compression())
  .use(express.static('public'))
  .use(
    postgraphile(process.env.DATABASE_URL, 'public', {
      watchPg: Environment.isDev,
      dynamicJson: true,
      ignoreRBAC: false,
      ignoreIndexes: false,
      showErrorStack: Environment.isDev,
      appendPlugins: [
        PgSimplifyInflector,
        TagsFilePlugin,
        NewsApiPlugin,
        TwitterApiPlugin,
        UnionAndInterfacesApiPlugin,
      ],
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
