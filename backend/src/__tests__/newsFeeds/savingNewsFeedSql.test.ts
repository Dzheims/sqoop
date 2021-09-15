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
      expect(news_feed.keyword).toBe('Duterte');
      expect(news_feed.keyword).toBe('Duterte');
      expect(news_feed.keyword).toBe('Duterte');
    });
  });
});
