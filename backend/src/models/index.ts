// @generated
// Automatically generated. Don't change this file manually.

import twitter_accounts, {
  twitter_accountsInitializer,
  twitter_accountsId,
} from './twitter_accounts';
import users, { usersInitializer, usersId } from './users';
import jwt_token from './jwt_token';

type Model = twitter_accounts | users;

interface ModelTypeMap {
  twitter_accounts: twitter_accounts;
  users: users;
}

type ModelId = twitter_accountsId | usersId;

interface ModelIdTypeMap {
  twitter_accounts: twitter_accountsId;
  users: usersId;
}

type Initializer = twitter_accountsInitializer | usersInitializer;

interface InitializerTypeMap {
  twitter_accounts: twitter_accountsInitializer;
  users: usersInitializer;
}

export type {
  twitter_accounts,
  twitter_accountsInitializer,
  twitter_accountsId,
  users,
  usersInitializer,
  usersId,
  jwt_token,
  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap,
};
