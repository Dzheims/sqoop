import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
import { text } from 'express';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test topheadlines schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid topheadlines query', () => {
    const query = gql`
      query TESTQUERY {
        search(keyword: string) {
          text
          claimant
          claimDate
          claimReview {
            publisher {
              name
              site
            }
            url
            title
            reviewDate
            textualRating
            languageCode
          }
        }
      }
    `;
    tester.test(true, query);
  });
  test('check if invalid category query', () => {
    const query = gql`
      query TESTQUERY {
        search(sources: string) {
          text
          claimant
          url
          title
          reviewDate
          textualRating
          languageCode
        }
      }
    `;

    tester.test(false, query);
  });
});
