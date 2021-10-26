import { gql } from '@apollo/client';

export const CREATE_TWITTER_FEED = gql`
  mutation createTwitterFeed($input: CreateTwitterFeedInput!) {
    createTwitterFeed(input: $input) {
      twitterFeed {
        id
        title
      }
    }
  }
`;

export const TWITTER_SOURCES = gql`
  query twitterSources {
    twitterSources {
      accountId
      accountName
      accountUsername
    }
  }
`;
