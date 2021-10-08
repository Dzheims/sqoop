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
  test('delete custom news feed ', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<twitter_feeds>(
        `INSERT INTO news_feeds (title, keyword, sources) VALUES ($1, $2, $3)`,
        ['Twitter', 'Marcos', 'inquirerdotnet']
      );
      const {
        rows: [news_feed],
      } = await pgClient.query<twitter_feeds>(`SELECT * FROM news_feeds`);
      expect(news_feed.keyword).toBe('Marcos');
      expect(news_feed.title).toBe('Twitter');
      expect(news_feed.sources).toBe('inquirerdotnet');
      const {
        rows: [deleted_feed],
      } = await pgClient.query<twitter_feeds>(
        `DELETE FROM news_feeds WHERE id=${news_feed.id} RETURNING *`
      );
      expect(deleted_feed.keyword).toBe('Marcos');
      const { rows: emptyRow } = await pgClient.query<twitter_feeds>(
        `SELECT * FROM news_feeds`
      );
      expect(emptyRow).toBeArrayOfSize(0);
    });
  });
});
