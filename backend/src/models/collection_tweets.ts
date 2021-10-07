// @generated
// Automatically generated. Don't change this file manually.

import { collectionsId } from './collections';

export type collection_tweetsId = number & {
  ' __flavor'?: 'collection_tweets';
};

export default interface collection_tweets {
  /** Primary key. Index: collection_tweets_pkey */
  id: collection_tweetsId;

  tweet_id: string;

  /** Index: collection_tweets_collection_id_idx */
  collection_id: collectionsId;
}

export interface collection_tweetsInitializer {
  /** Primary key. Index: collection_tweets_pkey */
  id: collection_tweetsId;

  tweet_id: string;

  /** Index: collection_tweets_collection_id_idx */
  collection_id: collectionsId;
}
