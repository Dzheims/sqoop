// @generated
// Automatically generated. Don't change this file manually.

import { usersId } from './users';
import category from './category';

export type news_feedsId = number & { ' __flavor'?: 'news_feeds' };

export default interface news_feeds {
  /** Primary key. Index: news_feeds_pkey */
  id: news_feedsId;

  title: string;

  category: category | null;

  country: string | null;

  keyword: string | null;

  sources: string | null;

  /** Index: news_feeds_user_id_idx */
  user_id: usersId | null;

  created_at: Date;
}

export interface news_feedsInitializer {
  /** Primary key. Index: news_feeds_pkey */
  id: news_feedsId;

  title: string;

  category?: category | null;

  country?: string | null;

  keyword?: string | null;

  sources?: string | null;

  /** Index: news_feeds_user_id_idx */
  user_id?: usersId | null;

  /** Default value: now() */
  created_at?: Date;
}
