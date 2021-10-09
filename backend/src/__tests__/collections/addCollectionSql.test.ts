import { collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('select, insert, delete collection', () => {
  test('insert collection ', async () => {
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
  test('delete collection', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1)`,
        ['Eleksyon 2022 Collection']
      );
      const {
        rows: [new_collection],
      } = await pgClient.query<collections>(`SELECT * FROM collections`);
      expect(new_collection.title).toBe('Eleksyon 2022 Collection');
      const {
        rows: [deleted_collection],
      } = await pgClient.query<collections>(
        `DELETE FROM collections where id = ${new_collection.id} RETURNING *`
      );
      expect(deleted_collection.title).toBe('Eleksyon 2022 Collection');
      const { rows: empty_collection } = await pgClient.query<collections>(
        `SELECT * FROM collections`
      );
      expect(empty_collection).toBeArrayOfSize(0);
    });
  });
});
