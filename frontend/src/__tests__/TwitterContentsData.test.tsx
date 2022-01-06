import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { GET_TWITTER_API_CONTENTS_QUERY } from '../components/ColumnContents/query';
import TwitterContentsData from '../components/ColumnContents/TwitterContentsData';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_TWITTER_API_CONTENTS_QUERY,
      variables: { keyword: null, sources: null },
    },
    result: {
      data: {
        searchTweets: [
          {
            authorId: 'abcdefg',
            tweetId: '123409781935',
            publishedAt: '2021-09-02T15:13:49.000Z',
            name: 'Sqoop News',
            photos: [
              {
                mediaKey: '123456',
                type: 'photo',
                url: 'http://photoUrl.jpg',
              },
            ],
            profileImageUrl: 'http://profileImageUrl.jpg',
            text: 'A bird in the hand is worth two in the bush.',
            username: 'sqoopnews',
            verified: true,
            suggestedKeywords: ['bird', 'hand'],
          },
          {
            authorId: 'x9y8z7',
            tweetId: '123409781935',
            publishedAt: '2021-09-02T16:13:49.000Z',
            name: 'Google News',
            photos: [
              {
                mediaKey: '213143',
                type: 'photo',
                url: 'http://photoUrl1.png',
              },
              {
                mediaKey: '344567',
                type: 'photo',
                url: 'http://photoUrl2.png',
              },
            ],
            profileImageUrl: 'http://profileImageUrl.png',
            text: 'Friends are flowers in the garden of life.',
            username: 'googleNews',
            verified: true,
            suggestedKeywords: ['bird', 'hand'],
          },
          {
            authorId: 'x9y8z7',
            tweetId: '123409781935',
            publishedAt: '2021-09-02T17:13:49.000Z',
            name: 'ABS-CBN News',
            photos: [
              {
                mediaKey: '09876',
                type: 'photo',
                url: 'http://photoUrl.gif',
              },
            ],
            profileImageUrl: 'http://profileImageUrl1.jpg',
            text: 'The grass is always greener on the other side.',
            username: 'abscbn',
            verified: true,
            suggestedKeywords: ['bird', 'hand'],
          },
        ],
      },
    },
  },
];

let documentBody: RenderResult;

describe('Twitter API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <TwitterContentsData keyword={null} sources={null} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  it('checks content text data 1', async () => {
    const text = await documentBody.findByText(
      'A bird in the hand is worth two in the bush.'
    );
    expect(text).toBeInTheDocument();
  });
  it('checks content text data 2', async () => {
    const text = await documentBody.findByText(
      'Friends are flowers in the garden of life.'
    );
    expect(text).toBeInTheDocument();
  });
  it('checks content text data 3', async () => {
    const text = await documentBody.findByText(
      'The grass is always greener on the other side.'
    );
    expect(text).toBeInTheDocument();
  });
  it('checks content username', async () => {
    const username = await documentBody.findByText('@abscbn');
    expect(username).toBeInTheDocument();
  });
  it('checks content name', async () => {
    const name = await documentBody.findByText('Google News');
    expect(name).toBeInTheDocument();
  });
  it('checks content date 1', async () => {
    const date = await documentBody.findByText('3:13:49 PM Thu Sep 02 2021');
    expect(date).toBeInTheDocument();
  });
  it('checks content date 2', async () => {
    const date = await documentBody.findByText('4:13:49 PM Thu Sep 02 2021');
    expect(date).toBeInTheDocument();
  });
});
