import { userSchema } from '../helpers/setupEasyGraphqlTester';
import { gql } from 'graphile-utils';
const EasyGraphQLTester = require('easygraphql-tester');

describe('test create collection vera files mutation', () => {
  let tester: any;
  beforeAll(() => {
    tester = new EasyGraphQLTester(userSchema);
  });

  test('check if valid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionVeraFileInput!) {
        createCollectionVeraFile(input: $input) {
          collectionVeraFile {
            author
            category
            collectionId
            createdAt
            date
            dateText
            description
            id
            imageUrl
            imageStyle
            title
            url
          }
        }
      }
    `;

    const input = {
      input: {
        collectionVeraFile: {
          collectionId: 1,
          author: 'VERA Files',
          category: 'Fact Check Filipino',
          date: '2021-05-31 20:30:00',
          dateText: 'May 31, 2021, 8:30 PM',
          description: 'Mula sa pagsabing malamang na hindi',
          imageStyle:
            "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
          imageUrl:
            'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
          url: 'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte',
          title:
            'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
        },
      },
    };
    tester.test(true, mutation, input);
  });
  test('check if an invalid mutation', () => {
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionVeraFileInput) {
        createCollectionVeraFile(input: $input) {
          collectionVeraFile {
            author
            category
            collection_id
            created_at
            date
            dateText
            description
            id
            image_url
            image_style
            title
            url
          }
        }
      }
    `;
    const input = {
      input: {
        collectionVeraFile: {
          collectionId: null,
          author: 'VERA Files',
          category: 'Fact Check Filipino',
          date: '2021-05-31 20:30:00',
          dateText: 'May 31, 2021, 8:30 PM',
          description: 'Mula sa pagsabing malamang na hindi',
          imageStyle:
            "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
          imageUrl:
            'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
          url: 'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte',
          title:
            'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
        },
      },
    };
    tester.test(false, mutation, input);
  });
});

describe('mock createCollectionVeraFiles mutation', () => {
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
        createCollectionVeraFile: {
          collectionVeraFile: {
            author: 'VERA Files',
            category: 'Fact Check Filipino',
            date: '2021-05-31 20:30:00',
            dateText: 'May 31, 2021, 8:30 PM',
            description: 'Mula sa pagsabing malamang na hindi',
            imageStyle:
              "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
            imageUrl:
              'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
            url: 'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte',
            title:
              'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
          },
        },
      },
    };
    tester.setFixture(fixture);
    const mutation = gql`
      mutation TESTMUTATION($input: CreateCollectionVeraFileInput!) {
        createCollectionVeraFile(input: $input) {
          collectionVeraFile {
            author
            category
            collectionId
            createdAt
            date
            dateText
            description
            id
            imageUrl
            imageStyle
            title
            url
          }
        }
      }
    `;

    const input = {
      input: {
        collectionVeraFile: {
          collectionId: 1,
          author: 'VERA Files',
          category: 'Fact Check Filipino',
          date: '2021-05-31 20:30:00',
          dateText: 'May 31, 2021, 8:30 PM',
          description: 'Mula sa pagsabing malamang na hindi',
          imageStyle:
            "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
          imageUrl:
            'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
          url: 'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte',
          title:
            'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
        },
      },
    };
    const {
      data: {
        createCollectionVeraFile: { collectionVeraFile },
      },
    } = await tester.mock(mutation, input);
    expect(collectionVeraFile.author).toBe('VERA Files');
  });
});
