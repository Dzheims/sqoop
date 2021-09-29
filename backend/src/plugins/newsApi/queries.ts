import keyword_extractor from 'keyword-extractor';
const fetch = require('node-fetch');

interface topHeadlinesParams {
  country: string;
  sources: string;
  category: string;
  keyword: string;
}

const stopword = 'a';

export const resolvers = {
  Query: {
    topHeadlines: async (_: any, args: topHeadlinesParams, context: any) => {
      let { country, sources, category, keyword } = args;
      const { jwtClaims } = context;
      // if (!jwtClaims) throw new Error();

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
      if (result.status === 'error') {
        return result;
      }

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
