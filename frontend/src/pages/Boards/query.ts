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
      suggestedKeywords
      title
      url
      urlToImage
    }
  }
`;

export const GET_TWITTER_API_CONTENTS_QUERY = gql`
  query getTwitterAPIContents($keyword: [String], $sources: [String]) {
    searchTweets(keyword: $keyword, sources: $sources) {
      author_id
      created_at
      name
      photos {
        media_key
        type
        url
      }
      suggestedKeywords
      profile_image_url
      text
      username
      verified
    }
  }
`;

export const GET_GOOGLE_FACT_CHECK_SEARCH_QUERY = gql`
  query getGoogleFactCheckSearch($keyword: String) {
    googleFactCheckSearch(keyword: $keyword) {
      claimDate
      claimant
      text
      claimReview {
        languageCode
        reviewDate
        textualRating
        title
        url
        publisher {
          name
          site
        }
      }
    }
  }
`;
