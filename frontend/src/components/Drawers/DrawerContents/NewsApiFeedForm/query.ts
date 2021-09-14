import { gql } from '@apollo/client';

const CREATE_NEWS_FEED = gql`
  mutation createNewsFeed($input: CreateNewsFeedInput!) {
    createNewsFeed(input: $input) {
      newsFeed {
        id
      }
    }
  }
`;

export default CREATE_NEWS_FEED;
