import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create collection articles mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionArticleInput!) {
        createCollectionArticle(input: $input) {
          collectionArticle {
            description
            id
            publishedAt
            sourceName
            title
            url
            urlToImage
          }
        }
      }
    `;
    const input = {
      input: {
        collectionArticle: {
          collectionId: 1,
          title: 'covid',
          description: 'covid 19',
          publishedAt: '2021-10-12T10:19:00Z',
          sourceName: 'rappler.com',
          url: 'http://rappler.com',
          urlToImage: null,
        },
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionArticleInput) {
        createCollectionArticle(input: $input) {
          collectionArticle {
            description
            id
            publishedAt
            sourceName
            title
            url
            urlToImage
          }
        }
      }
    `;
    const input = {
      input: {
        collectionArticle: {
          title: null,
          description: 'covid 19',
          publishedAt: '2021-10-12T10:19:00Z',
          sourceName: 'rappler.com',
          url: 'http://rappler.com',
          urlToImage: null,
        },
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createCollectionArticle mutation', () => {
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
        createCollectionArticle: {
          collectionArticle: {
            title: 'covid',
            description: 'covid 19',
            publishedAt: '2021-10-12T10:19:00Z',
            sourceName: 'rappler.com',
            url: 'http://rappler.com',
            urlToImage: null,
            collection: {
              id: 5,
            },
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionArticleInput!) {
        createCollectionArticle(input: $input) {
          collectionArticle {
            description
            id
            publishedAt
            sourceName
            title
            url
            urlToImage
          }
        }
      }
    `;
    const input = {
      input: {
        collectionArticle: {
          collectionId: 1,
          title: 'covid',
          description: 'covid 19',
          publishedAt: '2021-10-12T10:19:00Z',
          sourceName: 'rappler.com',
          url: 'http://rappler.com',
          urlToImage: null,
        },
      },
    };
    const {
      data: {
        createCollectionArticle: { collectionArticle },
      },
    } = await tester.mock(mutation, input);
    expect(collectionArticle.title).toBe('covid');
  });
});
