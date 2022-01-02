import { gql } from '@apollo/client';

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
export const DELETE_COLLECTION_CONTENT_GOOGLE_FACT_CHECK = gql`
  mutation deleteGoogleFactCheckContent($id: Int!) {
    deleteCollectionGoogleFactCheck(input: { id: $id }) {
      clientMutationId
    }
  }
`;
