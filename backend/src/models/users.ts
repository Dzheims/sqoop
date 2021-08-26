// @generated
// Automatically generated. Don't change this file manually.

export type usersId = number & { ' __flavor'?: 'users' };

export default interface users {
  /** Primary key. Index: users_pkey */
  user_id: usersId;

  /** Index: users_username_key */
  username: string;

  hashed_password: string;
}

export interface usersInitializer {
  /** Primary key. Index: users_pkey */
  user_id: usersId;

  /** Index: users_username_key */
  username: string;

  hashed_password: string;
}
