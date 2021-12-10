import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TwitterCards from '../components/Cards/TwitterCards';
import { Tweet } from '../types.generated';

const data: Tweet = {
  authorId: '15448383',
  createdAt: '2021-10-12T10:30:47.000Z',
  tweetId: '1447872367074611210',
  name: 'Department of Foreign Affairs',
  photos: [],
  profileImageUrl:
    'https://pbs.twimg.com/profile_images/1427192891126915082/NNybyA9y_normal.jpg',
  suggestedKeywords: ['man', 'tagged', 'wanted', 'persons'],
  text: 'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales was arrested Tuesday, police said. https://t.co/kTArDk2xlq',
  username: 'inquirerdotnet',
  verified: true,
};

let documentBody: RenderResult;

describe('Twitter API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <TwitterCards
                  data={data}
                  isUnderCollections={false}
                  collectionTweet={{
                    tweetId: '1447872367074611210',
                    collectionId: 1,
                    createdAt: '2021-10-12T10:30:47.000Z',
                    collection: null,
                    id: 1,
                    nodeId: '123',
                  }}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  test('check tweet text', async () => {
    const text = await documentBody.findByText(
      'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales was arrested Tuesday, police said.'
    );
    expect(text).toBeInTheDocument();
  });
  test('check links', async () => {
    const text = await documentBody.findByText('https://t.co/kTArDk2xlq');
    expect(text).toBeInTheDocument();
    expect(text).toHaveAttribute('href', 'https://t.co/kTArDk2xlq');
  });
  test('check username', async () => {
    const text = await documentBody.findByText('Department o...');
    expect(text).toBeInTheDocument();
  });
  test('date', async () => {
    const text = await documentBody.findByText('10:30:47 AM Tue Oct 12 2021');
    expect(text).toBeInTheDocument();
  });
});
