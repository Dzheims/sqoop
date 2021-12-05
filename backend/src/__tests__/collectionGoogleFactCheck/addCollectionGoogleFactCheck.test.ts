import { collection_google_fact_check, collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('select, insert collection_google_fact_check', () => {
  test('insert collection ', async () => {
    withRootDb(async (pgClient) => {
      const {
        rows: [collection],
      } = await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1) RETURNING *`,
        ['Covid Collection']
      );

      await pgClient.query<collection_google_fact_check>(
        `INSERT INTO collection_google_fact_check (text, claimant, claim_date, publisher_name, publisher_site, url, title, review_date, textual_rating, language_code, collection_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          'Philippine senator apologised',
          'multiple persons',
          '2021-09-18T00:00:00Z',
          'AFP Fact Check',
          'factcheck.afp.com',
          'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
          'Video does not show Philippine senator',
          '2021-09-22T05:52:00Z',
          'Missing context',
          'en',
          collection.id,
        ]
      );
      const {
        rows: [collection_google_fact_check],
      } = await pgClient.query<collection_google_fact_check>(
        `SELECT * FROM collection_google_fact_check`
      );
      expect(collection_google_fact_check.claimant).toBe('multiple persons');
      expect(collection_google_fact_check.publisher_name).toBe(
        'AFP Fact Check'
      );
      expect(collection_google_fact_check.publisher_site).toBe(
        'factcheck.afp.com'
      );
      expect(collection_google_fact_check.textual_rating).toBe(
        'Missing context'
      );

      const {
        rows: [deleted_collection_google_fact_check],
      } = await pgClient.query<collection_google_fact_check>(
        `DELETE FROM collection_google_fact_check WHERE id= $1 RETURNING *`,
        [collection_google_fact_check.id]
      );

      expect(deleted_collection_google_fact_check.claimant).toBe(
        'multiple persons'
      );
      expect(deleted_collection_google_fact_check.publisher_name).toBe(
        'AFP Fact Check'
      );
      expect(deleted_collection_google_fact_check.publisher_site).toBe(
        'factcheck.afp.com'
      );
      expect(deleted_collection_google_fact_check.textual_rating).toBe(
        'Missing context'
      );

      const { rows: emptyRow } =
        await pgClient.query<collection_google_fact_check>(
          `SELECT * FROM collection_google_fact_check`
        );

      expect(emptyRow).toBeArrayOfSize(0);
    });
  });
});
