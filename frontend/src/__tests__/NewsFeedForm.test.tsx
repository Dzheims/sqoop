import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddNewsAPIFeedForm from '../components/Drawers/DrawerContents/NewsApiFeedForm/AddNewsAPIFeedForm';

let documentBody: RenderResult;

describe('News Feed Form', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <AddNewsAPIFeedForm />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  test('input form feed title textfield', () => {
    const titleTextfield = screen.getByRole('textbox', {
      name: 'Feed Title',
    });
    expect(titleTextfield).toHaveValue('');
    fireEvent.change(titleTextfield, {
      target: { value: 'General News Feed' },
    });
    expect(titleTextfield).toHaveValue('General News Feed');
  });
  test('news feed form category label', () => {
    expect(documentBody.getByText('Categories')).toBeInTheDocument();
  });
  test('input form feed country textfield', () => {
    const countryTextfield = screen.getByRole('textbox', {
      name: 'Country',
    });
    expect(countryTextfield).toHaveValue('');
    fireEvent.change(countryTextfield, {
      target: { value: 'Philippines' },
    });
    expect(countryTextfield).toHaveValue('Philippines');
  });
  test('input form feed keywords textfield', () => {
    const keywordsTextfield = screen.getByRole('textbox', {
      name: 'Keywords',
    });
    expect(keywordsTextfield).toHaveValue('');
    fireEvent.change(keywordsTextfield, {
      target: { value: 'COVID' },
    });
    expect(keywordsTextfield).toHaveValue('COVID');
  });
  test('input form feed sources textfield', () => {
    const sourcesTextfield = screen.getByRole('textbox', {
      name: 'Sources',
    });
    expect(sourcesTextfield).toHaveValue('');
    fireEvent.change(sourcesTextfield, {
      target: { value: 'COVID' },
    });
    expect(sourcesTextfield).toHaveValue('COVID');
  });
  test('create button', async () => {
    expect(
      await screen.findByRole('button', { name: 'Create' })
    ).toBeInTheDocument();
  });
});
