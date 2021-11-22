import { collection_tweets, collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('select, insert collection_tweets', () => {
  test('insert collection ', async () => {
    withRootDb(async (pgClient) => {
      const {
        rows: [collection],
      } = await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1) RETURNING *`,
        ['Covid Collection']
      );

      await pgClient.query<collection_tweets>(
        `INSERT INTO collection_tweets (tweet_id, collection_id) VALUES ($1, $2)`,
        ['142353119450113', collection.id]
      );
      const {
        rows: [collection_tweet],
      } = await pgClient.query<collection_tweets>(
        `SELECT * FROM collection_tweets`
      );
      expect(collection_tweet.tweet_id).toBe('142353119450113');

      const {
        rows: [deleted_collection_tweet],
      } = await pgClient.query<collection_tweets>(
        `DELETE FROM collection_tweets WHERE id=${collection_tweet.id} RETURNING *`
      );

      expect(deleted_collection_tweet.tweet_id).toBe('142353119450113');

      const { rows: emptyRow } = await pgClient.query<collection_tweets>(
        `SELECT * FROM collection_tweets`
      );

      expect(emptyRow).toBeArrayOfSize(0);
    });
  });
});
