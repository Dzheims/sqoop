import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
import { text } from 'express';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test google claim search on schema', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid claim search query', () => {
    const query = gql`
      query TESTQUEY {
        googleFactCheckSearch(keyword: "Marcos") {
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
  test('check if invalid claim search query', () => {
    const query = gql`
      query TESTQUERY {
        search(sources: "Duterte") {
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
