import { gql } from '@apollo/client';

const CREATE_TWITTER_FEED = gql`
  mutation MyMutation {
    createTwitterFeed(
      input: { twitterFeed: { title: "", keyword: "", sources: "" } }
    ) {
      twitterFeed {
        id
      }
    }
  }
`;

export default CREATE_TWITTER_FEED;
