import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create news feed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($newsFeed: NewsFeedInput!) {
        createNewsFeed(input: { newsFeed: $newsFeed }) {
          newsFeed {
            id
            category
            country
            keyword
            sources
            title
          }
        }
      }
    `;
    const input = {
      newsFeed: {
        category: 'GENERAL',
        country: 'us',
        keyword: 'Covid',
        sources: null,
        title: 'General Feed',
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($newsFeed: NewsFeedInput!) {
        createNewsFeed(input: { newsFeed: $newsFeed }) {
          newsFeed {
            id
            category
            country
            keyword
            sources
            title
          }
        }
      }
    `;
    const input = {
      newsFeed: {
        headline: 'national',
        country: 'us',
        keyword: 'Covid',
        sources: null,
        title: 'General Feed',
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createNewsFeed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('add custom news feed', async () => {
    const fixture = {
      data: {
        createNewsFeed: {
          newsFeed: {
            id: 1,
            category: 'GENERAL',
            country: 'us',
            keyword: 'Covid',
            sources: null,
            title: 'General Feed',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($newsFeed: NewsFeedInput!) {
        createNewsFeed(input: { newsFeed: $newsFeed }) {
          newsFeed {
            id
            category
            country
            keyword
            sources
            title
          }
        }
      }
    `;
    const input = {
      newsFeed: {
        category: 'GENERAL',
        country: 'us',
        keyword: 'Covid',
        sources: null,
        title: 'General Feed',
      },
    };
    const {
      data: {
        createNewsFeed: { newsFeed },
      },
    } = await tester.mock(mutation, input);
    expect(newsFeed.id).toBe(1);
    expect(newsFeed.category).toBe('GENERAL');
    expect(newsFeed.country).toBe('us');
    expect(newsFeed.keyword).toBe('Covid');
    expect(newsFeed.sources).toBe(null);
    expect(newsFeed.title).toBe('General Feed');
  });
});
