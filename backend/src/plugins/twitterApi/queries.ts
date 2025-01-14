import keyword_extractor from 'keyword-extractor';
const camelcaseKeys = require('camelcase-keys');
const fetch = require('node-fetch');
require('dotenv').config();

interface searchParams {
  keyword: string;
  sources: string[] | string;
}

interface searchAllTweetsParams {
  keyword: string;
  sources: string;
  fromDate: string;
  toDate: string;
}

interface tweetLookupParams {
  id: string;
}

interface twitter_account_username {
  account_username: string;
}

export const queryFormatter = ({ keyword, sources }: searchParams) => {
  if (!sources.length) return keyword;
  const formattedSources =
    typeof sources === 'string'
      ? `from:${sources}`
      : sources.map((value) => `from:${value.replace(/^@*/, '')}`).join(' OR ');
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
      if (!jwtClaims) throw new Error('Unauthorized user');

      await pgClient.query(
        `DELETE FROM twitter_recent_search_requests WHERE keyword = $1 AND sources = $2 AND created_at < Now() - INTERVAL '3 MINUTES'`,
        [keyword || '', sources || '']
      );

      const {
        rows: [request],
      } = await pgClient.query(
        `SELECT * FROM twitter_recent_search_requests WHERE keyword = $1 AND sources = $2`,
        [keyword || '', sources || '']
      );

      if (request) {
        const { rows: twitterRecentSearchCache } = await pgClient.query(
          `SELECT
            twitter_recent_search_cache.tweet_id,
            twitter_recent_search_cache.author_id,
            twitter_recent_search_cache.published_at,
            twitter_recent_search_cache.text,
            twitter_recent_search_cache.name,
            twitter_recent_search_cache.profile_image_url,
            twitter_recent_search_cache.username,
            twitter_recent_search_cache.verified,
            twitter_recent_search_cache.suggested_keywords,
            to_jsonb(array_remove(array_agg(twitter_recent_search_cache_photos), NULL)) AS photos
          FROM
            twitter_recent_search_cache
          LEFT JOIN
            twitter_recent_search_cache_photos
          ON
            twitter_recent_search_cache.id = twitter_recent_search_cache_photos.twitter_recent_search_cache_id
          WHERE
            twitter_recent_search_request_id = $1
          GROUP BY
            twitter_recent_search_cache.id,
            twitter_recent_search_cache.tweet_id,
            twitter_recent_search_cache.author_id,
            twitter_recent_search_cache.published_at,
            twitter_recent_search_cache.text,
            twitter_recent_search_cache.name,
            twitter_recent_search_cache.profile_image_url,
            twitter_recent_search_cache.username,
            twitter_recent_search_cache.verified,
            twitter_recent_search_cache.suggested_keywords
          ORDER BY
            twitter_recent_search_cache.id`,
          [request.id]
        );
        return camelcaseKeys(twitterRecentSearchCache, { deep: true });
      }

      const { rows } = await pgClient.query(
        `SELECT account_username FROM twitter_sources`
      );
      const defaultSources: string[] = rows.map(
        (value: twitter_account_username) => value.account_username
      );
      const queryParams = new URLSearchParams();
      queryParams.set(
        'query',
        queryFormatter({
          sources:
            !sources || sources[0] === ''
              ? defaultSources.slice(0, 26)
              : sources,
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

      if (result.error) throw new Error(result.error.message);

      const {
        rows: [twitter_recent_search_request_id],
      } = await pgClient.query(
        `INSERT INTO twitter_recent_search_requests (keyword, sources) VALUES ($1, $2) RETURNING id`,
        [keyword || '', sources || '']
      );

      const searchTweets = result.data
        ? result.data.map((tweet: any) => {
            const suggestedKeywords = keyword_extractor.extract(tweet.text, {
              language: 'english',
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: true,
            });

            const photos = tweet?.attachments?.media_keys
              ? tweet.attachments.media_keys.map((attachment: any) => {
                  for (var media of result.includes.media) {
                    if (media.media_key === attachment)
                      return camelcaseKeys(media);
                  }
                })
              : [];

            for (var user of result.includes.users) {
              if (user.id === tweet.author_id) {
                const { id, ...userInfo } = user;
                const {
                  id: tweetId,
                  created_at: publishedAt,
                  ...tweetInfo
                } = tweet;
                return {
                  tweetId,
                  publishedAt,
                  ...tweetInfo,
                  ...userInfo,
                  photos,
                  suggestedKeywords,
                };
              }
            }
          })
        : [];
      searchTweets.map(async (tweet: any) => {
        const {
          rows: [cacheId],
        } = await pgClient.query(
          `INSERT INTO twitter_recent_search_cache (tweet_id, author_id, published_at, text, name, profile_image_url, username, verified, twitter_recent_search_request_id, suggested_keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
          [
            tweet.tweetId,
            tweet.author_id,
            tweet.publishedAt,
            tweet.text,
            tweet.name,
            tweet.profile_image_url,
            tweet.username,
            tweet.verified,
            twitter_recent_search_request_id.id,
            tweet.suggestedKeywords,
          ]
        );
        tweet?.photos?.map(async (photo: any) => {
          await pgClient.query(
            `INSERT INTO twitter_recent_search_cache_photos (media_key, type, url, twitter_recent_search_cache_id) VALUES ($1, $2, $3, $4)`,
            [photo.mediaKey, photo.type, photo.url, cacheId.id]
          );
        });
      });
      return camelcaseKeys(searchTweets);
    },
    searchAllTweets: async (
      _: any,
      args: searchAllTweetsParams,
      context: any
    ) => {
      const { keyword, sources, fromDate, toDate } = args;
      const { pgClient, jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

      const { rows } = await pgClient.query(
        `SELECT account_username FROM twitter_sources`
      );
      const defaultSources: string[] = rows.map(
        (value: twitter_account_username) => value.account_username
      );
      const queryParams = new URLSearchParams();
      queryParams.set(
        'query',
        queryFormatter({
          sources: sources || defaultSources.slice(19, 26),
          keyword: keyword || '',
        })
      );
      queryParams.set('maxResults', '100');
      if (fromDate) queryParams.set('fromDate', fromDate);
      if (toDate) queryParams.set('toDate', toDate);

      const response = await fetch(
        `https://api.twitter.com/1.1/tweets/search/30day/dev.json?${queryParams}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          },
        }
      );
      const result = await response.json();

      if (result.error) throw new Error(result.error.message);

      const searchAllTweets = result.results
        ? result.results.map((tweet: any) => {
            const suggestedKeywords = keyword_extractor.extract(tweet.text, {
              language: 'english',
              remove_digits: true,
              return_changed_case: true,
              remove_duplicates: true,
            });

            const photos = tweet.extended_tweet?.entities?.media
              ? tweet.extended_tweet?.entities?.media?.map((media: any) => {
                  const { media_url: url, id_str: mediaKey, type } = media;
                  return { url, mediaKey, type };
                })
              : [];

            const {
              id: author_id,
              screen_name: username,
              name,
              verified,
              profile_image_url,
            } = tweet.user;
            const { id_str: tweetId, created_at: publishedAt, text } = tweet;
            return {
              tweetId,
              publishedAt,
              text,
              author_id,
              username,
              name,
              verified,
              profile_image_url,
              photos,
              suggestedKeywords,
            };
          })
        : [];
      return camelcaseKeys(searchAllTweets);
    },
    tweetLookup: async (_: any, args: tweetLookupParams, context: any) => {
      const { id } = args;
      const { jwtClaims } = context;
      if (!jwtClaims) throw new Error('Unauthorized user');

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

      if (result.error) throw new Error(result.error.message);

      const { created_at: publishedAt, ...tweetInfo } = result.data;
      const photos = result.includes.media || [];
      const {
        users: [
          {
            id: { userId },
            ...userInfo
          },
        ],
      } = result.includes;
      const suggestedKeywords = keyword_extractor.extract(tweetInfo.text, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      });
      return camelcaseKeys({
        ...tweetInfo,
        publishedAt,
        photos,
        ...userInfo,
        suggestedKeywords,
      });
    },
  },
};

export default resolvers;
