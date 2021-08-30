import { twitter_accounts } from '../../models';
import { Client } from 'pg';
const fetch = require('node-fetch');
require('dotenv').config();

interface searchParams {
  query: string;
}

interface twitter_account_username {
  account_username: string;
}

export const querySourceFormatter = (sources: string[]) => {
  return sources.map((value) => `from:${value}`).join(' OR ');
};

export const resolvers = {
  Query: {
    searchTweets: async (_: any, args: searchParams, context: any) => {
      const { query } = args;
      const { pgClient } = context;
      const { rows } = await pgClient.query(
        `SELECT account_username FROM twitter_accounts`
      );
      const sources: string[] = rows.map(
        (value: twitter_account_username) => value.account_username
      );
      const queryParams = new URLSearchParams();
      queryParams.set('query', query || querySourceFormatter(sources));
      queryParams.set('max_results', '50');
      queryParams.set('expansions', 'attachments.media_keys,author_id');
      queryParams.set('tweet.fields', 'created_at');
      queryParams.set('media.fields', 'preview_image_url,media_key,url');
      queryParams.set('user.fields', 'profile_image_url,name,username');
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
      const searchTweets = result.data.map((tweet: any) => {
        for (var user of result.includes.users) {
          if (user.id === tweet.author_id) return { ...tweet, ...user };
        }
      });
      return searchTweets;
    },
  },
};

export default resolvers;
