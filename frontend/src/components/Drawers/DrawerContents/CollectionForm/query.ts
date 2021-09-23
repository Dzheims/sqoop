import { gql } from '@apollo/client';

const CREATE_COLLECTION = gql`
  mutation createCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      collection {
        title
      }
    }
  }
`;

export default CREATE_COLLECTION;
