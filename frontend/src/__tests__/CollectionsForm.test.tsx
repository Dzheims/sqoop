import React from 'react';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddCollectionForm from '../components/Drawers/DrawerContents/CollectionForm/AddCollectionsForm';

let documentBody: RenderResult;

describe('Collections Form', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]}>
        <AddCollectionForm />
      </MockedProvider>
    );
  });
  afterEach(cleanup);

  test('input form collection title textfield', () => {
    const titleTextfield = screen.getByRole('textbox', {
      name: 'Collection Title',
    });
    expect(titleTextfield).toHaveValue('');
    fireEvent.change(titleTextfield, {
      target: { value: 'Sqoopified Collection' },
    });
    expect(titleTextfield).toHaveValue('Sqoopified Collection');
  });
  test('create button', async () => {
    expect(
      await screen.findByRole('button', { name: 'Create' })
    ).toBeInTheDocument();
  });
});
