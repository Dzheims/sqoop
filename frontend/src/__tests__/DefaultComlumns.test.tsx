import React from 'react';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DefaultColumns from '../components/Columns/DefaultColumns';

let documentBody: RenderResult;

describe('News Categories', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <DefaultColumns />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('general category button', () => {
    const generalButton = documentBody.getByRole('button', { name: 'General' });
    expect(generalButton).toBeInTheDocument();
  });
  test('general category button', () => {
    const generalButton = documentBody.getByRole('button', { name: 'General' });
    expect(generalButton).toHaveStyle(
      'backgroundColor: theme.palette.secondary.main'
    );
  });
  test('general category button', () => {
    const generalButton = documentBody.getByRole('button', {
      name: 'Business',
    });
    fireEvent.click(generalButton);
    expect(generalButton).toHaveStyle(
      'backgroundColor: theme.palette.secondary.main'
    );
  });
  test('Twitter Feed title', () => {
    const twitterFeedTitle = documentBody.getByText('Twitter Feed');
    expect(twitterFeedTitle).toBeInTheDocument();
  });

  test('News Feed title', () => {
    const newsFeedTitle = documentBody.getByText('News Feed');
    expect(newsFeedTitle).toBeInTheDocument();
  });
});
