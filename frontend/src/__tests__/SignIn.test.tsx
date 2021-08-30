/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  screen,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SignIn from '../pages/SignInPage/SignIn';

let documentBody: RenderResult;

describe('Login page placeholders and tags', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <SignIn />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('sign in text', () => {
    expect(documentBody.getByText('Sqoop')).toBeInTheDocument();
  });
  test('signin form text fields', () => {
    expect(documentBody.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(documentBody.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  test('input signup form username textfield', () => {
    const usernameTextfield = screen.getByRole('textbox', { name: 'Username' });
    expect(usernameTextfield).toHaveValue('');
    fireEvent.change(usernameTextfield, {
      target: { value: 'Sqoop User' },
    });
    expect(usernameTextfield).toHaveValue('Sqoop User');
  });
  test('input signup form password textfield', () => {
    const passwordTextfield = screen.getByTestId('Password');
    expect(passwordTextfield).toHaveValue('');
    fireEvent.change(passwordTextfield, {
      target: { value: 'SqoopUserPassword' },
    });
    expect(passwordTextfield).toHaveValue('SqoopUserPassword');
  });
});
