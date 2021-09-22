import { makeExtendSchemaPlugin } from 'graphile-utils';
import { resolvers } from './queries';
import { typeDefs } from './schema';

require('dotenv').config();

export const UnionAndInterfacesApiPlugin = makeExtendSchemaPlugin(
  ({ pgSql: sql, graphql: { getNamedType } }) => {
    return {
      typeDefs: typeDefs,
      resolvers: resolvers(getNamedType),
    };
  }
);

export default UnionAndInterfacesApiPlugin;
