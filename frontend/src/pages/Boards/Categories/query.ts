import { gql } from '@apollo/client';

export const GET_NEWS_API_DATA_QUERY = gql`
  query getNewsApiData(
    $category: Categories
    $country: String
    $keyword: String
    $sources: String
  ) {
    topHeadlines(
      category: $category
      country: $country
      sources: $sources
      keyword: $keyword
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
