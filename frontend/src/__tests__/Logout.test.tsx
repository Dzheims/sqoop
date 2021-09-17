import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Cookies from 'js-cookie';
import Logout from '../components/Account/Logout';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Logout', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'JWT_TOKEN=somejwttoken',
    });
  });

  it('clears cookies', () => {
    render(<Logout />);

    const button = screen.getByTestId('btn-logout');
    fireEvent.click(button);

    expect(Cookies.get('JWT_TOKEN')).toBe('');
  });
  it('redirects to sign in page', () => {
    render(<Logout />);

    const button = screen.getByTestId('btn-logout');
    fireEvent.click(button);

    expect(mockHistoryPush).toHaveBeenCalledWith('/signin');
  });
});
