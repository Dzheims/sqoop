import { gql } from '@apollo/client';

export const USERS = gql`
  query getUsers {
    users {
      name
    }
  }
`;

export default USERS;
