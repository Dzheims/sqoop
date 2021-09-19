import React, { useState } from 'react';
import {
  render,
  screen,
  RenderResult,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CategoriesButtons from '../components/Categories/CategoriesButtons';

// let documentBody: RenderResult;

describe('News Categories', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]}>
        <CategoriesButtons />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('general category button', () => {
    const generalButton = screen.getByRole('button', { name: 'General' });
    expect(generalButton).toBeInTheDocument();
  });
  test('general category button', () => {
    const generalButton = screen.getByRole('button', { name: 'General' });
    expect(generalButton).toHaveStyle(
      'backgroundColor: theme.palette.secondary.main'
    );
  });
  test('general category button', () => {
    const generalButton = screen.getByRole('button', { name: 'Business' });
    fireEvent.click(generalButton);
    expect(generalButton).toHaveStyle(
      'backgroundColor: theme.palette.secondary.main'
    );
  });
});
