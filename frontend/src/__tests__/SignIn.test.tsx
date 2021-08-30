import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import SignIn from '../pages/SignInPage/SignIn';

let documentBody: RenderResult;

describe('Sign in Page', () => {
  beforeEach(() => {
    documentBody = render(<SignIn />);
  });
  afterEach(cleanup);
  it('displays greeting text', () => {
    expect(documentBody.getByText('Welcome Back to Sqoop')).toBeInTheDocument();
  });
});
