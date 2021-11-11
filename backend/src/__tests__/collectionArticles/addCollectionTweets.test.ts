import { collection_articles, collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('select, insert collection_articles', () => {
  test('insert collection ', async () => {
    withRootDb(async (pgClient) => {
      const {
        rows: [collection],
      } = await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1) RETURNING *`,
        ['Covid Collection']
      );

      await pgClient.query<collection_articles>(
        `INSERT INTO collection_articles (description, published_at, source_name, title, url, url_to_image, collection_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          'covid',
          '2021-10-12T10:19:00Z',
          'rappler',
          'COVID-19',
          'https://www.rappler.com/',
          'https://www.rappler.com/',
          collection.id,
        ]
      );
      const {
        rows: [collection_article],
      } = await pgClient.query<collection_articles>(
        `SELECT * FROM collection_articles`
      );
      expect(collection_article.description).toBe('covid');
    });
  });
});
