import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FactCheckDrawerContent from '../components/FactCheck/FactCheckDrawerContent';

describe('Fact Check Drawer', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]}>
        <FactCheckDrawerContent suggestedKeyWords={['jumps', 'dog']} />
      </MockedProvider>
    );
  });
  afterEach(cleanup);
  test('search field textfield', () => {
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
  test('input search keyword', () => {
    const searchTextfield = screen.getByRole('textbox', { name: 'Search' });
    expect(searchTextfield).toHaveValue('jumps');
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
