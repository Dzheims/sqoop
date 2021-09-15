import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test getColumnsResult', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid query', () => {
    const query = gql`
      query TESTQUERY {
        getColumnResult {
          ... on NewsFeed {
            id
            category
            country
            keyword
            sources
            title
          }
          ... on TwitterFeed {
            id
            keyword
            sources
            title
          }
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if an invalid query', () => {
    const query = gql`
      query TESTQUERY {
        getColumnResult {
          ... on NewsFeed {
            id
            category
            country
            keyword
            sources
            title
          }
          ... on TwitterFeed {
            id
            keyword
            sources
            title
            category
          }
        }
      }
    `;
    tester.test(false, query);
  });
});
