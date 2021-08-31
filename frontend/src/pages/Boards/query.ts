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

export const GET_TWITTER_API_CONTENTS_QUERY = gql`
  query getTwitterAPIContents {
    searchTweets {
      author_id
      created_at
      id
      name
      profile_image_url
      text
      username
    }
  }
`;
