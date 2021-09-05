import { makeExtendSchemaPlugin } from 'graphile-utils';
import { resolvers } from './queries';
import { typeDefs } from './schema';

require('dotenv').config();

export const UnionAndInterfacesApiPlugin = makeExtendSchemaPlugin((build) => {
  return {
    typeDefs: typeDefs,
    resolvers: resolvers,
  };
});

export default UnionAndInterfacesApiPlugin;
