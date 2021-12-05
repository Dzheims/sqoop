// @generated
// Automatically generated. Don't change this file manually.

import { collectionsId } from './collections';

export type collection_google_fact_checkId = number & {
  ' __flavor'?: 'collection_google_fact_check';
};

export default interface collection_google_fact_check {
  /** Primary key. Index: collection_google_fact_check_pkey */
  id: collection_google_fact_checkId;

  text: string | null;

  claimant: string | null;

  claim_date: string | null;

  publisher_name: string | null;

  publisher_site: string | null;

  url: string | null;

  title: string | null;

  review_date: string | null;

  textual_rating: string | null;

  language_code: string | null;

  /** Index: collection_google_fact_check_collection_id_idx */
  collection_id: collectionsId;

  created_at: Date;
}

export interface collection_google_fact_checkInitializer {
  /** Primary key. Index: collection_google_fact_check_pkey */
  id: collection_google_fact_checkId;

  text?: string | null;

  claimant?: string | null;

  claim_date?: string | null;

  publisher_name?: string | null;

  publisher_site?: string | null;

  url?: string | null;

  title?: string | null;

  review_date?: string | null;

  textual_rating?: string | null;

  language_code?: string | null;

  /** Index: collection_google_fact_check_collection_id_idx */
  collection_id: collectionsId;

  /** Default value: now() */
  created_at?: Date;
}
