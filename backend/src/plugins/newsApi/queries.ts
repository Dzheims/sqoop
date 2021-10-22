import keyword_extractor from 'keyword-extractor';
const fetch = require('node-fetch');

interface topHeadlinesParams {
  country: string;
  sources: string;
  category: string;
  keyword: string;
}

interface searchArticlesParams {
  keyword: string;
}

export const resolvers = {
  Query: {
    topHeadlines: async (_: any, args: topHeadlinesParams, context: any) => {
      let { country, sources, category, keyword } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      const queryParams = new URLSearchParams();
      queryParams.set('country', country || 'ph');
      if (sources) {
        queryParams.set('country', '');
        category = '';
      }
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
      if (result.status === 'error') throw Error(result.message);

      const articles = result.articles.map((article: any) => {
        const { source, title, description, ...subArticle } = article;
        const suggestedKeywords = keyword_extractor.extract(
          description || title,
          {
            language: 'english',
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true,
          }
        );
        return {
          ...subArticle,
          description,
          title,
          suggestedKeywords,
          ...{ sourceId: source.id, sourceName: source.name },
        };
      });
      return articles;
    },
    topHeadlinesSources: async (_: any, args: any, context: any) => {
      let { country, category } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      const queryParams = new URLSearchParams();
      queryParams.set('category', category || '');
      queryParams.set('country', country || '');
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': process.env.NEWS_API_KEY,
          },
        }
      );

      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);
      return result.sources;
    },
    searchArticles: async (
      _: any,
      args: searchArticlesParams,
      context: any
    ) => {
      let { keyword } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');
      const queryParams = new URLSearchParams();
      queryParams.set('q', keyword || '');
      const response = await fetch(
        `https://newsapi.org/v2/everything?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
            'X-Api-Key': process.env.NEWS_API_KEY,
          },
        }
      );

      const result = await response.json();
      if (result.status === 'error') throw new Error(result.message);

      const articles = result.articles.map((article: any) => {
        const { source, title, description, ...subArticle } = article;
        const suggestedKeywords = keyword_extractor.extract(
          description || title,
          {
            language: 'english',
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: true,
          }
        );
        return {
          ...subArticle,
          description,
          title,
          suggestedKeywords,
          ...{ sourceId: source.id, sourceName: source.name },
        };
      });
      return articles;
    },
  },
};
