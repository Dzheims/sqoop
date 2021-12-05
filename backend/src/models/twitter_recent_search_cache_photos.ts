// @generated
// Automatically generated. Don't change this file manually.

import { twitter_recent_search_cacheId } from './twitter_recent_search_cache';

export type twitter_recent_search_cache_photosId = number & {
  ' __flavor'?: 'twitter_recent_search_cache_photos';
};

export default interface twitter_recent_search_cache_photos {
  /** Primary key. Index: twitter_recent_search_cache_photos_pkey */
  id: twitter_recent_search_cache_photosId;

  media_key: string | null;

  type: string | null;

  url: string | null;

  /** Index: twitter_recent_search_cache_p_twitter_recent_search_cache_i_idx */
  twitter_recent_search_cache_id: twitter_recent_search_cacheId;
}

export interface twitter_recent_search_cache_photosInitializer {
  /** Primary key. Index: twitter_recent_search_cache_photos_pkey */
  id: twitter_recent_search_cache_photosId;

  media_key?: string | null;

  type?: string | null;

  url?: string | null;

  /** Index: twitter_recent_search_cache_p_twitter_recent_search_cache_i_idx */
  twitter_recent_search_cache_id: twitter_recent_search_cacheId;
}
