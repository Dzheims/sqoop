// @generated
// Automatically generated. Don't change this file manually.

import category from './category';

export type top_headlines_requestsId = number & {
  ' __flavor'?: 'top_headlines_requests';
};

export default interface top_headlines_requests {
  /** Primary key. Index: top_headlines_requests_pkey */
  id: top_headlines_requestsId;

  category: category | null;

  country: string | null;

  keyword: string | null;

  sources: string | null;

  created_at: Date;
}

export interface top_headlines_requestsInitializer {
  /** Primary key. Index: top_headlines_requests_pkey */
  id: top_headlines_requestsId;

  category?: category | null;

  country?: string | null;

  keyword?: string | null;

  sources?: string | null;

  /** Default value: now() */
  created_at?: Date;
}
