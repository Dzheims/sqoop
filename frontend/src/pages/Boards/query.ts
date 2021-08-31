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
      sourceId
      sourceName
    }
  }
`;

export const GET_TWITTER_API_CONTENTS_QUERY = gql`
  query getTwitterAPIContents {
    searchTweets {
      id
      text
    }
  }
`;
