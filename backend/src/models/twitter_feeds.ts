// @generated
// Automatically generated. Don't change this file manually.

export type twitter_feedsId = number & { ' __flavor'?: 'twitter_feeds' };

export default interface twitter_feeds {
  /** Primary key. Index: twitter_feeds_pkey */
  id: twitter_feedsId;

  title: string;

  keyword: string | null;

  sources: string | null;
}

export interface twitter_feedsInitializer {
  /** Primary key. Index: twitter_feeds_pkey */
  id: twitter_feedsId;

  title: string;

  keyword?: string | null;

  sources?: string | null;
}
