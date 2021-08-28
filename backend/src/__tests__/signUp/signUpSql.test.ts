import { jwt_token } from '../../models';
import { withRootDb } from '../helpers/dbTestHelpers';

test('sign up user', async () => {
  withRootDb(async (pgClient) => {
    const {
      rows: [jwt_token],
    } = await pgClient.query<jwt_token>(`SELECT * FROM SIGNUP($1, $2)`, [
      'JamesIvan',
      'DoePassword',
    ]);
    expect(jwt_token).toBeTruthy;
    expect(jwt_token.username).toBe('JamesIvan');
    expect(jwt_token.role).toBe('sqoop_user');
    expect(jwt_token.user_id).toBeNumber();
  });
});
