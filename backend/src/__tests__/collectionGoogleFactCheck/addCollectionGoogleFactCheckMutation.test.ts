import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create collection google fact check mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionGoogleFactCheckInput!) {
        createCollectionGoogleFactCheck(input: $input) {
          collectionGoogleFactCheck {
            claimDate
            claimant
            collectionId
            createdAt
            id
            languageCode
            publisherName
            publisherSite
            reviewDate
            text
            textualRating
            title
            url
          }
        }
      }
    `;

    const input = {
      input: {
        collectionGoogleFactCheck: {
          collectionId: 1,
          text: 'Philippine senator apologised',
          claimant: 'multiple persons',
          claimDate: '2021-09-18T00:00:00Z',
          publisherName: 'AFP Fact Check',
          publisherSite: 'factcheck.afp.com',
          url: 'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
          title: 'Video does not show Philippine senator',
          reviewDate: '2021-09-22T05:52:00Z',
          textualRating: 'Missing context',
          languageCode: 'en',
        },
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionGoogleFactCheckInput) {
        createCollectionGoogleFactCheck(input: $input) {
          collectionGoogleFactCheck {
            claim_date
            claimant
            collectionId
            createdAt
            id
            languageCode
            publisherName
            publisherSite
            reviewDate
            text
            textualRating
            title
            url
          }
        }
      }
    `;
    const input = {
      input: {
        collectionGoogleFactCheck: {
          collectionId: null,
          text: 'Philippine senator apologised',
          claimant: 'multiple persons',
          claimDate: '2021-09-18T00:00:00Z',
          publisherName: 'AFP Fact Check',
          publisherSite: 'factcheck.afp.com',
          url: 'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
          title: 'Video does not show Philippine senator',
          reviewDate: '2021-09-22T05:52:00Z',
          textualRating: 'Missing context',
          languageCode: 'en',
        },
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createCollectionGoogleFactCheck mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });
  afterAll(() => {
    tester.clearFixture();
  });
  test('add collection', async () => {
    const fixture = {
      data: {
        createCollectionGoogleFactCheck: {
          collectionGoogleFactCheck: {
            text: 'Philippine senator apologised',
            claimant: 'multiple persons',
            date: '2021-09-18T00:00:00Z',
            publisherName: 'AFP Fact Check',
            publisherSite: 'factcheck.afp.com',
            url: 'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
            title: 'Video does not show Philippine senator',
            reviewDate: '2021-09-22T05:52:00Z',
            textualRating: 'Missing context',
            languageCode: 'en',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionGoogleFactCheckInput!) {
        createCollectionGoogleFactCheck(input: $input) {
          collectionGoogleFactCheck {
            claimDate
            claimant
            collectionId
            createdAt
            id
            languageCode
            publisherName
            publisherSite
            reviewDate
            text
            textualRating
            title
            url
          }
        }
      }
    `;
    const input = {
      input: {
        collectionGoogleFactCheck: {
          collectionId: 1,
          text: 'Philippine senator apologised',
          claimant: 'multiple persons',
          claimDate: '2021-09-18T00:00:00Z',
          publisherName: 'AFP Fact Check',
          publisherSite: 'factcheck.afp.com',
          url: 'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
          title: 'Video does not show Philippine senator',
          reviewDate: '2021-09-22T05:52:00Z',
          textualRating: 'Missing context',
          languageCode: 'en',
        },
      },
    };
    const {
      data: {
        createCollectionGoogleFactCheck: { collectionGoogleFactCheck },
      },
    } = await tester.mock(mutation, input);
    expect(collectionGoogleFactCheck.title).toBe(
      'Video does not show Philippine senator'
    );
  });
});
