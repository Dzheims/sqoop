import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LIST_QUERY = gql`
  query getCollectionsList($condition: CollectionCondition) {
    collections(condition: $condition) {
      id
      title
    }
  }
`;

export const SAVE_CONTENT_TO_COLLECTION = gql`
  mutation saveContentToCollection($input: CreateCollectionTweetInput!) {
    createCollectionTweet(input: $input) {
      collection {
        title
      }
    }
  }
`;
