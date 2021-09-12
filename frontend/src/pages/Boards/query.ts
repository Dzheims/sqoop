import { gql } from '@apollo/client';

export const GET_NEWS_API_CONTENTS_QUERY = gql`
  query getNewsAPIContents(
    $category: Category
    $country: String
    $keyword: String
    $sources: String
  ) {
    topHeadlines(
      category: $category
      country: $country
      keyword: $keyword
      sources: $sources
    ) {
      author
      content
      description
      publishedAt
      sourceId
      sourceName
      title
      url
      urlToImage
    }
  }
`;

export const GET_TWITTER_API_CONTENTS_QUERY = gql`
  query getTwitterAPIContents {
    searchTweets {
      author_id
      created_at
      name
      photos {
        media_key
        type
        url
      }
      profile_image_url
      text
      username
      verified
    }
  }
`;
