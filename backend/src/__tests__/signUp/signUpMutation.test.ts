import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test sign up mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: SignupInput!) {
        signup(input: $input) {
          jwtToken
        }
      }
    `;
    const input = {
      input: {
        userName: 'francis',
        password: 'passwordFrancis',
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid query', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: SignupInput) {
        signup(input: $input) {
          jwtToken
        }
      }
    `;
    const input = {
      input: {
        username: 'mathew',
        password: 'newpassword123',
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock signUp mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('return jwt token', async () => {
    const fixture = {
      data: {
        signup: {
          jwtToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3Fvb3BfdXNlcnMiLCJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6Im1hdGhldyIsImV4cCI6MTYzMDQ5Mjk0NywiaWF0IjoxNjI5ODg4MTQ3LCJhdWQiOiJwb3N0Z3JhcGhpbGUiLCJpc3MiOiJwb3N0Z3JhcGhpbGUifQ.2xuz0Go2ijPsedGz4siScyUHqXks1RvWxVMITyWhIL4',
        },
      },
    };

    tester.setFixture(fixture);
    const mutation = gql`
      mutation MyMutation($input: SignupInput!) {
        signup(input: $input) {
          jwtToken
        }
      }
    `;
    const input = {
      input: {
        userName: 'francis',
        password: 'passwordFrancis',
      },
    };
    const {
      data: { signup },
    } = await tester.mock(mutation, input);
    expect(signup.jwtToken).toBeString();
  });
});
