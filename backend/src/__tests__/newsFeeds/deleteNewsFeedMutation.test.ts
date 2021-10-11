import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test delete news feed', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteNewsFeedInput!) {
        deleteNewsFeed(input: $input) {
          newsFeed {
            id
            title
            category
            sources
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
      mutation TESTMUTATION($input: DeleteNewsFeedInput!) {
        deleteNewsFeed(input: $input) {
          newsFeed {
            id
            title
            category
            sources
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

describe('mock deleteNewsFeed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('delete news feed', async () => {
    const fixture = {
      data: {
        deleteNewsFeed: {
          newsFeed: {
            id: 2,
            title: 'bitcoin',
            category: 'BUSINESS',
            sources: 'ABC news',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteNewsFeedInput!) {
        deleteNewsFeed(input: $input) {
          newsFeed {
            id
            title
            category
            sources
          }
        }
      }
    `;
    const input = {
      input: {
        id: 2,
      },
    };
    const {
      data: {
        deleteNewsFeed: { newsFeed },
      },
    } = await tester.mock(mutation, input);
    expect(newsFeed.id).toBe(2);
  });
});
