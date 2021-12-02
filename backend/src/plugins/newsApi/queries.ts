import camelcaseKeys from 'camelcase-keys';
import keyword_extractor from 'keyword-extractor';
import { category } from '../../models';
import { article } from './schema';
const fetch = require('node-fetch');

interface topHeadlinesParams {
  country: string;
  sources: string;
  category: string;
  keyword: string;
}

interface searchArticlesParams {
  keyword: string;
  sources: string;
  from: string;
  to: string;
}

export const resolvers = {
  Query: {
    topHeadlines: async (_: any, args: topHeadlinesParams, context: any) => {
      let { country, sources, category, keyword } = args;
      const { jwtClaims, pgClient } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      await pgClient.query(
        `DELETE FROM top_headlines_requests WHERE category = $1 AND country = $2 AND keyword = $3 AND sources = $4 AND created_at < Now() - INTERVAL '15 MINUTES'`,
        [category, country, keyword, sources]
      );

      const {
        rows: [request],
      } = await pgClient.query(
        `SELECT * FROM top_headlines_requests WHERE category = $1 AND country = $2 AND keyword = $3 AND sources = $4`,
        [category, country, keyword, sources]
      );

      if (request) {
        const { rows: topHeadlinesCache } = await pgClient.query(
          `SELECT * FROM top_headlines_cache where top_headlines_request_id = $1`,
          [request.id]
        );
        return camelcaseKeys(topHeadlinesCache);
      }

      const {
        rows: [top_headlines_request_id],
      } = await pgClient.query(
        `INSERT INTO top_headlines_requests (category, country, keyword, sources) VALUES ($1, $2, $3, $4) RETURNING id`,
        [category, country, keyword, sources]
      );
      const queryParams = new URLSearchParams();
      queryParams.set('country', !country || !country.length ? 'ph' : country);
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
        const {
          source: { id: sourceId, name: sourceName },
          title,
          description,
          ...subArticle
        } = article;
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
          sourceId,
          sourceName,
        };
      });

      articles.map(async (article: any) => {
        await pgClient.query(
          `INSERT INTO top_headlines_cache (author, content, description, published_at, source_name, source_id, title, url, url_to_image, top_headlines_request_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            article.author,
            article.content,
            article.description,
            article.publishedAt,
            article.sourceName,
            article.sourceId,
            article.title,
            article.url,
            article.urlToImage,
            top_headlines_request_id.id,
          ]
        );
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
      let { keyword, sources, from, to } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      const queryParams = new URLSearchParams();
      queryParams.set('q', keyword);
      queryParams.set('sources', sources || '');
      queryParams.set('from', from);
      queryParams.set('to', to);

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
        const {
          source: { id: sourceId, name: sourceName },
          title,
          description,
          ...subArticle
        } = article;
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
          sourceId,
          sourceName,
        };
      });
      return articles;
    },
  },
};
