import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_TWITTER_API_CONTENTS_QUERY } from '../pages/Boards/query';
import TwitterAPIColumnData from '../pages/Boards/TwitterAPIColumnData';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_TWITTER_API_CONTENTS_QUERY,
    },
    result: {
      data: {
        searchTweets: [
          {
            id: 'abcdefg',
            text: 'A bird in the hand is worth two in the bush.',
          },
          {
            id: 'x9y8z7',
            text: 'Friends are flowers in the garden of life.',
          },
          {
            id: 'x9y8z7',
            text: 'The grass is always greener on the other side.',
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
        <TwitterAPIColumnData />
      </MockedProvider>
    );
  });
  it('checks content text data 1', async () => {
    const text1 = await documentBody.findByText(
      'A bird in the hand is worth two in the bush.'
    );
    expect(text1).toBeInTheDocument();
  });
  it('checks content text data 2', async () => {
    const text2 = await documentBody.findByText(
      'Friends are flowers in the garden of life.'
    );
    expect(text2).toBeInTheDocument();
  });
  it('checks content text data 3', async () => {
    const text3 = await documentBody.findByText(
      'The grass is always greener on the other side.'
    );
    expect(text3).toBeInTheDocument();
  });
});
