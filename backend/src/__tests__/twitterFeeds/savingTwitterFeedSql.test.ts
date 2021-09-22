import { twitter_feeds } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('create news feed', () => {
  test('insert news feed filters', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<twitter_feeds>(
        `INSERT INTO twitter_feeds (title, keyword, sources) VALUES ($1, $2, $3)`,
        ['Twitter', 'Marcos', 'inquirerdotnet']
      );
      const {
        rows: [twitter_feed],
      } = await pgClient.query<twitter_feeds>(`SELECT * FROM twitter_feeds`);
      expect(twitter_feed.keyword).toBe('Marcos');
      expect(twitter_feed.title).toBe('Twitter');
      expect(twitter_feed.sources).toBe('inquirerdotnet');
    });
  });
});
