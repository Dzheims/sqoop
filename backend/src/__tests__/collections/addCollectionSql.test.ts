import { collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('create collection', () => {
  test('insert news feed filters', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1)`,
        ['Covid Collection']
      );
      const {
        rows: [news_feed],
      } = await pgClient.query<collections>(`SELECT * FROM collections`);
      expect(news_feed.title).toBe('Covid Collection');
    });
  });
});
