import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import App from '../App';
import { GET_COLUMNS_QUERY } from '../components/Columns/query';
import { ColumnsData } from '../components/Columns/ColumnsData';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_COLUMNS_QUERY,
    },
    result: {
      data: {
        getColumnResult: [
          {
            __typename: 'NewsFeed',
            id: 11,
            country: '',
            category: 'GENERAL',
            keyword: '',
            sources: '',
            title: 'Custom News Feed',
          },
          {
            __typename: 'NewsFeed',
            id: 14,
            country: 'us',
            category: null,
            keyword: '',
            sources: '',
            title: 'Custom News Feed 4',
          },
          {
            __typename: 'NewsFeed',
            id: 15,
            country: '',
            category: null,
            keyword: 'iloilo',
            sources: '',
            title: 'Iloilo News Feed',
          },
          {
            __typename: 'TwitterFeed',
            id: 7,
            title: 'Custom Twitter Feed',
            sources: null,
            keyword: 'President Duterte',
          },
          {
            __typename: 'Collection',
            id: 6,
            title: 'Collection Bookmarks',
          },
        ],
      },
    },
  },
];
let documentBody: RenderResult;

test('renders Sqoopify app', async () => {
  documentBody = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ColumnsData />
    </MockedProvider>
  );
  const newsFeed = await documentBody.findByText('Custom News Feed');
  expect(newsFeed).toBeInTheDocument();
  const twitterFeed = await documentBody.findByText('Custom Twitter Feed');
  expect(twitterFeed).toBeInTheDocument();
  const collection = await documentBody.findByText('Collection Bookmarks');
  expect(collection).toBeInTheDocument();
});
