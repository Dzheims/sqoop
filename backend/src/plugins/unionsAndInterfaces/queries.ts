import { collectionContent } from './schema';

const camelcaseKeys = require('camelcase-keys');

interface columnProps {
  id: BigInteger;
  title: String;
  category: String;
  country: String;
  keyword: String;
  sources: String;
}

export const resolvers = (getNamedType: any) => {
  return {
    ColumnResult: {
      __resolveType(column: columnProps) {
        if ('category' in column) return 'NewsFeed';
        if ('sources' in column) return 'TwitterFeed';
        return 'Collection';
      },
    },
    CollectionContent: {
      __resolveType(keys: any) {
        if ('tweetId' in keys) return 'CollectionTweet';
        if ('urlToImage' in keys) return 'CollectionArticle';
        if ('claimant' in keys) return 'CollectionGoogleFactCheck';
        if ('mediaKey' in keys) return 'CollectionTweetPhotos';
        return 'CollectionVeraFile';
      },
    },
    Query: {
      getColumnResult: async (_: any, args: any, context: any) => {
        const { pgClient } = context;
        const { rows: newsFeeds } = await pgClient.query(
          `SELECT * FROM news_feeds WHERE user_id = current_user_id()`
        );
        const { rows: twitterFeeds } = await pgClient.query(
          `SELECT * FROM twitter_feeds WHERE user_id = current_user_id()`
        );
        const { rows: collections } = await pgClient.query(
          `SELECT * FROM collections WHERE user_id = current_user_id()`
        );
        const result = camelcaseKeys(
          [...newsFeeds, ...twitterFeeds, ...collections].sort(
            (a: any, b: any) => a.created_at - b.created_at
          )
        );
        return result;
      },
      collectionContents: async (_: any, args: any, context: any) => {
        const { pgClient } = context;
        const { collectionId } = args;

        const { rows: collectionTweets } = await pgClient.query(
          `SELECT
            collection_tweets.*,
            to_jsonb(array_remove(array_agg(collection_tweet_photos), NULL)) AS "@photos"
          FROM
            collection_tweets
          LEFT JOIN
            collection_tweet_photos
          ON
            collection_tweets.id = collection_tweet_photos.collection_tweet_id
          WHERE
            collection_id = ${collectionId}
          GROUP BY
            collection_tweets.id,
            collection_tweets.tweet_id,
            collection_tweets.author_id,
            collection_tweets.published_at,
	          collection_tweets.created_at,
            collection_tweets.text,
            collection_tweets.name,
            collection_tweets.profile_image_url,
            collection_tweets.username,
            collection_tweets.verified,
            collection_tweets.suggested_keywords,
            collection_tweets.collection_id`
        );
        const { rows: collectionArticles } = await pgClient.query(
          `SELECT * FROM collection_articles WHERE collection_id = ${collectionId}`
        );
        const { rows: collectionVeraFile } = await pgClient.query(
          `SELECT * FROM collection_vera_files WHERE collection_id = ${collectionId}`
        );
        const { rows: collectionGoogleFactCheck } = await pgClient.query(
          `SELECT * FROM collection_google_fact_check WHERE collection_id = ${collectionId}`
        );
        const result = camelcaseKeys(
          [
            ...collectionTweets,
            ...collectionArticles,
            ...collectionVeraFile,
            ...collectionGoogleFactCheck,
          ].sort((a: any, b: any) => a.created_at - b.created_at),
          { deep: true }
        );
        return result;
      },
    },
  };
};
