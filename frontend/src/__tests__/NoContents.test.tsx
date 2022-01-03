import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import NoContents from '../components/Common/NoContents';
let documentBody: RenderResult;

describe('No Contents Found', () => {
  beforeEach(() => {
    documentBody = render(
      <NoContents
        header={'Sorry!'}
        subHeader={'No contents found in the last 7 days'}
      />
    );
  });
  afterEach(cleanup);

  test('header', () => {
    expect(documentBody.getByText('Sorry!')).toBeInTheDocument();
  });
  test('subheader', () => {
    expect(
      documentBody.getByText('No contents found in the last 7 days')
    ).toBeInTheDocument();
  });
});
