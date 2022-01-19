import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LIST_QUERY = gql`
  query getCollectionsList($condition: CollectionCondition) {
    collections(condition: $condition) {
      id
      title
    }
  }
`;

export default GET_COLLECTIONS_LIST_QUERY;
