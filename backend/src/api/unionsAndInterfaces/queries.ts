import { resolvers as newsApiResolvers } from '../newsApi/queries';

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
    Column: {
      __resolveType({ category }: columnProps) {
        return category ? 'NewsFeed' : 'TwitterFeed';
      },
    },
    ColumnResult: {
      __resolveType(column: columnProps) {
        return column.category ? 'NewsFeed' : 'TwitterFeed';
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
        const result = newsFeeds.concat(twitterFeeds);
        return result;
      },
      getColumns: async (_: any, args: any, context: any) => {
        const { pgClient } = context;
        const { rows: newsFeeds } = await pgClient.query(
          `SELECT * FROM news_feeds`
        );
        const { rows: twitterFeeds } = await pgClient.query(
          `SELECT * FROM twitter_feeds`
        );

        return { ...{ newsFeeds }, ...{ twitterFeeds } };
      },
      getCustomNewsApiFeed: async (_: any, args: any, context: any) => {
        const { id } = args;
        const { pgClient } = context;
        const {
          rows: [filters],
        } = await pgClient.query(
          `SELECT category, country, keyword, sources FROM feeds WHERE id = $1`,
          [id]
        );
        console.log(filters);
        const data = await newsApiResolvers.Query.topHeadlines(
          {},
          {
            category: filters.category,
            country: filters.country,
            sources: filters.sources,
            keyword: filters.keyword,
          },
          {}
        );

        return { ...filters, ...{ data } };
      },
    },
  };
};
