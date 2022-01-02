/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  screen,
  wait,
} from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import SignIn from '../pages/SignInPage/SignIn';
import Search from '../components/SideNavigationDrawer/DrawerContents/Search/Search';

let documentBody: RenderResult;

describe('Search Drawer', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <Search />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('search Bar', () => {
    expect(documentBody.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  test('current search buttons', async () => {
    const twitterButton = await documentBody.findByText('Twitter');
    const newsButton = await documentBody.findByText('News');
    expect(twitterButton).toBeInTheDocument();
    expect(newsButton).toBeInTheDocument();
  });
  test('search filter', async () => {
    const filter = await documentBody.findByText('Filters');
    expect(filter).toBeInTheDocument();
  });
  test('news filters', async () => {
    const expandFilters = await documentBody.findByTestId('expandFilters');
    expect(expandFilters).toBeInTheDocument();
    fireEvent.click(expandFilters);
    const newsSources = await documentBody.findByPlaceholderText(
      'News Sources'
    );
    const startDate = await documentBody.findByPlaceholderText('Start Date');
    const endDate = await documentBody.findByPlaceholderText('End Date');
    expect(newsSources).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
  });
  test('twitter filters', async () => {
    const expandFilters = await documentBody.findByTestId('expandFilters');
    expect(expandFilters).toBeInTheDocument();
    const twitterButton = await documentBody.findByText('Twitter');
    fireEvent.click(twitterButton);
    fireEvent.click(expandFilters);
    const newsSources = await documentBody.findByPlaceholderText(
      'Twitter Sources'
    );
    const startDate = await documentBody.findByPlaceholderText('Start Date');
    const endDate = await documentBody.findByPlaceholderText('End Date');
    expect(newsSources).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
  });
  test('searchArticles', async () => {
    const searchBar = documentBody.getByPlaceholderText('Search');

    expect(searchBar).toHaveValue('');
    fireEvent.change(searchBar, {
      target: { value: 'BBM' },
    });
    expect(searchBar).toHaveValue('BBM');
  });
});
