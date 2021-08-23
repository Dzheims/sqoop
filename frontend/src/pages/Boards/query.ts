import { gql } from '@apollo/client';

export const GET_NEWS_API_CONTENTS_QUERY = gql`
  query getNewsAPIContents {
    topHeadlines {
      author
      title
      description
      url
      urlToImage
      publishedAt
      content
      source {
        id
        name
      }
    }
  }
`;

export default GET_NEWS_API_CONTENTS_QUERY;
