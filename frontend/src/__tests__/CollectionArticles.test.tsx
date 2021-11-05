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
import { Article } from '../types.generated';

const data: Article = {
  publishedAt: '2021-11-05T10:38:30Z',
  sourceName: 'Space.com',
  title:
    'Astronomers detect water in one of the oldest known galaxies - Space.com',
  urlToImage:
    'https://cdn.mos.cms.futurecdn.net/JN9fjndKScwGXxqBxDF4ef-1200-80.jpg',
  description:
    'Astronomers have detected traces of water in one of the oldest known galaxies proving for the first time that the life-giving substance played a role in the formation of the earliest stars.',
};

let documentBody: RenderResult;

describe('Collection Articles', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={false}>
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
  test('dialog box', async () => {
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
});
