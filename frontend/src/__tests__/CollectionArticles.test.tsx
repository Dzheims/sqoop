import React from 'react';
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewsCards from '../components/Cards/NewsCards';
import { CollectionArticle } from '../types.generated';

const data: CollectionArticle = {
  __typename: 'CollectionArticle',
  publishedAt: '2021-11-05T10:38:30Z',
  sourceName: 'Space.com',
  title:
    'Astronomers detect water in one of the oldest known galaxies - Space.com',
  urlToImage:
    'https://cdn.mos.cms.futurecdn.net/JN9fjndKScwGXxqBxDF4ef-1200-80.jpg',
  description:
    'Astronomers have detected traces of water in one of the oldest known galaxies proving for the first time that the life-giving substance played a role in the formation of the earliest stars.',
  id: 0,
  collectionId: 0,
  createdAt: '',
  nodeId: '',
};

let documentBody: RenderResult;

describe('Collection Articles', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={true}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <NewsCards data={data} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });

  afterEach(cleanup);

  test('source name', async () => {
    const sourceNameText = await documentBody.findByText('Space.com');
    expect(sourceNameText).toBeInTheDocument();
  });
  test('title', async () => {
    const titleText = await documentBody.findByText(
      'Astronomers detect water in one of the oldest known galaxies - Space.com'
    );
    expect(titleText).toBeInTheDocument();
  });
  test('description', async () => {
    const descriptionText = await documentBody.findByText(
      'Astronomers have detected traces of water in one of the oldest known galaxies proving for the first time that the life-giving substance played a role in the formation of the earliest stars.'
    );
    expect(descriptionText).toBeInTheDocument();
  });
  test('add item dialog box', async () => {
    const saveToCollectionButton = await documentBody.findByTestId(
      'save-to-collections'
    );
    const dialogBox = documentBody.queryByText('Save Contents to Collection');
    expect(saveToCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(saveToCollectionButton);
    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('submit-save')
      ).toBeInTheDocument();
    });
  });
  test('remove card dialog box', async () => {
    const removeFromCollectionButton = await documentBody.findByTestId(
      'remove-from-collections'
    );
    const dialogBox = documentBody.queryByText(
      'Are you sure you want to remove this article from the collection?'
    );
    expect(removeFromCollectionButton).toBeInTheDocument();
    expect(dialogBox).not.toBeInTheDocument();

    fireEvent.click(removeFromCollectionButton);
    await waitFor(async () => {
      expect(
        await documentBody.findByTestId('cancel-delete')
      ).toBeInTheDocument();
      expect(
        await documentBody.findByTestId('agree-delete')
      ).toBeInTheDocument();
    });
    const warningDialogBox = documentBody.queryByText(
      'Are you sure you want to remove this article from the collection?'
    );
    expect(warningDialogBox).toBeInTheDocument();
  });
});
