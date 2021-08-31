const fetch = require('node-fetch');

interface topHeadlinesParams {
  country: string;
  sources: string;
  category: string;
  keyword: string;
}

export const resolvers = {
  Query: {
    topHeadlines: async (_: any, args: topHeadlinesParams) => {
      const { country, sources, category, keyword } = args;
      const queryParams = new URLSearchParams();
      queryParams.set('country', country || '');
      queryParams.set('sources', sources || '');
      queryParams.set('category', category || '');
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
