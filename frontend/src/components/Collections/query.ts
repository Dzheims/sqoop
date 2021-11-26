import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LIST_QUERY = gql`
  query getCollectionsList($condition: CollectionCondition) {
    collections(condition: $condition) {
      id
      title
    }
  }
`;

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

export const DELETE_COLLECTION_CONTENT_VERA_FILE = gql`
  mutation deleteVeraFileContent($id: Int!) {
    deleteCollectionVeraFile(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const DELETE_COLLECTION_CONTENT_TWEET = gql`
  mutation deleteTweetContent($id: Int!) {
    deleteCollectionTweet(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const DELETE_COLLECTION_CONTENT_ARTICLE = gql`
  mutation deleteArticleContent($id: Int!) {
    deleteCollectionArticle(input: { id: $id }) {
      clientMutationId
    }
  }
`;
