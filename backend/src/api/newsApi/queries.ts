const fetch = require('node-fetch');

interface topHeadlinesParams {
  country: string;
  sources: string;
  category: string;
  keyword: string;
}

export const resolvers = {
  Query: {
    topHeadlines: async (_: any, args: topHeadlinesParams, context: any) => {
      let { country, sources, category, keyword } = args;
      const { jwtClaims } = context;
      // if (!jwtClaims) throw new Error();

      const queryParams = new URLSearchParams();
      if (sources) {
        country = '';
        category = '';
      }
      queryParams.set('country', country || '');
      queryParams.set('category', category || '');
      queryParams.set('sources', sources || '');
      queryParams.set('q', keyword || '');
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': process.env.NEWS_API_KEY,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.status === 'error') {
        return result;
      }
      const articles = result.articles.map((article: any) => {
        const { source, ...subArticle } = article;
        return {
          ...subArticle,
          ...{ sourceId: source.id, sourceName: source.name },
        };
      });
      return articles;
    },
  },
};
