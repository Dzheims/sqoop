// @generated
// Automatically generated. Don't change this file manually.

export type twitter_sourcesId = number & { ' __flavor'?: 'twitter_sources' };

export default interface twitter_sources {
  /** Primary key. Index: twitter_accounts_pkey */
  account_id: twitter_sourcesId;

  /** Index: twitter_accounts_account_name_key */
  account_name: string;

  /** Index: twitter_accounts_account_username_key */
  account_username: string;
}

export interface twitter_sourcesInitializer {
  /** Primary key. Index: twitter_accounts_pkey */
  account_id: twitter_sourcesId;

  /** Index: twitter_accounts_account_name_key */
  account_name: string;

  /** Index: twitter_accounts_account_username_key */
  account_username: string;
}
