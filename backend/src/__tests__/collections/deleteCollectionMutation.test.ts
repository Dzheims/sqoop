import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test delete collection', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteCollectionInput!) {
        deleteCollection(input: $input) {
          collection {
            id
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
      mutation TESTMUTATION($input: DeleteCollectionInput!) {
        deleteCollection(input: $input) {
          collection {
            id
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

describe('mock deleteCollection mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('delete collection', async () => {
    const fixture = {
      data: {
        deleteCollection: {
          collection: {
            id: 1,
            title: 'Nobel Prize',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: DeleteCollectionInput!) {
        deleteCollection(input: $input) {
          collection {
            id
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
        deleteCollection: { collection },
      },
    } = await tester.mock(mutation, input);
    expect(collection.id).toBe(1);
    expect(collection.title).toBe('Nobel Prize');
  });
});
