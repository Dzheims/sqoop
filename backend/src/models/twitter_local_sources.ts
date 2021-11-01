// @generated
// Automatically generated. Don't change this file manually.

export type twitter_local_sourcesId = number & {
  ' __flavor'?: 'twitter_local_sources';
};

export default interface twitter_local_sources {
  /** Primary key. Index: twitter_local_sources_pkey */
  account_id: twitter_local_sourcesId;

  /** Index: twitter_local_sources_account_name_key */
  account_name: string;

  /** Index: twitter_local_sources_account_username_key */
  account_username: string;
}

export interface twitter_local_sourcesInitializer {
  /** Primary key. Index: twitter_local_sources_pkey */
  account_id: twitter_local_sourcesId;

  /** Index: twitter_local_sources_account_name_key */
  account_name: string;

  /** Index: twitter_local_sources_account_username_key */
  account_username: string;
}
