// @generated
// Automatically generated. Don't change this file manually.

import news_feeds, { news_feedsInitializer, news_feedsId } from './news_feeds';
import twitter_accounts, {
  twitter_accountsInitializer,
  twitter_accountsId,
} from './twitter_accounts';
import twitter_feeds, {
  twitter_feedsInitializer,
  twitter_feedsId,
} from './twitter_feeds';
import users, { usersInitializer, usersId } from './users';
import category from './category';
import jwt_token from './jwt_token';

type Model = news_feeds | twitter_accounts | twitter_feeds | users;

interface ModelTypeMap {
  news_feeds: news_feeds;
  twitter_accounts: twitter_accounts;
  twitter_feeds: twitter_feeds;
  users: users;
}

type ModelId = news_feedsId | twitter_accountsId | twitter_feedsId | usersId;

interface ModelIdTypeMap {
  news_feeds: news_feedsId;
  twitter_accounts: twitter_accountsId;
  twitter_feeds: twitter_feedsId;
  users: usersId;
}

type Initializer =
  | news_feedsInitializer
  | twitter_accountsInitializer
  | twitter_feedsInitializer
  | usersInitializer;

interface InitializerTypeMap {
  news_feeds: news_feedsInitializer;
  twitter_accounts: twitter_accountsInitializer;
  twitter_feeds: twitter_feedsInitializer;
  users: usersInitializer;
}

export type {
  news_feeds,
  news_feedsInitializer,
  news_feedsId,
  twitter_accounts,
  twitter_accountsInitializer,
  twitter_accountsId,
  twitter_feeds,
  twitter_feedsInitializer,
  twitter_feedsId,
  users,
  usersInitializer,
  usersId,
  category,
  jwt_token,
  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap,
};
