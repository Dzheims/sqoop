import React from 'react';
import {
  render,
  RenderResult,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import App from '../App';
import {
  DELETE_COLLECTION_MUTATION,
  DELETE_NEWS_MUTATION,
  DELETE_TWITTER_MUTATION,
  GET_COLUMNS_QUERY,
} from '../components/Columns/query';
import { ColumnData } from '../components/Columns/ColumnData';

let deleteNewsFeedQueryCalled = false;
let deleteCollectionQueryCalled = false;
let deleteTwitterFeedQueryCalled = false;

const customNewsFeed1 = {
  __typename: 'NewsFeed',
  id: 11,
  country: '',
  category: 'GENERAL',
  keyword: '',
  sources: '',
  title: 'Custom News Feed',
  createdAt: '2021-11-25 21:42:43.828621+08',
};

const customNewsFeed2 = {
  __typename: 'NewsFeed',
  id: 15,
  country: '',
  category: null,
  keyword: 'iloilo',
  sources: '',
  title: 'Iloilo News Feed',
  createdAt: '2021-11-25 21:42:43.828621+08',
};

const customNewsFeed3 = {
  __typename: 'NewsFeed',
  id: 14,
  country: 'us',
  category: null,
  keyword: '',
  sources: '',
  title: 'Custom News Feed 4',
  createdAt: '2021-11-25 21:42:43.828621+08',
};

const customTwitterFeed = {
  __typename: 'TwitterFeed',
  id: 7,
  title: 'Custom Twitter Feed',
  sources: null,
  keyword: 'President Duterte',
  createdAt: '2021-11-25 21:42:43.828621+08',
};

const collection = {
  __typename: 'Collection',
  id: 6,
  title: 'Collection Bookmarks',
  createdAt: '2021-11-25 21:42:43.828621+08',
};

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GET_COLUMNS_QUERY,
    },
    newData: () => {
      if (deleteNewsFeedQueryCalled)
        return {
          data: {
            getColumnResult: [
              customNewsFeed1,
              customNewsFeed2,
              customTwitterFeed,
              collection,
            ],
          },
        };
      if (deleteTwitterFeedQueryCalled)
        return {
          data: {
            getColumnResult: [
              customNewsFeed1,
              customNewsFeed2,
              customNewsFeed3,
              collection,
            ],
          },
        };
      if (deleteCollectionQueryCalled)
        return {
          data: {
            getColumnResult: [
              customNewsFeed1,
              customNewsFeed2,
              customNewsFeed3,
              customTwitterFeed,
            ],
          },
        };
      return {
        data: {
          getColumnResult: [
            customNewsFeed1,
            customNewsFeed2,
            customNewsFeed3,
            customTwitterFeed,
            collection,
          ],
        },
      };
    },
  },
  {
    request: {
      query: DELETE_NEWS_MUTATION,
      variables: {
        input: {
          id: 14,
        },
      },
    },
    result: {
      data: {
        deleteNewsFeed: {
          user: {
            id: 1,
            username: 'duterte',
          },
        },
      },
    },
  },
  {
    request: {
      query: DELETE_TWITTER_MUTATION,
      variables: {
        input: {
          id: 7,
        },
      },
    },
    result: {
      data: {
        deleteTwitterFeed: {
          user: {
            id: 1,
            username: 'duterte',
          },
        },
      },
    },
  },
  {
    request: {
      query: DELETE_COLLECTION_MUTATION,
      variables: {
        input: {
          id: 6,
        },
      },
    },
    result: {
      data: {
        deleteCollection: {
          user: {
            id: 1,
            username: 'duterte',
          },
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
        <ColumnData />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  test('renders Sqoopify app', async () => {
    const newsFeed = await documentBody.findByText('Custom News Feed');
    expect(newsFeed).toBeInTheDocument();
    const twitterFeed = await documentBody.findByText('Custom Twitter Feed');
    expect(twitterFeed).toBeInTheDocument();
    const collection = await documentBody.findByText('Collection Bookmarks');
    expect(collection).toBeInTheDocument();
  });

  test('news feed delete button', async () => {
    //existing newsfeed
    const newsFeed = await documentBody.findByText('Custom News Feed 4');
    expect(newsFeed).toBeInTheDocument();

    const deleteNewsFeed = await documentBody.findByTestId(
      'Custom News Feed 4'
    );
    const dialog = documentBody.queryByText('Warning!');
    //dialog box not present until clicked
    expect(dialog).not.toBeInTheDocument();
    expect(deleteNewsFeed).toBeInTheDocument();

    fireEvent.click(deleteNewsFeed);
    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('agree-delete')
      ).toBeInTheDocument();
    });

    //dialog box present
    expect(documentBody.queryByText('Warning!')).toBeInTheDocument();

    const agreeDelete = await documentBody.findByTestId('agree-delete');
    expect(agreeDelete).toBeInTheDocument();
    fireEvent.click(agreeDelete);
    deleteNewsFeedQueryCalled = true;

    await waitFor(async () => {
      expect(documentBody.queryByText('Warning!')).not.toBeInTheDocument();
    });
    expect(documentBody.queryByTestId('agree-delete')).not.toBeInTheDocument();

    await waitFor(async () => {
      expect(
        documentBody.queryByText('Custom News Feed 4')
      ).not.toBeInTheDocument();
    });

    deleteNewsFeedQueryCalled = false;
  });

  test('twitter feed delete button', async () => {
    const twitterFeed = await documentBody.findByText('Custom Twitter Feed');
    expect(twitterFeed).toBeInTheDocument();

    const deleteTwitterFeed = await documentBody.findByTestId(
      'Custom Twitter Feed'
    );
    expect(deleteTwitterFeed).toBeInTheDocument();

    const dialog = documentBody.queryByText('Warning!');
    expect(dialog).not.toBeInTheDocument();

    fireEvent.click(deleteTwitterFeed);

    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('agree-delete')
      ).toBeInTheDocument();
    });
    expect(documentBody.queryByText('Warning!')).toBeInTheDocument();

    const agreeDelete = await documentBody.findByTestId('agree-delete');
    expect(agreeDelete).toBeInTheDocument();

    fireEvent.click(agreeDelete);

    deleteTwitterFeedQueryCalled = true;

    await waitFor(async () => {
      expect(documentBody.queryByText('Warning!')).not.toBeInTheDocument();
    });

    expect(documentBody.queryByTestId('agree-delete')).not.toBeInTheDocument();

    expect(
      documentBody.queryByText('Custom Twitter Feed')
    ).not.toBeInTheDocument();
    deleteTwitterFeedQueryCalled = false;
  });

  test('collection delete button', async () => {
    const collection = await documentBody.findByText('Collection Bookmarks');
    expect(collection).toBeInTheDocument();

    const deleteCollection = await documentBody.findByTestId(
      'Collection Bookmarks'
    );
    expect(deleteCollection).toBeInTheDocument();

    const dialog = documentBody.queryByText('Warning!');
    expect(dialog).not.toBeInTheDocument();

    fireEvent.click(deleteCollection);

    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('agree-delete')
      ).toBeInTheDocument();
    });
    expect(documentBody.queryByText('Warning!')).toBeInTheDocument();

    const agreeDelete = await documentBody.findByTestId('agree-delete');
    expect(agreeDelete).toBeInTheDocument();

    fireEvent.click(agreeDelete);

    deleteCollectionQueryCalled = true;

    await waitFor(async () => {
      expect(documentBody.queryByText('Warning!')).not.toBeInTheDocument();
    });

    expect(documentBody.queryByTestId('agree-delete')).not.toBeInTheDocument();
    await waitFor(async () => {
      expect(
        documentBody.queryByText('Collection Bookmarks')
      ).not.toBeInTheDocument();
    });
    deleteCollectionQueryCalled = false;
  });

  test('cancel delete', async () => {
    const collection = await documentBody.findByText('Collection Bookmarks');
    expect(collection).toBeInTheDocument();

    const deleteCollection = await documentBody.findByTestId(
      'Collection Bookmarks'
    );
    expect(deleteCollection).toBeInTheDocument();

    const dialog = documentBody.queryByText('Warning!');
    expect(dialog).not.toBeInTheDocument();

    fireEvent.click(deleteCollection);

    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('agree-delete')
      ).toBeInTheDocument();
    });
    expect(documentBody.queryByText('Warning!')).toBeInTheDocument();

    const cancelDelete = await documentBody.findByTestId('cancel-delete');
    expect(cancelDelete).toBeInTheDocument();

    fireEvent.click(cancelDelete);

    await waitFor(async () => {
      expect(documentBody.queryByText('Warning!')).not.toBeInTheDocument();
    });

    expect(documentBody.queryByTestId('agree-delete')).not.toBeInTheDocument();

    expect(documentBody.getByText('Custom News Feed')).toBeInTheDocument();
    expect(documentBody.getByText('Custom News Feed 4')).toBeInTheDocument();
    expect(documentBody.getByText('Iloilo News Feed')).toBeInTheDocument();
    expect(documentBody.getByText('Custom Twitter Feed')).toBeInTheDocument();
    expect(documentBody.getByText('Collection Bookmarks')).toBeInTheDocument();
  });
});
