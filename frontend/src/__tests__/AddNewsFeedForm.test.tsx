import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import AddNewsFeedForm from '../components/SideNavigationDrawer/AddColumn/NewsFeedForm/AddNewsFeedForm';
import { NEWS_SOURCES } from '../components/SideNavigationDrawer/AddColumn/NewsFeedForm/query';

let documentBody: RenderResult;
const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: NEWS_SOURCES,
    },
    result: {
      data: {
        topHeadlinesSources: [
          {
            __typename: 'Source',
            name: 'Bloomberg',
            id: 'bloomberg.com',
          },
          {
            __typename: 'Source',
            name: 'BBC News',
            id: 'bbc-news',
          },
          {
            __typename: 'Source',
            name: 'CNN USA',
            id: 'cnn.usa',
          },
        ],
      },
    },
  },
];

describe('News Feed Form', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddNewsFeedForm />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  test('input form feed title textfield', () => {
    const titleTextfield = screen.getByRole('textbox', {
      name: 'Feed Title',
    });
    expect(titleTextfield).toHaveValue('');
    fireEvent.change(titleTextfield, {
      target: { value: 'General News Feed' },
    });
    expect(titleTextfield).toHaveValue('General News Feed');
  });
  test('news feed form category label', () => {
    expect(documentBody.getByText('Categories')).toBeInTheDocument();
  });
  test('input form feed country textfield', () => {
    const countryTextfield = screen.getByRole('textbox', {
      name: 'Country',
    });
    expect(countryTextfield).toHaveValue('');
    countryTextfield.focus();
    fireEvent.change(countryTextfield, {
      target: { value: 'states' },
    });
    fireEvent.keyDown(countryTextfield, { key: 'ArrowDown' });
    fireEvent.keyDown(countryTextfield, { key: 'Enter' });
    expect(countryTextfield).toHaveValue('United States of America');
  });
  test('input form feed keywords textfield', () => {
    const keywordsTextfield = screen.getByRole('textbox', {
      name: 'Keywords',
    });
    expect(keywordsTextfield).toHaveValue('');
    fireEvent.change(keywordsTextfield, {
      target: { value: 'COVID' },
    });
    expect(keywordsTextfield).toHaveValue('COVID');
  });
  test('input form feed sources textfield', async () => {
    const sourcesTextfield = screen.getByRole('textbox', {
      name: 'Sources',
    });
    expect(sourcesTextfield).toHaveValue('');
    sourcesTextfield.focus();
    await wait();
    fireEvent.change(sourcesTextfield, {
      target: { value: 'BB' },
    });
    await wait();
    fireEvent.keyDown(sourcesTextfield, { key: 'ArrowDown' });
    fireEvent.keyDown(sourcesTextfield, { key: 'Enter' });
    expect(sourcesTextfield).toHaveValue('BBC News');
  });
  test('create button', async () => {
    expect(
      await screen.findByRole('button', { name: 'Create' })
    ).toBeInTheDocument();
  });
});
