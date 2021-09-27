import { gql } from '@apollo/client';

// export const GET_COLUMNS_QUERY = gql`
//   query getColumns {
//     newsFeeds {
//       category
//       country
//       id
//       keyword
//       sources
//       title
//     }
//   }
// `;
// export const GET_COLUMNS_QUERY = gql`
//   query getColumns {
//     twitterFeeds {
//       id
//       keyword
//       sources
//       title
//     }
//   }
// `;
const GET_COLUMNS_QUERY = gql`
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
    }
  }
`;
export default GET_COLUMNS_QUERY;
