import { gql } from '@apollo/client';

export const GET_COLUMNS_QUERY = gql`
  query getColumns {
    getColumnResult {
      ... on TwitterFeed {
        id
        keyword
        sources
        title
        createdAt
      }
      ... on NewsFeed {
        id
        country
        category
        keyword
        sources
        title
        createdAt
      }
      ... on Collection {
        title
        id
        createdAt
      }
    }
  }
`;

export const DELETE_TWITTER_MUTATION = gql`
  mutation deleteTwitter($input: DeleteTwitterFeedInput!) {
    deleteTwitterFeed(input: $input) {
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_NEWS_MUTATION = gql`
  mutation deleteNews($input: DeleteNewsFeedInput!) {
    deleteNewsFeed(input: $input) {
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_COLLECTION_MUTATION = gql`
  mutation deleteCollection($input: DeleteCollectionInput!) {
    deleteCollection(input: $input) {
      user {
        id
        username
      }
    }
  }
`;

export const COLLECTION_CONTENTS_QUERY = gql`
  query collectionContents($collectionId: Int!) {
    collectionContents(collectionId: $collectionId) {
      ... on CollectionTweet {
        tweetId
      }
      ... on CollectionArticle {
        description
        publishedAt
        sourceName
        title
        url
        urlToImage
      }
    }
  }
`;

export const COLLECTION_TWEETS = gql`
  query CollectionTweets($id: String!) {
    tweetLookup(id: $id) {
      author_id
      created_at
      id
      name
      photos {
        media_key
        type
        url
      }
      profile_image_url
      suggestedKeywords
      text
      username
      verified
    }
  }
`;
