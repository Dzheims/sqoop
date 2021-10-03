import { twitter_accounts } from '../../models';
import { Client } from 'pg';
import keyword_extractor from 'keyword-extractor';
const fetch = require('node-fetch');
require('dotenv').config();

interface searchParams {
  keyword: string;
  sources: string[];
}

interface tweetLookupParams {
  id: string;
}

interface twitter_account_username {
  account_username: string;
}

export const queryFormatter = ({ keyword, sources }: searchParams) => {
  if (!sources.length) return keyword;
  const formattedSources = sources
    .map((value) => `from:${value.replace(/^@*/, '')}`)
    .join(' OR ');
  if (!keyword) return `(${formattedSources})`;
  return `${keyword} (${formattedSources})`;
};

const options = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
  },
};

export const resolvers = {
  Query: {
    searchTweets: async (_: any, args: searchParams, context: any) => {
      const { keyword, sources } = args;
      const { pgClient, jwtClaims } = context;
      if (!jwtClaims) throw new Error();
      const { rows } = await pgClient.query(
        `SELECT account_username FROM twitter_accounts`
      );
      const defaultSources: string[] = rows.map(
        (value: twitter_account_username) => value.account_username
      );
      const queryParams = new URLSearchParams();
      queryParams.set(
        'query',
        queryFormatter({
          sources: sources || defaultSources,
          keyword: keyword || '',
        })
      );
      queryParams.set('max_results', '100');
      queryParams.set('expansions', 'attachments.media_keys,author_id');
      queryParams.set('tweet.fields', 'created_at');
      queryParams.set('media.fields', 'preview_image_url,media_key,url');
      queryParams.set(
        'user.fields',
        'profile_image_url,name,username,verified'
      );
      const response = await fetch(
        `https://api.twitter.com/2/tweets/search/recent?${queryParams}`,
        options
      );
      const result = await response.json();
      const searchTweets = result.data
        ? result.data.map((tweet: any) => {
            const suggestedKeywords = keyword_extractor.extract(tweet.text, {
              language: 'english',
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: true,
            });
            const photos = tweet.attachments
              ? tweet.attachments.media_keys.map((attachment: any) => {
                  for (var media of result.includes.media) {
                    if (media.media_key === attachment) return media;
                  }
                })
              : [];

            for (var user of result.includes.users) {
              if (user.id === tweet.author_id) {
                const { id, ...userInfo } = user;
                return {
                  ...tweet,
                  ...userInfo,
                  photos,
                  suggestedKeywords,
                };
              }
            }
          })
        : [];
      return searchTweets;
    },
    tweetLookup: async (_: any, args: tweetLookupParams, context: any) => {
      const { id } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error();
      const queryParams = new URLSearchParams();
      queryParams.set('expansions', 'attachments.media_keys,author_id');
      queryParams.set('tweet.fields', 'created_at');
      queryParams.set('media.fields', 'preview_image_url,media_key,url');
      queryParams.set(
        'user.fields',
        'profile_image_url,name,username,verified'
      );
      const response = await fetch(
        `https://api.twitter.com/2/tweets/${id}?${queryParams}`,
        options
      );
      const result = await response.json();
      const tweet = result.data;
      const photos = result.includes.media || [];
      const {
        users: [
          {
            id: { userId },
            ...userInfo
          },
        ],
      } = result.includes;
      const suggestedKeywords = keyword_extractor.extract(tweet.text, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      });
      return { ...tweet, photos, ...userInfo, suggestedKeywords };
    },
  },
};

export default resolvers;
