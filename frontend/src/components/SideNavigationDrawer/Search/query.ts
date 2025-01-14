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

export const SEARCH_TWITTER_CONTENTS_QUERY = gql`
  query searchAllTweets(
    $fromDate: String
    $keyword: [String!]!
    $sources: [String]
    $toDate: String
  ) {
    searchAllTweets(
      keyword: $keyword
      sources: $sources
      fromDate: $fromDate
      toDate: $toDate
    ) {
      authorId
      publishedAt
      tweetId
      name
      photos {
        mediaKey
        type
        url
      }
      profileImageUrl
      suggestedKeywords
      text
      username
      verified
    }
  }
`;
