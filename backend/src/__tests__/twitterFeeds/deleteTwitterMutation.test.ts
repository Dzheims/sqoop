import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test delete twitter feed', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteTwitterFeedInput!) {
        deleteTwitterFeed(input: $input) {
          twitterFeed {
            id
            keyword
            title
          }
        }
      }
    `;
    const input = {
      input: {
        id: 1,
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteTwitterFeedInput!) {
        deleteTwitterFeed(input: $input) {
          twitterFeed {
            id
            keyword
            title
          }
        }
      }
    `;
    const input = {
      input: {
        id: '1456788',
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock deleteTwitterFeed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('delete twitter feed', async () => {
    const fixture = {
      data: {
        deleteTwitterFeed: {
          twitterFeed: {
            id: 1,
            keyword: 'leni robredo',
            title: 'eleksyon2022',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteTwitterFeedInput!) {
        deleteTwitterFeed(input: $input) {
          twitterFeed {
            id
            keyword
            title
          }
        }
      }
    `;
    const input = {
      input: {
        id: 1,
      },
    };
    const {
      data: {
        deleteTwitterFeed: { twitterFeed },
      },
    } = await tester.mock(mutation, input);
    expect(twitterFeed.id).toBe(1);
  });
});
