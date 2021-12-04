import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test tweetLookup schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', () => {
    const query = gql`
      query TESTQUERY {
        tweetLookup(id: "1445740660384927745") {
          createdAt
          authorId
          tweetId
          name
          photos {
            mediaKey
            type
            url
          }
          profileImageUrl
          suggestedKeywords
          text
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

describe('mock tweetLookup query', () => {
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
            authorId: '15448383',
            tweetId: '1445742618583834632',
            createdAt: '2021-09-02T12:15:00.000Z',
            name: 'ABS-CBN News',
            photos: null,
            text: 'The towns of Baggao and Solana in Cagayan province were placed on a 14-day ECQ, the most restrictive form of quarantine, starting Tuesday following the increase in COVID-19 cases in these areas, officials said. https://t.co/edmVwpm8M9',
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/1414904727674920961/aRgHKXj5_normal.jpg',
            username: 'ABSCBNNews',
            verified: true,
          },
          {
            authorId: '15872418',
            tweetId: '1430319232193990660',
            createdAt: '2021-09-02T12:06:32.000Z',
            name: 'Rappler',
            photos: [
              {
                mediaKey: '3_1433400948781617152',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E-R2kYTWEAAuTCO.jpg',
              },
              {
                mediaKey: '3_1433400948781617155',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E-R2kYTWEAAuTCO.jpg',
              },
            ],
            text: "PROGRAMMING ADVISORY 🚨\n\nThe following shows will not air today to carry out disinfection activities in our broadcast center.\n\nWe'll continue to give you #NewsYouCanTrust on our website https://t.co/sDo55hwVGt and social media accounts @cnnphilippines 📱 https://t.co/66Orn4EgeJ",
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/1412641497996881920/46xqSKjl_normal.jpg',
            username: 'rapplerdotcom',
            verified: true,
          },
          {
            authorId: '330826792',
            tweetId: '1430319009832923136',
            createdAt: '2021-09-02T12:03:36.000Z',
            name: 'Rappler',
            photos: null,
            text: 'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3',
            profileImageUrl:
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
          authorId
          tweetId
          createdAt
          name
          photos {
            mediaKey
            type
            url
          }
          text
          profileImageUrl
          username
          verified
        }
      }
    `;
    const {
      data: { searchTweets },
    } = await tester.mock({ query, fixture });
    expect(searchTweets).toBeArray();
    expect(searchTweets[0].tweetId).toBe('1445742618583834632');
    expect(searchTweets[0].authorId).toBe('15448383');
    expect(searchTweets[0].photos).toBeNull();
    expect(searchTweets[1].photos).toBeArrayOfSize(2);
    expect(searchTweets[2].verified).toBeTrue();
    expect(searchTweets[2].username).toBe('rapplerdotcom');
    expect(searchTweets[2].text).toBe(
      'President Rodrigo Duterte confirmed that he will launch a vice presidential bid in next year\'s national elections. He said he will continue his "crusade" against illegal drugs, insurgency, and criminality if he wins.\n\n#INQAsks: Do you want Duterte to run for VP in 2022? https://t.co/WRg5IsJpQ3'
    );
    expect(searchTweets[1]).toBeObject();
  });

  test('return tweets from based on keywords', async () => {
    const fixture = {
      data: {
        searchTweets: [
          {
            authorId: '330826792',
            createdAt: '2021-09-15T08:22:39.000Z',
            name: 'Rappler',
            photos: [
              {
                mediaKey: '3_1438055532829372424',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E_T_41GUcAgncxy.jpg',
              },
            ],
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/1412641497996881920/46xqSKjl_normal.jpg',
            text: "NOW: The group Cure Covid holds a briefing on looking at the 2022 budget comprehensively in the government's pandemic response. | via @lianbuan #BudgetWatch",
            username: 'rapplerdotcom',
            verified: true,
          },
          {
            authorId: '192849591',
            createdAt: '2021-09-15T08:20:22.000Z',
            name: 'Presidential Communications Operations Office',
            photos: null,
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/929537358550114304/_O1uBX3L_normal.jpg',
            text: 'TINGNAN: Alinsunod sa direktiba ni Pangulong Rodrigo Roa Duterte, walang bahid ng anomalya ang pagbili ng pamahalaan ng medical supplies na ginamit laban sa pandemyang COVID-19, ayon kay @ntfcovid19ph and Vaccine Czar Sec. Carlito Galvez Jr.',
            username: 'pcoogov',
            verified: true,
          },
          {
            authorId: '2811559122',
            createdAt: '2021-09-15T08:18:12.000Z',
            name: 'CNN Philippines',
            photos: [
              {
                mediaKey: '3_1438053757007269888',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E_T-RdpVkAAG_cg.png',
              },
            ],
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'BREAKING: The country logs 16,989 new COVID-19 cases, bringing the total to 2,283,011.',
            username: 'cnnphilippines',
            verified: true,
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        searchTweets(keyword: "COVID") {
          authorId
          createdAt
          name
          photos {
            mediaKey
            type
            url
          }
          text
          profileImageUrl
          username
          verified
        }
      }
    `;
    const {
      data: { searchTweets },
    } = await tester.mock({ query, fixture });
    expect(searchTweets).toBeArray();
    expect(searchTweets[0].authorId).toBe('330826792');
    expect(searchTweets[0].username).toBe('rapplerdotcom');
    expect(searchTweets[1]).toBeObject();
    expect(searchTweets[1].createdAt).toBe('2021-09-15T08:20:22.000Z');
    expect(searchTweets[1].photos).toBeNull();
    expect(searchTweets[2].name).toBe('CNN Philippines');
    expect(searchTweets[2].text).toBe(
      'BREAKING: The country logs 16,989 new COVID-19 cases, bringing the total to 2,283,011.'
    );
    expect(searchTweets[2].verified).toBeTrue();
  });
  test('return tweets from based on sources', async () => {
    const fixture = {
      data: {
        searchTweets: [
          {
            authorId: '2811559122',
            createdAt: '2021-09-15T11:45:24.000Z',
            name: 'CNN Philippines',
            photos: null,
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'Ejercito favors resumption of peace talks with the communist rebels.',
            username: 'cnnphilippines',
            verified: true,
          },
          {
            authorId: '2811559122',
            createdAt: '2021-09-15T11:44:56.000Z',
            name: 'CNN Philippines',
            photos: null,
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'Ejercito does not favor allowing a sitting president to run for vice presidency.',
            username: 'cnnphilippines',
            verified: true,
          },
          {
            authorId: '2811559122',
            createdAt: '2021-09-15T11:44:40.000Z',
            name: 'CNN Philippines',
            photos: null,
            profileImageUrl:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'Ejercito says he favors death penalty for drug-related offenses.',
            username: 'cnnphilippines',
            verified: true,
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        searchTweets(sources: "cnnphilippines") {
          authorId
          createdAt
          name
          photos {
            mediaKey
            type
            url
          }
          text
          profileImageUrl
          username
          verified
        }
      }
    `;
    const {
      data: { searchTweets },
    } = await tester.mock({ query, fixture });
    expect(searchTweets).toBeArray();
    expect(searchTweets[0].authorId).toBe('2811559122');
    expect(searchTweets[0].createdAt).toBe('2021-09-15T11:45:24.000Z');
    expect(searchTweets[0].photos).toBeNull();
    expect(searchTweets[1]).toBeObject();
    expect(searchTweets[1].profileImageUrl).toBe(
      'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg'
    );
    expect(searchTweets[1].name).toBe('CNN Philippines');
    expect(searchTweets[2].text).toBe(
      'Ejercito says he favors death penalty for drug-related offenses.'
    );
    expect(searchTweets[2].verified).toBeTrue();
  });
});
