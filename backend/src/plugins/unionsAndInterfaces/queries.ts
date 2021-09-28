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
          `SELECT * FROM news_feeds`
        );
        const { rows: twitterFeeds } = await pgClient.query(
          `SELECT * FROM twitter_feeds`
        );
        const { rows: collections } = await pgClient.query(
          `SELECT * FROM collections`
        );
        const result = [...newsFeeds, ...twitterFeeds, ...collections];
        return result;
      },
    },
  };
};
