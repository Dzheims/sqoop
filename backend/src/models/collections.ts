// @generated
// Automatically generated. Don't change this file manually.

import { usersId } from './users';

export type collectionsId = number & { ' __flavor'?: 'collections' };

export default interface collections {
  /** Primary key. Index: collections_pkey */
  id: collectionsId;

  title: string;

  /** Index: collections_user_id_idx */
  user_id: usersId | null;
}

export interface collectionsInitializer {
  /** Primary key. Index: collections_pkey */
  id: collectionsId;

  title: string;

  /** Index: collections_user_id_idx */
  user_id?: usersId | null;
}
