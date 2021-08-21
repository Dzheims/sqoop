import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import SignUp from '../pages/SignupPage/SignUp';

let documentBody: RenderResult;

describe('Sign up', () => {
  beforeEach(() => {
    documentBody = render(<SignUp />);
  });
  afterEach(cleanup);
  it('signup texts', () => {
    expect(documentBody.getByText('Welcome to Sqoop')).toBeInTheDocument();
  });
  it('signup form textfields', () => {
    expect(documentBody.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(documentBody.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  it('input signup form username textfield', () => {
    const usernameTextfield = screen.getByRole('textbox', { name: 'Username' });
    expect(usernameTextfield).toHaveValue('');
    fireEvent.change(usernameTextfield, {
      target: { value: 'Sqoop User' },
    });
    expect(usernameTextfield).toHaveValue('Sqoop User');
  });
  it('input signup form password textfield', () => {
    const passwordTextfield = screen.getByTestId('Password');
    expect(passwordTextfield).toHaveValue('');
    fireEvent.change(passwordTextfield, {
      target: { value: 'Sqoop User Password' },
    });
    expect(passwordTextfield).toHaveValue('Sqoop User Password');
  });
});
