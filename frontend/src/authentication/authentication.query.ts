import { gql } from '@apollo/client';

const GET_CURRENT_USER_ID_QUERY = gql`
  query getCurrentUserId {
    currentUserId
  }
`;

export default GET_CURRENT_USER_ID_QUERY;
