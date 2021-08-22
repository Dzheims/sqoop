const fetch = require('node-fetch');
require('dotenv').config();

interface searchParams {
  query: string;
}

export const resolvers = {
  Query: {
    searchTweets: async (_: any, args: searchParams) => {
      const { query } = args;
      const queryParams = new URLSearchParams();
      queryParams.set('query', query);
      const response = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          },
        }
      );
      const result = await response.json();
      return result.data;
    },
  },
};

export default resolvers;
