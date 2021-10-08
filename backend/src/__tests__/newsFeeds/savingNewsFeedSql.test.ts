import { news_feeds } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('create news feed', () => {
  test('insert news feed filters', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<news_feeds>(
        `INSERT INTO news_feeds (title, category, country, keyword, sources) VALUES ($1, $2, $3, $4, $5)`,
        ['News', 'general', 'us', 'Duterte', 'cnnphilippines']
      );
      const {
        rows: [news_feed],
      } = await pgClient.query<news_feeds>(`SELECT * FROM news_feeds`);
      expect(news_feed.keyword).toBe('Duterte');
      expect(news_feed.title).toBe('News');
      expect(news_feed.category).toBe('general');
      expect(news_feed.sources).toBe('cnnphilippines');
    });
  });
  test('delete custom news feed ', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<news_feeds>(
        `INSERT INTO news_feeds (title, category, country, keyword, sources) VALUES ($1, $2, $3, $4, $5)`,
        ['News', 'general', 'us', 'Duterte', 'cnnphilippines']
      );
      const {
        rows: [news_feed],
      } = await pgClient.query<news_feeds>(`SELECT * FROM news_feeds`);
      expect(news_feed.keyword).toBe('Duterte');
      expect(news_feed.title).toBe('News');
      expect(news_feed.category).toBe('general');
      expect(news_feed.sources).toBe('cnnphilippines');
      const {
        rows: [deleted_feed],
      } = await pgClient.query<news_feeds>(
        `DELETE FROM news_feeds WHERE id=${news_feed.id} RETURNING *`
      );
      expect(deleted_feed.keyword).toBe('Duterte');
      const { rows: emptyRow } = await pgClient.query<news_feeds>(
        `SELECT * FROM news_feeds`
      );
      expect(emptyRow).toBeArrayOfSize(0);
    });
  });
});
