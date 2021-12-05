// @generated
// Automatically generated. Don't change this file manually.

import { top_headlines_requestsId } from './top_headlines_requests';

export type top_headlines_cacheId = number & {
  ' __flavor'?: 'top_headlines_cache';
};

export default interface top_headlines_cache {
  /** Primary key. Index: top_headlines_pkey */
  id: top_headlines_cacheId;

  author: string | null;

  content: string | null;

  description: string | null;

  published_at: string | null;

  source_name: string | null;

  source_id: string | null;

  title: string | null;

  url: string | null;

  url_to_image: string | null;

  /** Index: top_headlines_cache_top_headlines_request_id_idx */
  top_headlines_request_id: top_headlines_requestsId;
}

export interface top_headlines_cacheInitializer {
  /** Primary key. Index: top_headlines_pkey */
  id: top_headlines_cacheId;

  author?: string | null;

  content?: string | null;

  description?: string | null;

  published_at?: string | null;

  source_name?: string | null;

  source_id?: string | null;

  title?: string | null;

  url?: string | null;

  url_to_image?: string | null;

  /** Index: top_headlines_cache_top_headlines_request_id_idx */
  top_headlines_request_id: top_headlines_requestsId;
}
