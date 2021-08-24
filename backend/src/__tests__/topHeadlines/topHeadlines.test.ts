import { gql } from 'graphile-utils';
import { resolvers } from '../../api/newsApi/queries';
import path from 'path';
const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');

const userSchema = fs.readFileSync(
  path.join(__dirname, '../../../../frontend', 'schema.graphql'),
  'utf8'
);

const tester = new EasyGraphQLTester(userSchema, resolvers);

test('check source type fields', async () => {
  const query = gql`
    query TESTQUERY {
      topHeadlines(country: "us") {
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
  const fixture = {
    data: {
      topHeadlines: [
        {
          author: null,
          content: null,
          description: null,
          publishedAt: '2021-08-22T00:00:09Z',
          title:
            'Pacquiao vs Ugas Pay-Per-View Pre-Show | #PacquiaoUgas - Premier Boxing Champions',
          url: 'https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9djhIbFA3ZWRLMm_SAQA?oc=5',
          urlToImage: null,
          source: {
            id: 'google-news',
            name: 'Google News',
          },
        },
      ],
    },
  };
  const {
    data: { topHeadlines },
  } = await tester.mock({ query, fixture });
  expect(topHeadlines).toBeArray;
});
