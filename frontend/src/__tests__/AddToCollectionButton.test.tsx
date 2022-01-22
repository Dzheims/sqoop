import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  SAVE_TWEET_TO_COLLECTION,
  SAVE_ARTICLE_TO_COLLECTION,
  SAVE_VERA_FILE_TO_COLLECTION,
  SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION,
} from '../components/Cards/CardsButtons/AddToCollection/query';
import AddToCollectionButton from '../components/Cards/CardsButtons/AddToCollection/AddToCollectionButton';
import {
  CollectionArticle,
  CollectionGoogleFactCheck,
  CollectionTweet,
  CollectionVeraFile,
  PhotosConnection,
} from '../types.generated';

const article: CollectionArticle = {
  __typename: 'CollectionArticle',
  publishedAt: '2021-11-05T10:38:30Z',
  sourceName: 'Space.com',
  title:
    'Astronomers detect water in one of the oldest known galaxies - Space.com',
  urlToImage:
    'https://cdn.mos.cms.futurecdn.net/JN9fjndKScwGXxqBxDF4ef-1200-80.jpg',
  description:
    'Astronomers have detected traces of water in one of the oldest known galaxies proving for the first time that the life-giving substance played a role in the formation of the earliest stars.',
  id: 1,
  collectionId: 1,
  createdAt: '',
  nodeId: '',
};

const articleNoType: CollectionArticle = {
  publishedAt: '2021-11-05T10:38:30Z',
  sourceName: 'Space.com',
  title:
    'Astronomers detect water in one of the oldest known galaxies - Space.com',
  urlToImage:
    'https://cdn.mos.cms.futurecdn.net/JN9fjndKScwGXxqBxDF4ef-1200-80.jpg',
  description:
    'Astronomers have detected traces of water in one of the oldest known galaxies proving for the first time that the life-giving substance played a role in the formation of the earliest stars.',
  id: 1,
  collectionId: 1,
  createdAt: '',
  nodeId: '',
};

const photosConnection: PhotosConnection = {
  nodes: [],
  edges: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
  totalCount: 1,
};

const tweet: CollectionTweet = {
  __typename: 'CollectionTweet',
  authorId: '15448383',
  publishedAt: '2021-10-12T10:30:47.000Z',
  tweetId: '1447872367074611210',
  name: 'Department of Foreign Affairs',
  photos: [
    {
      mediaKey: '1234',
      url: 'http://image.jpg',
      type: 'photo',
      nodeId: '',
      id: 1,
      collectionTweetId: 1,
    },
  ],
  profileImageUrl:
    'https://pbs.twimg.com/profile_images/1427192891126915082/NNybyA9y_normal.jpg',
  suggestedKeywords: ['man', 'tagged', 'wanted', 'persons'],
  text: 'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales was arrested Tuesday, police said. https://t.co/kTArDk2xlq',
  username: 'inquirerdotnet',
  verified: true,
  nodeId: '',
  id: 0,
  collectionId: 1,
  createdAt: '',
  photosConnection,
};

const googleFactCheck: CollectionGoogleFactCheck = {
  __typename: 'CollectionGoogleFactCheck',
  text: 'The World Econimic Forum reported on the Omicron COVID-19 variant in July.',
  claimant: 'Facebook,Twitter',
  claimDate: '2021-10-12T10:30:47.000Z',
  publisherName: 'The Quint',
  publisherSite: 'thequint.com',
  url: 'https://www.thequint.com/news/webqoof/world-economic-forum-reported-on-omicron-in-july-fact-check',
  title: "No, World Economic Forum Didn't Report on Omicron COVID-19 ...",
  reviewDate: '2021-11-30T10:49:17Z',
  textualRating: 'False',
  languageCode: 'en',
  nodeId: '',
  id: 0,
  collectionId: 1,
  createdAt: '',
};

