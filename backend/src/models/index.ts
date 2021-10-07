// @generated
// Automatically generated. Don't change this file manually.

import collection_tweets, {
  collection_tweetsInitializer,
  collection_tweetsId,
} from './collection_tweets';
import collections, {
  collectionsInitializer,
  collectionsId,
} from './collections';
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

type Model =
  | collection_tweets
  | collections
  | news_feeds
  | twitter_accounts
  | twitter_feeds
  | users;

interface ModelTypeMap {
  collection_tweets: collection_tweets;
  collections: collections;
  news_feeds: news_feeds;
  twitter_accounts: twitter_accounts;
  twitter_feeds: twitter_feeds;
  users: users;
}

type ModelId =
  | collection_tweetsId
  | collectionsId
  | news_feedsId
  | twitter_accountsId
  | twitter_feedsId
  | usersId;

interface ModelIdTypeMap {
  collection_tweets: collection_tweetsId;
  collections: collectionsId;
  news_feeds: news_feedsId;
  twitter_accounts: twitter_accountsId;
  twitter_feeds: twitter_feedsId;
  users: usersId;
}

type Initializer =
  | collection_tweetsInitializer
  | collectionsInitializer
  | news_feedsInitializer
  | twitter_accountsInitializer
  | twitter_feedsInitializer
  | usersInitializer;

interface InitializerTypeMap {
  collection_tweets: collection_tweetsInitializer;
  collections: collectionsInitializer;
  news_feeds: news_feedsInitializer;
  twitter_accounts: twitter_accountsInitializer;
  twitter_feeds: twitter_feedsInitializer;
  users: usersInitializer;
}

export type {
  collection_tweets,
  collection_tweetsInitializer,
  collection_tweetsId,
  collections,
  collectionsInitializer,
  collectionsId,
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
