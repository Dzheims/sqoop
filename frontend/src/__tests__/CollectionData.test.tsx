import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  COLLECTION_CONTENTS_QUERY,
  COLLECTION_TWEETS,
} from '../components/Columns/query';
import CollectionColumnData from '../pages/Boards/CollectionColumnData';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: COLLECTION_CONTENTS_QUERY,
      variables: { collectionId: 1 },
    },
    result: {
      data: {
        collectionContents: [
          {
            __typename: 'CollectionTweet',
            tweetId: '123456789',
            collectionId: 1,
            id: 1,
          },
        ],
      },
    },
  },
  {
    request: {
      query: COLLECTION_TWEETS,
      variables: { id: '123456789' },
    },
    result: {
      data: {
        tweetLookup: {
          authorId: '15448383',
          createdAt: '2021-10-12T10:30:47.000Z',
          tweetId: '123456789',
          name: 'Inquirer',
          photos: null,
          profileImageUrl:
            'https://pbs.twimg.com/profile_images/1427192891126915082/NNybyA9y_normal.jpg',
          suggestedKeywords: ['man', 'tagged', 'wanted', 'persons'],
          text: 'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales.',
          username: 'inquirerdotnet',
          verified: true,
        },
      },
    },
  },
];

let documentBody: RenderResult;

describe('Columns', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <CollectionColumnData collectionId={1} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });

  afterEach(cleanup);

  test('check tweet text', async () => {
    const text = await documentBody.findByText(
      'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales.'
    );
    expect(text).toBeInTheDocument();
  });
  test('check username', async () => {
    const text = await documentBody.findByText('Inquirer');
    expect(text).toBeInTheDocument();
  });
  test('date', async () => {
    const text = await documentBody.findByText('10:30:47 AM Tue Oct 12 2021');
    expect(text).toBeInTheDocument();
  });
});