const veraFiles: CollectionVeraFile = {
  __typename: 'CollectionVeraFile',
  author: 'Klaire Ting and Nica Rhiana Hanopol',
  date: '2021-11-30 11:54:00',
  category: 'Reports',
  dateText: 'Nov 30, 2021, 11:54 AM',
  description: 'Months after the World Health Organization (WHO)&hellip;',
  id: 0,
  imageStyle:
    "background-image: url('/application/files/2116/3823/7365/virologist_-_internews_story_part_2_thumbnail.png')",
  imageUrl:
    'https://verafiles.org/application/files/2116/3823/7365/virologist_-_internews_story_part_2_thumbnail.png',
  title:
    'Virologists as gatekeepers: Local scientists prepare for the next pandemic',
  url: 'https://verafiles.org/articles/virologists-gatekeepers-local-scientists-prepare-next-pandem',
  nodeId: '',
  collectionId: 1,
  createdAt: '',
};

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SAVE_ARTICLE_TO_COLLECTION,
      variables: {
        input: {
          collectionArticle: {
            collectionId: article.collectionId,
            title: article.title,
            description: article.description,
            publishedAt: article.publishedAt,
            sourceName: article.sourceName,
            url: article.url,
            urlToImage: article.urlToImage,
            suggestedKeywords: article.suggestedKeywords,
          },
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        createCollectionArticle: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: SAVE_TWEET_TO_COLLECTION,
      variables: {
        input: {
          collectionTweet: {
            collectionId: tweet.collectionId,
            tweetId: tweet.tweetId,
            authorId: tweet.authorId,
            text: tweet.text,
            name: tweet.name,
            profileImageUrl: tweet.profileImageUrl,
            username: tweet.username,
            verified: tweet.verified,
            suggestedKeywords: tweet.suggestedKeywords,
            publishedAt: tweet.publishedAt,
            photos: {
              create: [
                {
                  mediaKey: '1234',
                  url: 'http://image.jpg',
                  type: 'photo',
                },
              ],
            },
          },
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        createCollectionTweet: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION,
      variables: {
        input: {
          collectionGoogleFactCheck: {
            collectionId: googleFactCheck.collectionId,
            claimDate: googleFactCheck.claimDate,
            claimant: googleFactCheck.claimant,
            createdAt: googleFactCheck.createdAt,
            languageCode: googleFactCheck.languageCode,
            publisherName: googleFactCheck.publisherName,
            publisherSite: googleFactCheck.publisherSite,
            reviewDate: googleFactCheck.reviewDate,
            text: googleFactCheck.text,
            title: googleFactCheck.title,
            textualRating: googleFactCheck.textualRating,
            url: googleFactCheck.url,
          },
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        createCollectionGoogleFactCheck: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: SAVE_VERA_FILE_TO_COLLECTION,
      variables: {
        input: {
          collectionVeraFile: {
            collectionId: veraFiles.collectionId,
            author: veraFiles.author,
            category: veraFiles.category,
            date: veraFiles.date,
            dateText: veraFiles.dateText,
            description: veraFiles.description,
            imageStyle: veraFiles.imageStyle,
            imageUrl: veraFiles.imageUrl,
            url: veraFiles.url,
            title: veraFiles.title,
          },
        },
      },
    },
    newData: jest.fn(() => ({
      data: {
        createCollectionVeraFile: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
];

let documentBody: RenderResult;

describe('add to collection button', () => {
  test('add not in collection content type', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={articleNoType} />
      </MockedProvider>
    );
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);

    await waitFor(async () => {
      const submitSaveButton = await documentBody.findByTestId('submit-save');
      expect(submitSaveButton).toBeInTheDocument();
    });
    const submitSaveButton = await documentBody.findByTestId('submit-save');
    expect(
      documentBody.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
    expect(submitSaveButton).toBeInTheDocument();
    fireEvent.click(documentBody.getByRole('button', { name: 'Save' }));

    const createCollectionArticleMock = mocks[0].newData;
    const createCollectionTweetMock = mocks[1].newData;
    const createCollectionGoogleFactCheckMock = mocks[2].newData;
    const createCollectionVeraFileMock = mocks[3].newData;

    await waitFor(() => {
      expect(createCollectionArticleMock).not.toHaveBeenCalled();
      expect(createCollectionTweetMock).not.toHaveBeenCalled();
      expect(createCollectionGoogleFactCheckMock).not.toHaveBeenCalled();
      expect(createCollectionVeraFileMock).not.toHaveBeenCalled();
    });
  });
  test('add article', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={article} />
      </MockedProvider>
    );
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);

    await waitFor(async () => {
      const submitSaveButton = await documentBody.findByTestId('submit-save');
      expect(submitSaveButton).toBeInTheDocument();
    });
    const submitSaveButton = await documentBody.findByTestId('submit-save');
    expect(
      documentBody.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
    expect(submitSaveButton).toBeInTheDocument();
    fireEvent.click(documentBody.getByRole('button', { name: 'Save' }));

    const createCollectionArticleMock = mocks[0].newData;
    await waitFor(() => {
      expect(createCollectionArticleMock).toHaveBeenCalledTimes(1);
    });
  });
  test('add tweet', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={tweet} />
      </MockedProvider>
    );
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);

    await waitFor(async () => {
      const submitSaveButton = await documentBody.findByTestId('submit-save');
      expect(submitSaveButton).toBeInTheDocument();
    });
    const submitSaveButton = await documentBody.findByTestId('submit-save');
    expect(
      documentBody.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
    expect(submitSaveButton).toBeInTheDocument();
    fireEvent.click(documentBody.getByRole('button', { name: 'Save' }));

    const createCollectionTweetMock = mocks[1].newData;
    await waitFor(() => {
      expect(createCollectionTweetMock).toHaveBeenCalledTimes(1);
    });
  });
  test('add google fact check', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={googleFactCheck} />
      </MockedProvider>
    );
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);

    await waitFor(async () => {
      const submitSaveButton = await documentBody.findByTestId('submit-save');
      expect(submitSaveButton).toBeInTheDocument();
    });
    const submitSaveButton = await documentBody.findByTestId('submit-save');
    expect(
      documentBody.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
    expect(submitSaveButton).toBeInTheDocument();
    fireEvent.click(documentBody.getByRole('button', { name: 'Save' }));

    const createCollectionGoogleFactCheckMock = mocks[2].newData;
    await waitFor(() => {
      expect(createCollectionGoogleFactCheckMock).toHaveBeenCalledTimes(1);
    });
  });

  test('add vera files', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={veraFiles} />
      </MockedProvider>
    );
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);

    await waitFor(async () => {
      const submitSaveButton = await documentBody.findByTestId('submit-save');
      expect(submitSaveButton).toBeInTheDocument();
    });
    const submitSaveButton = await documentBody.findByTestId('submit-save');
    expect(
      documentBody.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
    expect(submitSaveButton).toBeInTheDocument();
    fireEvent.click(documentBody.getByRole('button', { name: 'Save' }));

    const createCollectionVeraFileMock = mocks[3].newData;
    await waitFor(() => {
      expect(createCollectionVeraFileMock).toHaveBeenCalledTimes(1);
    });
  });
});
