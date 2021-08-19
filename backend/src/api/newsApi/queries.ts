const fetch = require('node-fetch');

export const resolvers = {
  Query: {
    topHeadlines: async () => {
      const response = await fetch(process.env.NEWS_API);
      const result = await response.json();
      return result.articles;
    },
  },
};
