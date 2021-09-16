import { gql } from '@apollo/client';

const GET_USER_NAME_QUERY = gql`
  query GetUserName($input: Int!) {
    user(userId: $input) {
      username
    }
  }
`;

export default GET_USER_NAME_QUERY;
