import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FactCheckDrawerContent from '../components/Drawers/DrawerContents/FactCheck/FactCheckDrawerContent';

describe('Fact Check Drawer', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]}>
        <FactCheckDrawerContent />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('search field textfield', () => {
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
  test('input search keyword', () => {
    const searchTextfield = screen.getByRole('textbox', { name: 'Search' });
    expect(searchTextfield).toHaveValue('');
    fireEvent.change(searchTextfield, {
      target: { value: 'Marcos' },
    });
    expect(searchTextfield).toHaveValue('Marcos');
  });
  test('Google and Vera Fact Check Buttons', () => {
    const googleFactCheckSearch = screen.getByRole('button', {
      name: 'Google Fact Check',
    });
    expect(googleFactCheckSearch).toBeInTheDocument();
    const veraFactCheckSearch = screen.getByRole('button', {
      name: 'Vera Files',
    });
    expect(veraFactCheckSearch).toBeInTheDocument();
  });
});
