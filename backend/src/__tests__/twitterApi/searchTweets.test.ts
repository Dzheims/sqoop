import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test searchTweets schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', () => {
    const query = gql`
      query TESTQUERY {
        searchTweets {
          author_id
          created_at
          name
          photos {
            media_key
            type
            url
          }
          text
          profile_image_url
          username
          verified
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if an invalid query', () => {
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
            author_id: '1430319336233783304',
            created_at: '2021-09-02T12:15:00.000Z',
            name: 'ABS-CBN News',
            photos: [],
            text: 'The towns of Baggao and Solana in Cagayan province were placed on a 14-day ECQ, the most restrictive form of quarantine, starting Tuesday following the increase in COVID-19 cases in these areas, officials said. https://t.co/edmVwpm8M9',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1414904727674920961/aRgHKXj5_normal.jpg',
            username: 'ABSCBNNews',
            verified: true,
          },
          {
            author_id: '1430319232193990660',
            created_at: '2021-09-02T12:06:32.000Z',
            name: 'Rappler',
            photos: [
              {
                media_key: '3_1433400948781617152',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E-R2kYTWEAAuTCO.jpg',
              },
              {
                media_key: '3_1433400948781617155',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E-R2kYTWEAAuTCO.jpg',
              },
            ],
            text: "PROGRAMMING ADVISORY 🚨\n\nThe following shows will not air today to carry out disinfection activities in our broadcast center.\n\nWe'll continue to give you #NewsYouCanTrust on our website https://t.co/sDo55hwVGt and social media accounts @cnnphilippines 📱 https://t.co/66Orn4EgeJ",
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1412641497996881920/46xqSKjl_normal.jpg',
            username: 'rapplerdotcom',
            verified: true,
          },
          {
            author_id: '1430319009832923136',
            created_at: '2021-09-02T12:03:36.000Z',
            name: 'Rappler',
            photos: [],
            text: 'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1412641497996881920/46xqSKjl_normal.jpg',
            username: 'rapplerdotcom',
            verified: true,
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        searchTweets {
          author_id
          created_at
          name
          photos {
            media_key
            type
            url
          }
          text
          profile_image_url
          username
          verified
        }
      }
    `;
    const {
      data: { searchTweets },
    } = await tester.mock({ query, fixture });
    expect(searchTweets).toBeArray();
    expect(searchTweets[0].author_id).toBe('1430319336233783304');
    expect(searchTweets[0].photos).toBeEmpty();
    expect(searchTweets[1].photos).toBeArrayOfSize(2);
    expect(searchTweets[2].verified).toBeTrue();
    expect(searchTweets[2].username).toBe('rapplerdotcom');
    expect(searchTweets[2].text).toBe(
      'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3'
    );
    expect(searchTweets[1]).toBeObject();
  });
});
