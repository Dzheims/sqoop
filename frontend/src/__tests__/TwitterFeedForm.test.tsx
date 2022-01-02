import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddTwitterFeedForm from '../components/SideNavigationDrawer/DrawerContents/TwitterFeedForm/AddTwitterFeedForm';

let documentBody: RenderResult;

describe('News Feed Form', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <AddTwitterFeedForm />
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
  test('input form feed keywords textfield', () => {
    const keywordsTextfield = screen.getByRole('textbox', {
      name: 'Keywords',
    });
    expect(keywordsTextfield).toHaveValue('');
    fireEvent.change(keywordsTextfield, {
      target: { value: 'Online Class' },
    });
    expect(keywordsTextfield).toHaveValue('Online Class');
  });
  test('input form feed sources textfield', () => {
    const sourcesTextfield = screen.getByRole('textbox', {
      name: 'Sources',
    });
    expect(sourcesTextfield).toHaveValue('');
    sourcesTextfield.focus();
    fireEvent.change(sourcesTextfield, {
      target: { value: 'CHED' },
    });
    fireEvent.keyDown(sourcesTextfield, { key: 'ArrowDown' });
    fireEvent.keyDown(sourcesTextfield, { key: 'Enter' });
    expect(sourcesTextfield).toHaveValue(
      'Commission on Higher Education (CHED)'
    );
  });
  test('create button', async () => {
    expect(
      await screen.findByRole('button', { name: 'Create' })
    ).toBeInTheDocument();
  });
});
