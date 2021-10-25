import { gql } from '@apollo/client';

export const SEARCH_NEWS_API_CONTENTS_QUERY = gql`
  query searchNewsApiContents(
    $keyword: String!
    $sources: String
    $from: String
    $to: String
  ) {
    searchArticles(keyword: $keyword, sources: $sources, from: $from, to: $to) {
      author
      content
      description
      publishedAt
      sourceId
      sourceName
      suggestedKeywords
      title
      url
      urlToImage
    }
  }
`;

export default SEARCH_NEWS_API_CONTENTS_QUERY;
