import { gql } from '@apollo/client';

const CREATE_TWITTER_FEED = gql`
  mutation createTwitterFeed($input: CreateTwitterFeedInput!) {
    createTwitterFeed(input: $input) {
      twitterFeed {
        id
      }
    }
  }
`;

export default CREATE_TWITTER_FEED;
