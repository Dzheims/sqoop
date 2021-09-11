import { twitter_accounts } from '../../models';
import { Client } from 'pg';
const fetch = require('node-fetch');
require('dotenv').config();

interface searchParams {
  keyword: string;
  sources: string[];
}

interface twitter_account_username {
  account_username: string;
}

export const queryFormatter = ({ keyword, sources }: searchParams) => {
  const formattedSources = sources
    .map((value) => `from:${value.replace(/^@*/, '')}`)
    .join(' OR ');
  return `${keyword} (${formattedSources})`;
};

export const resolvers = {
  Query: {
    searchTweets: async (_: any, args: searchParams, context: any) => {
      const { keyword, sources } = args;
      const { pgClient } = context;
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
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          },
        }
      );
      const result = await response.json();
      const searchTweets = result.data
        ? result.data.map((tweet: any) => {
            const photos = tweet.attachments
              ? tweet.attachments.media_keys.map((attachment: any) => {
                  for (var media of result.includes.media) {
                    if (media.media_key === attachment) return media;
                  }
                })
              : [];

            for (var user of result.includes.users) {
              if (user.id === tweet.author_id)
                return { ...tweet, ...user, ...{ photos } };
            }
          })
        : [];
      return searchTweets;
    },
  },
};

export default resolvers;
