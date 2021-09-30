const camelcaseKeys = require('camelcase-keys');

interface columnProps {
  id: BigInteger;
  title: String;
  category: String;
  country: String;
  keyword: String;
  sources: String;
}

export const resolvers = (getNamedType: any) => {
  return {
    ColumnResult: {
      __resolveType(column: columnProps) {
        if ('category' in column) return 'NewsFeed';
        if ('sources' in column) return 'TwitterFeed';
        return 'Collection';
      },
    },
    Query: {
      getColumnResult: async (_: any, args: any, context: any) => {
        const { pgClient } = context;
        const { rows: newsFeeds } = await pgClient.query(
          `SELECT * FROM news_feeds WHERE user_id = current_user_id()`
        );
        const { rows: twitterFeeds } = await pgClient.query(
          `SELECT * FROM twitter_feeds WHERE user_id = current_user_id()`
        );
        const { rows: collections } = await pgClient.query(
          `SELECT * FROM collections WHERE user_id = current_user_id()`
        );
        const result = camelcaseKeys([
          ...newsFeeds,
          ...twitterFeeds,
          ...collections,
        ]);
        return result;
      },
    },
  };
};
