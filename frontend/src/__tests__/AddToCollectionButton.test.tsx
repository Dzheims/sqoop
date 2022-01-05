import React from 'react';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CollectionContentsData from '../components/ColumnContents/CollectionContentsData';
import {
  SAVE_TWEET_TO_COLLECTION,
  SAVE_ARTICLE_TO_COLLECTION,
  SAVE_VERA_FILE_TO_COLLECTION,
  SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION,
} from '../components/Cards/CardsButtons/AddToCollection/query';
import AddToCollectionButton from '../components/Cards/CardsButtons/AddToCollection/AddToCollectionButton';
import { CollectionArticle, CollectionContent } from '../types.generated';
import { useCollectionsListState } from '../components/Cards/CardsButtons/AddToCollection/CollectionsList/CollectionsListState';

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
];

let documentBody: RenderResult;
let data: CollectionContent = article;

describe('add to collection button', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <AddToCollectionButton data={data} />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('add item dialog box', async () => {
    data = article;
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
    await waitFor(async () => {
      expect(createCollectionArticleMock).toHaveBeenCalled();
    });
  });
});
