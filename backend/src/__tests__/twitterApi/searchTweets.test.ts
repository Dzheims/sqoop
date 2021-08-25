import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test searchTweets schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', async () => {
    const query = gql`
      query TESTQUERY {
        searchTweets {
          id
          text
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if an invalid query', async () => {
    const query = gql`
      query TESTQUERY {
        searchTweet {
          id
          content
        }
      }
    `;
    tester.test(false, query);
  });
});

describe('mock searchTweets query', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('return tweets from default sources', async () => {
    const fixture = {
      data: {
        searchTweets: [
          {
            id: '1430319336233783304',
            text: 'The towns of Baggao and Solana in Cagayan province were placed on a 14-day ECQ, the most restrictive form of quarantine, starting Tuesday following the increase in COVID-19 cases in these areas, officials said. https://t.co/edmVwpm8M9',
          },
          {
            id: '1430319232193990660',
            text: "PROGRAMMING ADVISORY 🚨\n\nThe following shows will not air today to carry out disinfection activities in our broadcast center.\n\nWe'll continue to give you #NewsYouCanTrust on our website https://t.co/sDo55hwVGt and social media accounts @cnnphilippines 📱 https://t.co/66Orn4EgeJ",
          },
          {
            id: '1430319009832923136',
            text: 'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3',
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        searchTweets {
          id
          text
        }
      }
    `;
    const {
      data: { searchTweets },
    } = await tester.mock({ query, fixture });
    expect(searchTweets).toBeArray();
    expect(searchTweets[0].id).toBe('1430319336233783304');
    expect(searchTweets[2].text).toBe(
      'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3'
    );
    expect(searchTweets[1]).toBeObject();
  });
});
