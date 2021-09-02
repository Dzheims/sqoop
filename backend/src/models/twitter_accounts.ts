// @generated
// Automatically generated. Don't change this file manually.

export type twitter_accountsId = number & { ' __flavor'?: 'twitter_accounts' };

export default interface twitter_accounts {
  /** Primary key. Index: twitter_accounts_pkey */
  account_id: twitter_accountsId;

  /** Index: twitter_accounts_account_name_key */
  account_name: string;

  /** Index: twitter_accounts_account_username_key */
  account_username: string;
}

export interface twitter_accountsInitializer {
  /** Primary key. Index: twitter_accounts_pkey */
  account_id: twitter_accountsId;

  /** Index: twitter_accounts_account_name_key */
  account_name: string;

  /** Index: twitter_accounts_account_username_key */
  account_username: string;
}
