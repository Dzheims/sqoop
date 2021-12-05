// @generated
// Automatically generated. Don't change this file manually.

export type twitter_recent_search_requestsId = number & {
  ' __flavor'?: 'twitter_recent_search_requests';
};

export default interface twitter_recent_search_requests {
  /** Primary key. Index: twitter_recent_search_requests_pkey */
  id: twitter_recent_search_requestsId;

  keyword: string | null;

  sources: string | null;

  created_at: Date;
}

export interface twitter_recent_search_requestsInitializer {
  /** Primary key. Index: twitter_recent_search_requests_pkey */
  id: twitter_recent_search_requestsId;

  keyword?: string | null;

  sources?: string | null;

  /** Default value: now() */
  created_at?: Date;
}
