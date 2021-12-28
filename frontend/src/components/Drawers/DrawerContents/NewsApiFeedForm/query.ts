import { gql } from '@apollo/client';

export const CREATE_NEWS_FEED = gql`
  mutation createNewsFeed($input: CreateNewsFeedInput!) {
    createNewsFeed(input: $input) {
      newsFeed {
        id
        title
        createdAt
      }
    }
  }
`;
export const NEWS_SOURCES = gql`
  query newsSource {
    topHeadlinesSources {
      name
      id
    }
  }
`;
