import { resolvers as newsApiResolvers } from '../newsApi/queries';

export const resolvers = {
  Query: {
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
