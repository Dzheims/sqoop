import React from 'react';
import { render, screen, RenderResult, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Homepage from '../pages/Homepage';

// let documentBody: RenderResult;

describe('News Categories', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]}>
        <Homepage />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('general category button', () => {
    expect(screen.getByRole('button', { name: 'General' })).toBeInTheDocument();
  });
});
