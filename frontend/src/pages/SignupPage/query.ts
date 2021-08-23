import { gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      jwtToken
    }
  }
`;

export default SIGN_UP_MUTATION;
