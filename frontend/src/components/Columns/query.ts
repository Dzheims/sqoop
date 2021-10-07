import { gql } from '@apollo/client';

export const GET_COLUMNS_QUERY = gql`
  query getColumns {
    getColumnResult {
      ... on TwitterFeed {
        id
        keyword
        sources
        title
      }
      ... on NewsFeed {
        id
        country
        category
        keyword
        sources
        title
      }
      ... on Collection {
        title
        id
      }
    }
  }
`;

export const DELETE_TWITTER_MUTATION = gql`
  mutation deleteTwitter($input: DeleteTwitterFeedInput!) {
    deleteTwitterFeed(input: $input) {
      user {
        userId
        username
      }
    }
  }
`;

export const DELETE_NEWS_MUTATION = gql`
  mutation deleteNews($input: DeleteNewsFeedInput!) {
    deleteNewsFeed(input: $input) {
      user {
        userId
        username
      }
    }
  }
`;
