import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Logout from '../components/Logout/Logout';
import Cookies from 'js-cookie';

describe('Logout', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'JWT_TOKEN=omnomnom',
    });
  });

  it('clears cookies', async () => {
    render(<Logout />);

    const button = screen.getByTestId('btn-logout');
    await fireEvent.click(button);

    expect(Cookies.get('JWT_TOKEN')).toBe('');
  });
});
