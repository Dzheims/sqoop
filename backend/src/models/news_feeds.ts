// @generated
// Automatically generated. Don't change this file manually.

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
}

export interface news_feedsInitializer {
  /** Primary key. Index: news_feeds_pkey */
  id: news_feedsId;

  title: string;

  category?: category | null;

  country?: string | null;

  keyword?: string | null;

  sources?: string | null;
}
