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
export default GET_COLUMNS_QUERY;
