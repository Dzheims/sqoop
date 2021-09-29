import React from 'react';
import { render, screen, RenderResult, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SuccessBox from '../pages/SignupPage/SignUpSuccessAlert';

let documentBody: RenderResult;
const mockHistoryPush = jest.fn();

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
    const button = screen.getByTestId('btn-get-started');
    expect(button).toBeInTheDocument;
  });
  it('it renders greetings', async () => {
    const greetings = await documentBody.findByText('Awesome!');
    expect(greetings).toBeInTheDocument();
  });
});
