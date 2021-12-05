// @generated
// Automatically generated. Don't change this file manually.

import { twitter_recent_search_requestsId } from './twitter_recent_search_requests';

export type twitter_recent_search_cacheId = number & {
  ' __flavor'?: 'twitter_recent_search_cache';
};

export default interface twitter_recent_search_cache {
  /** Primary key. Index: twitter_recent_search_cache_pkey */
  id: twitter_recent_search_cacheId;

  tweet_id: string | null;

  author_id: string | null;

  created_at: string | null;

  text: string | null;

  name: string | null;

  profile_image_url: string | null;

  username: string | null;

  verified: boolean | null;

  /** Index: twitter_recent_search_cache_twitter_recent_search_request_i_idx */
  twitter_recent_search_request_id: twitter_recent_search_requestsId;
}

export interface twitter_recent_search_cacheInitializer {
  /** Primary key. Index: twitter_recent_search_cache_pkey */
  id: twitter_recent_search_cacheId;

  tweet_id?: string | null;

  author_id?: string | null;

  created_at?: string | null;

  text?: string | null;

  name?: string | null;

  profile_image_url?: string | null;

  username?: string | null;

  verified?: boolean | null;

  /** Index: twitter_recent_search_cache_twitter_recent_search_request_i_idx */
  twitter_recent_search_request_id: twitter_recent_search_requestsId;
}
