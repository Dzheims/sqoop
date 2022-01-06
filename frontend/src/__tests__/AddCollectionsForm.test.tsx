import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import AddCollectionForm from '../components/SideNavigationDrawer/AddColumn/CollectionForm/AddCollectionForm';

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
    const titleTextfield = documentBody.getByRole('textbox', {
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
      await documentBody.findByRole('button', { name: 'Create' })
    ).toBeInTheDocument();
  });
});
