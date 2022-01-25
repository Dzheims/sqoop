import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create collection tweet mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionTweetInput!) {
        createCollectionTweet(input: $input) {
          collectionTweet {
            id
            tweetId
          }
        }
      }
    `;
    const input = {
      input: {
        collectionTweet: {
          collectionId: 1,
          tweetId: '12345',
        },
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionTweetInput) {
        createCollectionTweet(input: $input) {
          collectionTweet {
            id
            tweetId
          }
        }
      }
    `;
    const input = {
      input: {
        collectionTweet: {
          tweetId: '12345',
        },
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createCollectionTweet mutation', () => {
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
        createCollectionTweet: {
          collectionTweet: {
            id: 1,
            tweetId: '123422134421',
            collection: {
              id: 5,
            },
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionTweetInput!) {
        createCollectionTweet(input: $input) {
          collectionTweet {
            id
            tweetId
            collection {
              id
            }
          }
        }
      }
    `;
    const input = {
      input: {
        collectionTweet: {
          collectionId: 5,
          tweetId: '123422134421',
        },
      },
    };
    const {
      data: {
        createCollectionTweet: { collectionTweet },
      },
    } = await tester.mock(mutation, input);
    expect(collectionTweet.id).toBe(1);
    expect(collectionTweet.collection.id).toBe(5);
    expect(collectionTweet.tweetId).toBe('123422134421');
  });
});
