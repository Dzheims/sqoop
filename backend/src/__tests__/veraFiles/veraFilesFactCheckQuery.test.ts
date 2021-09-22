import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test veraFilesFactCheck schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', () => {
    const query = gql`
      query TESTQUERY {
        veraFilesFactCheck(keyword: "duterte") {
          author
          category
          date
          description
          imageStyle
          imageUrl
          title
          url
          dateText
          id
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if an invalid query', () => {
    const query = gql`
      query TESTQUERY {
        veraFilesFactCheck(keyword: "duterte") {
          source
          category
          dateTime
          description
          imageStyle
          imageUrl
          title
          url
          authorId
        }
      }
    `;
    tester.test(false, query);
  });
});

describe('mock veraFilesFactCheck query', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('return contents based on keyword', async () => {
    const fixture = {
      data: {
        veraFilesFactCheck: [
          {
            author: 'VERA Files',
            category: 'Reports',
            date: '2021-09-22 18:51:00',
            dateText: 'Sep 22, 2021, 6:51 PM',
            description:
              'VERA Files Fact Check debunked a similar post in&hellip;',
            id: 0,
            imageUrl:
              'verafiles.org/application/files/7216/3230/7799/092121-fake-p10k-for-moms_3.png',
            imageStyle:
              "background-image: url('/application/files/7216/3230/7799/092121-fake-p10k-for-moms_3.png')",
            url: 'https://verafiles.org/articles/vera-files-fact-check-video-claiming-drilon-found-guilty-cor',
            title:
              'VERA FILES FACT CHECK: Post claiming moms, housewives to get P10k monthly from gov&rsquo;t is FAKE',
          },
          {
            author: 'VERA Files',
            category: 'Fact-Check',
            date: '2021-09-22 17:21:00',
            dateText: 'Sep 22, 2021, 5:21 PM',
            description:
              'A reverse image search revealed that the photo of&hellip;',
            id: 1,
            imageUrl:
              'verafiles.org/application/files/5916/3230/2574/091721-misleading-marcelo-fernan-bridge.png',
            imageStyle:
              "background-image: url('/application/files/5916/3230/2574/091721-misleading-marcelo-fernan-bridge.png')",
            title:
              'VERA FILES FACT CHECK: Photo misleads; 22-year-old Marcelo Fernan Bridge NOT a Duterte project',
            url: 'https://verafiles.org/articles/young-voters-should-voice-out-truth-2022-elections-martial-l',
          },
          {
            author: 'Ivel John M. Santos',
            category: 'Reports',
            date: '2021-09-16 19:22:00',
            dateText: 'Sep 16, 2021, 7:22 PM',
            description:
              'Top Malaca&ntilde;ang officials blasted the International&hellip;',
            id: 5,
            imageUrl:
              'verafiles.org/application/files/9516/3179/1967/thumbnail_icc.jpg',
            imageStyle:
              "background-image: url('/application/files/9516/3179/1967/thumbnail_icc.jpg')",
            title:
              'Philippine government will not cooperate with ICC; Duterte &lsquo;no reaction&rsquo; on impending probe',
            url: 'https://verafiles.org/articles/philippine-government-will-not-cooperate-icc-duterte-no-reac',
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        veraFilesFactCheck(keyword: "duterte") {
          id
          author
          category
          date
          dateText
          description
          imageStyle
          imageUrl
          url
          title
        }
      }
    `;
    const {
      data: { veraFilesFactCheck },
    } = await tester.mock({ query, fixture });
    expect(veraFilesFactCheck).toBeArray();
    expect(veraFilesFactCheck[0]).toBeObject();
    expect(veraFilesFactCheck[0].id).toBe(0);
    expect(veraFilesFactCheck[0].author).toBe('VERA Files');
    expect(veraFilesFactCheck[1].category).toBe('Fact-Check');
    expect(veraFilesFactCheck[1].date).toBe('2021-09-22 17:21:00');
    expect(veraFilesFactCheck[1].dateText).toBe('Sep 22, 2021, 5:21 PM');
    expect(veraFilesFactCheck[1].description).toBe(
      'A reverse image search revealed that the photo of&hellip;'
    );
    expect(veraFilesFactCheck[2].imageStyle).toBe(
      "background-image: url('/application/files/9516/3179/1967/thumbnail_icc.jpg')"
    );
    expect(veraFilesFactCheck[2].imageUrl).toBe(
      'verafiles.org/application/files/9516/3179/1967/thumbnail_icc.jpg'
    );
    expect(veraFilesFactCheck[2].url).toBe(
      'https://verafiles.org/articles/philippine-government-will-not-cooperate-icc-duterte-no-reac'
    );
    expect(veraFilesFactCheck[2].title).toBe(
      'Philippine government will not cooperate with ICC; Duterte &lsquo;no reaction&rsquo; on impending probe'
    );
  });
});
