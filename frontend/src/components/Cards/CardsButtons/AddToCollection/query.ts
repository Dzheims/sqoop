import { gql } from '@apollo/client';

export const SAVE_TWEET_TO_COLLECTION = gql`
  mutation saveTweetToCollection($input: CreateCollectionTweetInput!) {
    createCollectionTweet(input: $input) {
      collection {
        title
      }
    }
  }
`;

export const SAVE_ARTICLE_TO_COLLECTION = gql`
  mutation saveArticleToCollection($input: CreateCollectionArticleInput!) {
    createCollectionArticle(input: $input) {
      collection {
        title
      }
    }
  }
`;
export const SAVE_VERA_FILE_TO_COLLECTION = gql`
  mutation saveVeraFileToCollection($input: CreateCollectionVeraFileInput!) {
    createCollectionVeraFile(input: $input) {
      collection {
        title
      }
    }
  }
`;

export const SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION = gql`
  mutation saveGoogleFactCheckToCollection(
    $input: CreateCollectionGoogleFactCheckInput!
  ) {
    createCollectionGoogleFactCheck(input: $input) {
      collection {
        title
      }
    }
  }
`;
