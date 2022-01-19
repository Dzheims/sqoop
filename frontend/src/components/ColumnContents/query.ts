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
  query getTwitterAPIContents($keyword: String, $sources: String) {
    searchTweets(keyword: $keyword, sources: $sources) {
      authorId
      publishedAt
      tweetId
      name
      photos {
        mediaKey
        type
        url
      }
      suggestedKeywords
      profileImageUrl
      text
      username
      verified
    }
  }
`;

export const COLLECTION_CONTENTS_QUERY = gql`
  query collectionContents($collectionId: Int!) {
    collectionContents(collectionId: $collectionId) {
      ... on CollectionTweet {
        id
        name
        tweetId
        authorId
        profileImageUrl
        publishedAt
        suggestedKeywords
        text
        username
        verified
        collectionId
        createdAt
        photos {
          mediaKey
          type
          url
        }
      }
      ... on CollectionArticle {
        id
        description
        publishedAt
        sourceName
        title
        url
        urlToImage
        collectionId
        suggestedKeywords
        createdAt
      }
      ... on CollectionVeraFile {
        id
        author
        category
        createdAt
        date
        dateText
        description
        imageStyle
        imageUrl
        title
        url
        collectionId
      }
      ... on CollectionGoogleFactCheck {
        id
        claimDate
        claimant
        createdAt
        languageCode
        publisherName
        publisherSite
        reviewDate
        text
        textualRating
        title
        url
        collectionId
      }
    }
  }
`;
