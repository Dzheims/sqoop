import { gql } from '@apollo/client';

export const USERS = gql`
  query getUsers {
    users {
      username
    }
  }
`;

export default USERS;
