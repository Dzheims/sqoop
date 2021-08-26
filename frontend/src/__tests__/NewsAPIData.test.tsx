import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_NEWS_API_CONTENTS_QUERY } from '../pages/Boards/query';
import NewsAPIColumnData from '../pages/Boards/NewsAPIColumnData';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_NEWS_API_CONTENTS_QUERY,
    },
    result: {
      data: {
        topHeadlines: [
          {
            author: 'John Doe',
            title: 'Daily News Updates',
            description: 'Daily News',
            url: 'http://www.url.com',
            urlToImage: 'http://urltoimage.com',
            publishedAt: '2021-08-26T10:09:00Z',
            content: 'The  jumps over the lazy dog',
            source: {
              id: 'daily-news-updates',
              name: 'John Doe News',
            },
          },
        ],
      },
    },
  },
];

let documentBody: RenderResult;

describe('news API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NewsAPIColumnData />
      </MockedProvider>
    );
  });
  it('checks content title', async () => {
    const title = await documentBody.findByText('Daily News Updates');
    expect(title).toBeInTheDocument();
  });
  it('checks content publishedAt', async () => {
    const publishedAt = await documentBody.findByText('2021-08-26T10:09:00Z');
    expect(publishedAt).toBeInTheDocument();
  });
  it('checks content source name', async () => {
    const sourceName = await documentBody.findByText('John Doe News');
    expect(sourceName).toBeInTheDocument();
  });
  // it('checks content url', () => {
  //   const urlToImage = documentBody.getByTestId('Image');
  //   expect(urlToImage).toHaveProperty(
  //     'background-image',
  //     `url('http://urltoimage.com')`
  //   );
  // });
});
