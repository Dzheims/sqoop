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
          created_at
          author_id
          id
          name
          photos {
            media_key
            type
            url
          }
          profile_image_url
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
            author_id: '15448383',
            id: '1445742618583834632',
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
            author_id: '15872418',
            id: '1430319232193990660',
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
            author_id: '330826792',
            id: '1430319009832923136',
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
          id
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
    expect(searchTweets[0].id).toBe('1445742618583834632');
    expect(searchTweets[0].author_id).toBe('15448383');
    expect(searchTweets[0].photos).toBeEmpty();
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
            author_id: '330826792',
            created_at: '2021-09-15T08:22:39.000Z',
            name: 'Rappler',
            photos: [
              {
                media_key: '3_1438055532829372424',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E_T_41GUcAgncxy.jpg',
              },
            ],
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1412641497996881920/46xqSKjl_normal.jpg',
            text: "NOW: The group Cure Covid holds a briefing on looking at the 2022 budget comprehensively in the government's pandemic response. | via @lianbuan #BudgetWatch",
            username: 'rapplerdotcom',
            verified: true,
          },
          {
            author_id: '192849591',
            created_at: '2021-09-15T08:20:22.000Z',
            name: 'Presidential Communications Operations Office',
            photos: [],
            profile_image_url:
              'https://pbs.twimg.com/profile_images/929537358550114304/_O1uBX3L_normal.jpg',
            text: 'TINGNAN: Alinsunod sa direktiba ni Pangulong Rodrigo Roa Duterte, walang bahid ng anomalya ang pagbili ng pamahalaan ng medical supplies na ginamit laban sa pandemyang COVID-19, ayon kay @ntfcovid19ph and Vaccine Czar Sec. Carlito Galvez Jr.',
            username: 'pcoogov',
            verified: true,
          },
          {
            author_id: '2811559122',
            created_at: '2021-09-15T08:18:12.000Z',
            name: 'CNN Philippines',
            photos: [
              {
                media_key: '3_1438053757007269888',
                type: 'photo',
                url: 'https://pbs.twimg.com/media/E_T-RdpVkAAG_cg.png',
              },
            ],
            profile_image_url:
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
    expect(searchTweets[0].author_id).toBe('330826792');
    expect(searchTweets[0].username).toBe('rapplerdotcom');
    expect(searchTweets[1]).toBeObject();
    expect(searchTweets[1].created_at).toBe('2021-09-15T08:20:22.000Z');
    expect(searchTweets[1].photos).toBeEmpty();
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
            author_id: '2811559122',
            created_at: '2021-09-15T11:45:24.000Z',
            name: 'CNN Philippines',
            photos: [],
            profile_image_url:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'Ejercito favors resumption of peace talks with the communist rebels.',
            username: 'cnnphilippines',
            verified: true,
          },
          {
            author_id: '2811559122',
            created_at: '2021-09-15T11:44:56.000Z',
            name: 'CNN Philippines',
            photos: [],
            profile_image_url:
              'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg',
            text: 'Ejercito does not favor allowing a sitting president to run for vice presidency.',
            username: 'cnnphilippines',
            verified: true,
          },
          {
            author_id: '2811559122',
            created_at: '2021-09-15T11:44:40.000Z',
            name: 'CNN Philippines',
            photos: [],
            profile_image_url:
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
    expect(searchTweets[0].author_id).toBe('2811559122');
    expect(searchTweets[0].created_at).toBe('2021-09-15T11:45:24.000Z');
    expect(searchTweets[0].photos).toBeEmpty();
    expect(searchTweets[1]).toBeObject();
    expect(searchTweets[1].profile_image_url).toBe(
      'https://pbs.twimg.com/profile_images/947598867985457152/lOzb5ud9_normal.jpg'
    );
    expect(searchTweets[1].name).toBe('CNN Philippines');
    expect(searchTweets[2].text).toBe(
      'Ejercito says he favors death penalty for drug-related offenses.'
    );
    expect(searchTweets[2].verified).toBeTrue();
  });
});
