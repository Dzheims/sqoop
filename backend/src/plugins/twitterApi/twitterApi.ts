import { makeExtendSchemaPlugin } from 'graphile-utils';
import { resolvers } from './queries';
import { typeDefs } from './schema';

export const TwitterApiPlugin = makeExtendSchemaPlugin((build) => {
  return {
    typeDefs: typeDefs,
    resolvers: resolvers,
  };
});

export default TwitterApiPlugin;
