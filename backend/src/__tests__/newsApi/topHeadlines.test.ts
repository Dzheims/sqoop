import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test topheadlines schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid topheadlines query', () => {
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
          sourceId
          sourceName
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if valid category query', () => {
    const query = gql`
      query TESTQUERY {
        topHeadlines(category: GENERAL) {
          author
          content
          description
          publishedAt
          sourceId
          sourceName
          title
          url
          urlToImage
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if invalid category query', () => {
    const query = gql`
      query TESTQUERY {
        topHeadlines(category: NATIONAL) {
          author
          content
          description
          publishedAt
          sourceId
          sourceName
          title
          url
          urlToImage
        }
      }
    `;
    tester.test(false, query);
  });
  test('check if invalid category query on arguments', () => {
    const query = gql`
      query TESTQUERY($category: Category) {
        topHeadlines(category: $category) {
          author
          content
          description
          publishedAt
        }
      }
    `;
    const args = {
      category: 'business',
    };
    tester.test(false, query, args);
  });
  test('check if valid category query on arguments', () => {
    const query = gql`
      query TESTQUERY($category: Category) {
        topHeadlines(category: $category) {
          author
          content
          description
          publishedAt
          sourceId
          sourceName
        }
      }
    `;
    const args = {
      category: 'GENERAL',
    };
    tester.test(true, query, args);
  });
  test('check if an invalid query', () => {
    const query = gql`
      query TESTQUERY {
        topHeadlines {
          author
          text
          description
          publishedAt
          title
          url
          sourceId
          sourceName
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
            sourceId: null,
            sourceName: 'Phys.Org',
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
          sourceId
          sourceName
        }
      }
    `;
    const {
      data: { topHeadlines },
    } = await tester.mock({ query, fixture });
    expect(topHeadlines).toBeArray();
    expect(topHeadlines[0].author).toBe('Science X staff');
    expect(topHeadlines[0].title).toBe(
      'Breakthrough in actinide metal-metal bonding - Phys.org'
    );
    expect(topHeadlines[0].sourceId).toBe(null);
    expect(topHeadlines[0].sourceName).toBe('Phys.Org');
  });
  test('return data based on arguments', async () => {
    const fixture = {
      data: {
        topHeadlines: [
          {
            content: null,
            description: null,
            sourceName: 'Google News',
            title:
              "Charlotte Flair vs. Nia Jax – Raw Women's Title Match: Raw, Sept. 6, 2021 - WWE",
            url: 'https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9bHRkODV1WW9CRDDSAQA?oc=5',
            urlToImage: null,
          },
          {
            content: null,
            description: null,
            sourceName: 'Google News',
            title:
              "I quit! Texas employers beware – it's a job seekers market right now. - WFAA",
            url: 'https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Ulpob2xMZHFRWmPSAQA?oc=5',
            urlToImage: null,
          },
          {
            content: null,
            description: null,
            sourceName: 'Google News',
            title:
              'PDP wing not yet eyeing Sara Duterte as standard-bearer - ABS-CBN News',
            url: 'https://news.google.com/__i/rss/rd/articles/CBMiXmh0dHBzOi8vbmV3cy5hYnMtY2JuLmNvbS9uZXdzLzA5LzA3LzIxL3BkcC13aW5nLW5vdC15ZXQtZXllaW5nLXNhcmEtZHV0ZXJ0ZS1hcy1zdGFuZGFyZC1iZWFyZXLSAQA?oc=5',
            urlToImage: null,
          },
        ],
      },
    };
    tester.setFixture(fixture);
    const query = gql`
      query TESTQUERY {
        topHeadlines(category: HEALTH) {
          content
          description
          sourceName
          title
          url
          urlToImage
        }
      }
    `;
    const {
      data: { topHeadlines },
    } = await tester.mock({ query, fixture });
    expect(topHeadlines).toBeArray();
    expect(topHeadlines[0].content).toBe(null);
    expect(topHeadlines[1].sourceName).toBe('Google News');
    expect(topHeadlines[2].description).toBe(null);
    expect(topHeadlines[2].title).toBe(
      'PDP wing not yet eyeing Sara Duterte as standard-bearer - ABS-CBN News'
    );
  });
});
