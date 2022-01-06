import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  CollectionArticle,
  CollectionGoogleFactCheck,
  CollectionTweet,
  CollectionVeraFile,
  PhotosConnection,
} from '../types.generated';
import {
  DELETE_COLLECTION_CONTENT_ARTICLE,
  DELETE_COLLECTION_CONTENT_GOOGLE_FACT_CHECK,
  DELETE_COLLECTION_CONTENT_TWEET,
  DELETE_COLLECTION_CONTENT_VERA_FILE,
} from '../components/Cards/CardsButtons/query';
import RemoveFromCollectionButton from '../components/Cards/CardsButtons/RemoveFromCollection/RemoveFromCollectionButton';

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
  collectionId: 0,
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
  collectionId: 0,
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
  collectionId: 0,
  createdAt: '',
};

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: DELETE_COLLECTION_CONTENT_ARTICLE,
      variables: {
        id: article.id,
      },
    },
    newData: jest.fn(() => ({
      data: {
        deleteCollectionArticle: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: DELETE_COLLECTION_CONTENT_TWEET,
      variables: {
        id: tweet.id,
      },
    },
    newData: jest.fn(() => ({
      data: {
        deleteCollectionTweet: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: DELETE_COLLECTION_CONTENT_GOOGLE_FACT_CHECK,
      variables: {
        id: tweet.id,
      },
    },
    newData: jest.fn(() => ({
      data: {
        deleteCollectionGoogleFactCheck: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
  {
    request: {
      query: DELETE_COLLECTION_CONTENT_VERA_FILE,
      variables: {
        id: veraFiles.id,
      },
    },
    newData: jest.fn(() => ({
      data: {
        deleteCollectionVeraFile: {
          collection: {
            title: 'Science',
          },
        },
      },
    })),
  },
];

let documentBody: RenderResult;

describe('remove from collection button', () => {
  test('remove not in collection content type', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <RemoveFromCollectionButton data={articleNoType} />
      </MockedProvider>
    );
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText('Warning!');
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);

    await waitFor(async () => {
      const deleteButton = await documentBody.findByTestId('agree-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    fireEvent.click(documentBody.getByRole('button', { name: 'Agree' }));

    const deleteCollectionArticleMock = mocks[0].newData;
    const deleteCollectionTweetMock = mocks[1].newData;
    const deleteCollectionGoogleFactCheckMock = mocks[2].newData;
    const deleteCollectionVeraFileMock = mocks[3].newData;

    await waitFor(() => {
      expect(deleteCollectionArticleMock).not.toHaveBeenCalled();
      expect(deleteCollectionTweetMock).not.toHaveBeenCalled();
      expect(deleteCollectionGoogleFactCheckMock).not.toHaveBeenCalled();
      expect(deleteCollectionVeraFileMock).not.toHaveBeenCalled();
    });
  });
  test('remove article', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <RemoveFromCollectionButton data={article} />
      </MockedProvider>
    );
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText('Warning!');
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);

    await waitFor(async () => {
      const deleteButton = await documentBody.findByTestId('agree-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    fireEvent.click(documentBody.getByRole('button', { name: 'Agree' }));

    const deleteCollectionArticleMock = mocks[0].newData;

    await waitFor(() => {
      expect(deleteCollectionArticleMock).toHaveBeenCalled();
    });
  });
  test('remove tweet', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <RemoveFromCollectionButton data={tweet} />
      </MockedProvider>
    );
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText('Warning!');
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);

    await waitFor(async () => {
      const deleteButton = await documentBody.findByTestId('agree-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    fireEvent.click(documentBody.getByRole('button', { name: 'Agree' }));

    const deleteCollectionTweetMock = mocks[1].newData;

    await waitFor(() => {
      expect(deleteCollectionTweetMock).toHaveBeenCalled();
    });
  });
  test('remove google fact check', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <RemoveFromCollectionButton data={googleFactCheck} />
      </MockedProvider>
    );
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText('Warning!');
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);

    await waitFor(async () => {
      const deleteButton = await documentBody.findByTestId('agree-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    fireEvent.click(documentBody.getByRole('button', { name: 'Agree' }));

    const deleteCollectionGoogleFactCheckMock = mocks[2].newData;

    await waitFor(() => {
      expect(deleteCollectionGoogleFactCheckMock).toHaveBeenCalled();
    });
  });

  test('remove vera files', async () => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <RemoveFromCollectionButton data={veraFiles} />
      </MockedProvider>
    );
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText('Warning!');
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);

    await waitFor(async () => {
      const deleteButton = await documentBody.findByTestId('agree-delete');
      expect(deleteButton).toBeInTheDocument();
    });

    fireEvent.click(documentBody.getByRole('button', { name: 'Agree' }));

    const deleteCollectionVeraFileMock = mocks[3].newData;

    await waitFor(() => {
      expect(deleteCollectionVeraFileMock).toHaveBeenCalled();
    });
  });
});
