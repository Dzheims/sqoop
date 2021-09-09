import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Logout from '../components/Logout/Logout';
import Cookies from 'js-cookie';

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

  it('clears cookies', async () => {
    render(<Logout />);

    const button = screen.getByTestId('btn-logout');
    await fireEvent.click(button);

    expect(Cookies.get('JWT_TOKEN')).toBe('');
  });
  it('redirects to sign in page', async () => {
    render(<Logout />);

    const button = screen.getByTestId('btn-logout');
    await fireEvent.click(button);

    expect(mockHistoryPush).toHaveBeenCalledWith('/signin');
  });
});
