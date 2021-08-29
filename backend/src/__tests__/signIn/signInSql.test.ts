import { jwt_token } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

describe('sign in user', () => {
  test('sign in using incorrect credentials', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<jwt_token>(`SELECT * FROM SIGNUP($1, $2)`, [
        'MaryJan',
        'JanPassword',
      ]);

      const {
        rows: [jwt_token],
      } = await pgClient.query<jwt_token>(`SELECT * FROM SIGNIN($1, $2)`, [
        'MaryJan',
        'JnPassword',
      ]);
      expect(jwt_token.username).toBeNull();
      expect(jwt_token.role).toBeNull();
      expect(jwt_token.user_id).toBeNull();
    });
  });

  test('sign in correct credentials', async () => {
    withRootDb(async (pgClient) => {
      await pgClient.query<jwt_token>(`SELECT * FROM SIGNUP($1, $2)`, [
        'MaryJan',
        'JanPassword',
      ]);

      const {
        rows: [jwt_token],
      } = await pgClient.query<jwt_token>(`SELECT * FROM SIGNIN($1, $2)`, [
        'MaryJan',
        'JanPassword',
      ]);
      expect(jwt_token).toBeTruthy;
      expect(jwt_token.username).toBe('MaryJan');
      expect(jwt_token.role).toBe('sqoop_user');
      expect(jwt_token.user_id).toBeNumber();
    });
  });
});
