import { gql } from '@apollo/client';

const GET_CURRENT_USER_ID_QUERY = gql`
  query getCurrentUser {
    currentUserId
  }
`;

export default GET_CURRENT_USER_ID_QUERY;
