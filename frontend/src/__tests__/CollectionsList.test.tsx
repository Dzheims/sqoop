import React from 'react';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_COLLECTIONS_LIST_QUERY } from '../components/Cards/CardsButtons/AddToCollection/CollectionsList/query';
import CollectionsList from '../components/Cards/CardsButtons/AddToCollection/CollectionsList/CollectionsList';
import GET_CURRENT_USER_ID_QUERY from '../authentication/authentication.query';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: { query: GET_CURRENT_USER_ID_QUERY },
    result: {
      data: {
        currentUserId: 1,
      },
    },
  },
  {
    request: {
      query: GET_COLLECTIONS_LIST_QUERY,
      variables: {
        condition: {
          userId: 1,
        },
      },
    },
    result: {
      data: {
        collections: [
          {
            title: 'Science',
            id: 22,
          },
          {
            title: 'Leni',
            id: 23,
          },
        ],
      },
    },
  },
];

const emptyCollectionmocks: ReadonlyArray<MockedResponse> = [
  {
    request: { query: GET_CURRENT_USER_ID_QUERY },
    result: {
      data: {
        currentUserId: 2,
      },
    },
  },
  {
    request: {
      query: GET_COLLECTIONS_LIST_QUERY,
      variables: {
        condition: {
          userId: 2,
        },
      },
    },
    result: {
      data: {
        collections: [],
      },
    },
  },
];

const errorCollectionmocks: ReadonlyArray<MockedResponse> = [
  {
    request: { query: GET_CURRENT_USER_ID_QUERY },
    result: {
      data: {
        currentUserId: 2,
      },
    },
  },
  {
    request: {
      query: GET_COLLECTIONS_LIST_QUERY,
      variables: {
        condition: {
          userId: 1,
        },
      },
    },
    error: new Error('network error'),
  },
];

let documentBody: RenderResult;

describe('Collections', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks}>
        <CollectionsList />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('collection list', async () => {
    const collection = await documentBody.findByText('Science');
    expect(collection).toBeInTheDocument();
  });
});

describe('Empty Collection', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={emptyCollectionmocks}>
        <CollectionsList />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('loading state', () => {
    const loadingState = documentBody.getByText('Please Wait');
    expect(loadingState).toBeInTheDocument();
  });
  test('add now button', async () => {
    const text = await documentBody.findByText('No collections yet.');
    expect(text).toBeInTheDocument();
    const addNowButton = await documentBody.findByText('Add Now');
    expect(addNowButton).toBeInTheDocument();
  });
});

describe('error for collection list', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={errorCollectionmocks}>
        <CollectionsList />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('error state', async () => {
    const noDataState = await documentBody.findByText('Something went wrong');
    expect(noDataState).toBeInTheDocument();
  });
});
