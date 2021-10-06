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
        tweetLookup(id: 1) {
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
          created_at: '2021-10-06T13:20:08.000Z',
          author_id: '15448383',
          id: '1445740660384927745',
          name: 'Inquirer',
          photos: [
            {
              media_key: '3_1445740652570894346',
              type: 'photo',
              url: 'https://pbs.twimg.com/media/FBBNdrHUYAokMPj.jpg',
            },
          ],
          profile_image_url:
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
    const {
      data: { tweetLookup },
    } = await tester.mock({ query, fixture });
    expect(tweetLookup).toBeObject();
    expect(tweetLookup.author_id).toBe('15448383');
    expect(tweetLookup.id).toBe('1445740660384927745');
    expect(tweetLookup.photos).toBeArrayOfSize(1);
    expect(tweetLookup.verified).toBeTrue();
    expect(tweetLookup.username).toBe('inquirerdotnet');
    expect(tweetLookup.name).toBe('Inquirer');
    expect(tweetLookup.text).toBe(
      'JUST IN: The Quezon City Regional Trial Court has cleared 19 cops of homicide for the death of Albuera, Leyte mayor Rolando Espinosa and a fellow inmate. | @T2TupasINQ https://t.co/BUHNTFgIHY'
    );
  });
});
