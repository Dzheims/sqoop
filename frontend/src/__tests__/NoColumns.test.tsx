import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import NoColumns from '../components/Common/NoColumns';

let documentBody: RenderResult;

describe('No Columns', () => {
  beforeEach(() => {
    documentBody = render(<NoColumns />);
  });
  afterEach(cleanup);

  test('message', () => {
    expect(
      documentBody.getByText(
        'Create feeds and collections of your favorite contents.'
      )
    ).toBeInTheDocument();
  });
  test('add now button', () => {
    expect(documentBody.getByText('Add Now')).toBeInTheDocument();
  });
});
