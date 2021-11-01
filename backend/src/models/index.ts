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
import twitter_feeds, {
  twitter_feedsInitializer,
  twitter_feedsId,
} from './twitter_feeds';
import twitter_local_sources, {
  twitter_local_sourcesInitializer,
  twitter_local_sourcesId,
} from './twitter_local_sources';
import twitter_sources, {
  twitter_sourcesInitializer,
  twitter_sourcesId,
} from './twitter_sources';
import users, { usersInitializer, usersId } from './users';
import category from './category';
import jwt_token from './jwt_token';

type Model =
  | collection_tweets
  | collections
  | news_feeds
  | twitter_feeds
  | twitter_local_sources
  | twitter_sources
  | users;

interface ModelTypeMap {
  collection_tweets: collection_tweets;
  collections: collections;
  news_feeds: news_feeds;
  twitter_feeds: twitter_feeds;
  twitter_local_sources: twitter_local_sources;
  twitter_sources: twitter_sources;
  users: users;
}

type ModelId =
  | collection_tweetsId
  | collectionsId
  | news_feedsId
  | twitter_feedsId
  | twitter_local_sourcesId
  | twitter_sourcesId
  | usersId;

interface ModelIdTypeMap {
  collection_tweets: collection_tweetsId;
  collections: collectionsId;
  news_feeds: news_feedsId;
  twitter_feeds: twitter_feedsId;
  twitter_local_sources: twitter_local_sourcesId;
  twitter_sources: twitter_sourcesId;
  users: usersId;
}

type Initializer =
  | collection_tweetsInitializer
  | collectionsInitializer
  | news_feedsInitializer
  | twitter_feedsInitializer
  | twitter_local_sourcesInitializer
  | twitter_sourcesInitializer
  | usersInitializer;

interface InitializerTypeMap {
  collection_tweets: collection_tweetsInitializer;
  collections: collectionsInitializer;
  news_feeds: news_feedsInitializer;
  twitter_feeds: twitter_feedsInitializer;
  twitter_local_sources: twitter_local_sourcesInitializer;
  twitter_sources: twitter_sourcesInitializer;
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
  twitter_feeds,
  twitter_feedsInitializer,
  twitter_feedsId,
  twitter_local_sources,
  twitter_local_sourcesInitializer,
  twitter_local_sourcesId,
  twitter_sources,
  twitter_sourcesInitializer,
  twitter_sourcesId,
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
