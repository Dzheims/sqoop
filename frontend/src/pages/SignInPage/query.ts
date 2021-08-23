import { gql } from '@apollo/client';

const SIGN_IN_MUTATION = gql`
  mutation signin($input: SigninInput!) {
    signin(input: $input) {
      jwtToken
    }
  }
`;

export default SIGN_IN_MUTATION;
