import React from 'react';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SuccessBox from '../pages/SignUpPage/SignUpSuccessAlert';

let documentBody: RenderResult;

describe('Success Box', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <SuccessBox />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  it('renders button', () => {
    const button = documentBody.getByTestId('btn-get-started');
    expect(button).toBeInTheDocument();
  });
  it('it renders greetings', async () => {
    const greetings = await documentBody.findByText('Awesome!');
    expect(greetings).toBeInTheDocument();
  });
});
