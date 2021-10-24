import { gql } from '@apollo/client';

const SIGN_IN_MUTATION = gql`
  mutation signin($input: SigninInput!) {
    signin(input: $input) {
      jwtToken
    }
  }
`;

// const SIGN_IN_MUTATION = gql`
//   mutation signin($input: SigninInput!, $userName: String!) {
//     signin(input: $input) {
//       jwtToken
//       query {
//         userByUsername(username: $userName) {
//           userId
//         }
//       }
//     }
//   }
// `;

export default SIGN_IN_MUTATION;
