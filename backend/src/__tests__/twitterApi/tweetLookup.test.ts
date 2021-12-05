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
        tweetLookup(id: 1) {
          createdAt
          authorId
          id
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
  test('return tweet by id', async () => {
    const fixture = {
      data: {
        tweetLookup: {
          createdAt: '2021-10-06T13:20:08.000Z',
          authorId: '15448383',
          tweetId: '1445740660384927745',
          name: 'Inquirer',
          photos: [
            {
              mediaKey: '3_1445740652570894346',
              type: 'photo',
              url: 'https://pbs.twimg.com/media/FBBNdrHUYAokMPj.jpg',
            },
          ],
          profileImageUrl:
            'https://pbs.twimg.com/profile_images/1427192891126915082/NNybyA9y_normal.jpg',
          suggestedKeywords: ['quezon', 'city', 'regional', 'trial', 'court'],
          text: 'JUST IN: The Quezon City Regional Trial Court has cleared 19 cops of homicide for the death of Albuera, Leyte mayor Rolando Espinosa and a fellow inmate. | @T2TupasINQ https://t.co/BUHNTFgIHY',
          username: 'inquirerdotnet',
          verified: true,
        },
      },
    };
    tester.setFixture(fixture);
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
    const {
      data: { tweetLookup },
    } = await tester.mock({ query, fixture });
    expect(tweetLookup).toBeObject();
    expect(tweetLookup.authorId).toBe('15448383');
    expect(tweetLookup.tweetId).toBe('1445740660384927745');
    expect(tweetLookup.photos).toBeArrayOfSize(1);
    expect(tweetLookup.verified).toBeTrue();
    expect(tweetLookup.username).toBe('inquirerdotnet');
    expect(tweetLookup.name).toBe('Inquirer');
    expect(tweetLookup.text).toBe(
      'JUST IN: The Quezon City Regional Trial Court has cleared 19 cops of homicide for the death of Albuera, Leyte mayor Rolando Espinosa and a fellow inmate. | @T2TupasINQ https://t.co/BUHNTFgIHY'
    );
  });
});
