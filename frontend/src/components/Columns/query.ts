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
        id
        tweetId
        collectionId
      }
      ... on CollectionArticle {
        id
        description
        publishedAt
        sourceName
        title
        url
        urlToImage
        collectionId
      }
      ... on CollectionVeraFile {
        id
        author
        category
        createdAt
        date
        dateText
        description
        imageStyle
        imageUrl
        title
        url
        collectionId
      }
      ... on CollectionGoogleFactCheck {
        id
        claimDate
        claimant
        createdAt
        languageCode
        publisherName
        publisherSite
        reviewDate
        text
        textualRating
        title
        url
        collectionId
      }
    }
  }
`;

export const COLLECTION_TWEETS = gql`
  query CollectionTweets($id: String!) {
    tweetLookup(id: $id) {
      authorId
      createdAt
      tweetId
      name
      photos {
        mediaKey
        type
        url
      }
      profileImageUrl
      suggestedKeywords
      text
      username
      verified
    }
  }
`;
