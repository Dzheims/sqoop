import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create collection mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($collection: CollectionInput!) {
        createCollection(input: { collection: $collection }) {
          collection {
            id
            title
          }
        }
      }
    `;
    const input = {
      collection: {
        title: 'Covid Collection',
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($collection: CollectionInput!) {
        createCollection(input: { collection: $collection }) {
          collection {
            id
            title
          }
        }
      }
    `;
    const input = {
      collection: {
        title: 'Covid Collection',
        sources: 'twitter',
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createCollection mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('add collection', async () => {
    const fixture = {
      data: {
        createCollection: {
          collection: {
            title: "Today's Bookmarks",
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($collection: CollectionInput!) {
        createCollection(input: { collection: $collection }) {
          collection {
            id
            title
          }
        }
      }
    `;
    const input = {
      collection: {
        title: "Today's Bookmarks",
      },
    };
    const {
      data: {
        createCollection: { collection },
      },
    } = await tester.mock(mutation, input);
    expect(collection.id).toBe(1);
    expect(collection.title).toBe("Today's Bookmarks");
  });
});
