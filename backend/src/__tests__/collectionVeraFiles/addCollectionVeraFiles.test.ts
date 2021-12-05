import { collection_vera_files, collections } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('select, insert collection_vera_files', () => {
  test('insert collection ', async () => {
    withRootDb(async (pgClient) => {
      const {
        rows: [collection],
      } = await pgClient.query<collections>(
        `INSERT INTO collections (title) VALUES ($1) RETURNING *`,
        ['Covid Collection']
      );

      await pgClient.query<collection_vera_files>(
        `INSERT INTO collection_vera_files (author, category, date, date_text, description, image_style, image_url, url, title, collection_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          'VERA Files',
          'Fact Check Filipino',
          '2021-05-31 20:30:00',
          'May 31, 2021, 8:30 PM',
          'Mula sa pagsabing malamang na hindi',
          "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
          'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
          'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte',
          'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
          collection.id,
        ]
      );
      const {
        rows: [collection_vera_files],
      } = await pgClient.query<collection_vera_files>(
        `SELECT * FROM collection_vera_files`
      );
      expect(collection_vera_files.author).toBe('VERA Files');
      expect(collection_vera_files.category).toBe('Fact Check Filipino');

      const {
        rows: [deleted_collection_vera_files],
      } = await pgClient.query<collection_vera_files>(
        `DELETE FROM collection_vera_files WHERE id=$1 RETURNING *`,
        [collection_vera_files.id]
      );

      expect(deleted_collection_vera_files.author).toBe('VERA Files');

      const { rows: emptyRow } = await pgClient.query<collection_vera_files>(
        `SELECT * FROM collection_vera_files`
      );

      expect(emptyRow).toBeArrayOfSize(0);
    });
  });
});
