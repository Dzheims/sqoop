import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create twitter feed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($twitterFeed: TwitterFeedInput!) {
        createTwitterFeed(input: { twitterFeed: $twitterFeed }) {
          twitterFeed {
            id
            keyword
            sources
            title
          }
        }
      }
    `;
    const input = {
      twitterFeed: {
        keyword: 'Iloilo',
        sources: null,
        title: 'Custom Twitter Feed',
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($twitterFeed: TwitterFeedInput!) {
        createTwitterFeed(input: { twitterFeed: $twitterFeed }) {
          twitterFeed {
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
      twitterFeed: {
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

describe('mock createTwitterFeed mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('add custom twitter feed', async () => {
    const fixture = {
      data: {
        createTwitterFeed: {
          twitterFeed: {
            id: 1,
            keyword: 'Capiz',
            sources: null,
            title: 'Capiz Tweets Feed',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($twitterFeed: TwitterFeedInput!) {
        createTwitterFeed(input: { twitterFeed: $twitterFeed }) {
          twitterFeed {
            id
            keyword
            sources
            title
          }
        }
      }
    `;
    const input = {
      twitterFeed: {
        keyword: 'Capiz',
        sources: null,
        title: 'Capiz Tweets Feed',
      },
    };
    const {
      data: {
        createTwitterFeed: { twitterFeed },
      },
    } = await tester.mock(mutation, input);
    expect(twitterFeed.id).toBe(1);
    expect(twitterFeed.keyword).toBe('Capiz');
    expect(twitterFeed.sources).toBe(null);
    expect(twitterFeed.title).toBe('Capiz Tweets Feed');
  });
});
