import { gql } from 'graphile-utils';
import path from 'path';
const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');

const userSchema = fs.readFileSync(
  path.join(__dirname, '../../../../frontend', 'schema.graphql'),
  'utf8'
);

describe('test topheadlines schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', async () => {
    const query = gql`
      query TESTQUERY {
        topHeadlines {
          author
          content
          description
          publishedAt
          title
          url
          urlToImage
          source {
            id
            name
          }
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if an invalid query', async () => {
    const query = gql`
      query TESTQUERY {
        topHeadlines {
          author
          text
          description
          publishedAt
          title
          url
          source {
            id
            name
          }
        }
      }
    `;
    tester.test(false, query);
  });
});

describe('mock topHeadline query', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('return top headlines', async () => {
    const fixture = {
      data: {
        topHeadlines: [
          {
            author: 'Science X staff',
            title: 'Breakthrough in actinide metal-metal bonding - Phys.org',
            description:
              'Scientists from The University of Manchester have managed to successfully make actinide metals form molecular actinide-actinide bonds for the first time, opening up a new field of scientific study in materials research.',
            url: 'https://phys.org/news/2021-08-breakthrough-actinide-metal-metal-bonding.html',
            urlToImage:
              'https://scx2.b-cdn.net/gfx/news/2021/scientists-report-brea.jpg',
            publishedAt: '2021-08-24T12:21:20Z',
            content:
              'Scientists from The University of Manchester have managed to successfully make actinide metals form molecular actinide-actinide bonds for the first time, opening up a new field of scientific study in… [+4526 chars]',
            source: {
              id: null,
              name: 'Phys.Org',
            },
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        topHeadlines {
          author
          content
          description
          publishedAt
          title
          url
          urlToImage
          source {
            id
            name
          }
        }
      }
    `;
    const {
      data: { topHeadlines },
    } = await tester.mock({ query, fixture });
    expect(topHeadlines).toBeArray;
    expect(topHeadlines[0].author).toBe('Science X staff');
    expect(topHeadlines[0].title).toBe(
      'Breakthrough in actinide metal-metal bonding - Phys.org'
    );
    expect(topHeadlines[0].source.id).toBe(null);
  });
});
