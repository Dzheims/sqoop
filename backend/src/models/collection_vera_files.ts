// @generated
// Automatically generated. Don't change this file manually.

import { collectionsId } from './collections';

export type collection_vera_filesId = number & {
  ' __flavor'?: 'collection_vera_files';
};

export default interface collection_vera_files {
  /** Primary key. Index: collection_vera_files_pkey */
  id: collection_vera_filesId;

  author: string | null;

  category: string | null;

  date: string | null;

  date_text: string | null;

  description: string | null;

  image_style: string | null;

  image_url: string | null;

  url: string | null;

  title: string | null;

  /** Index: collection_vera_files_collection_id_idx */
  collection_id: collectionsId;

  created_at: Date;
}

export interface collection_vera_filesInitializer {
  /** Primary key. Index: collection_vera_files_pkey */
  id: collection_vera_filesId;

  author?: string | null;

  category?: string | null;

  date?: string | null;

  date_text?: string | null;

  description?: string | null;

  image_style?: string | null;

  image_url?: string | null;

  url?: string | null;

  title?: string | null;

  /** Index: collection_vera_files_collection_id_idx */
  collection_id: collectionsId;

  /** Default value: now() */
  created_at?: Date;
}
