// @generated
// Automatically generated. Don't change this file manually.

import { collectionsId } from './collections';

export type collection_articlesId = number & {
  ' __flavor'?: 'collection_articles';
};

export default interface collection_articles {
  /** Primary key. Index: collection_articles_pkey */
  id: collection_articlesId;

  description: string | null;

  published_at: string | null;

  source_name: string | null;

  title: string;

  url: string | null;

  url_to_image: string | null;

  /** Index: collection_articles_collection_id_idx */
  collection_id: collectionsId;
}

export interface collection_articlesInitializer {
  /** Primary key. Index: collection_articles_pkey */
  id: collection_articlesId;

  description?: string | null;

  published_at?: string | null;

  source_name?: string | null;

  title: string;

  url?: string | null;

  url_to_image?: string | null;

  /** Index: collection_articles_collection_id_idx */
  collection_id: collectionsId;
}
