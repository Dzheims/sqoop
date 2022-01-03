import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import VeraFilesCard from '../components/Cards/VeraFilesCard';
import { VeraFiles } from '../types.generated';

const data: VeraFiles = {
  author: 'Klaire Ting and Nica Rhiana Hanopol',
  date: '2021-11-30 11:54:00',
  category: 'Reports',
  dateText: 'Nov 30, 2021, 11:54 AM',
  description: 'Months after the World Health Organization (WHO)&hellip;',
  id: 0,
  imageStyle:
    "background-image: url('/application/files/2116/3823/7365/virologist_-_internews_story_part_2_thumbnail.png')",
  imageUrl:
    'https://verafiles.org/application/files/2116/3823/7365/virologist_-_internews_story_part_2_thumbnail.png',
  title:
    'Virologists as gatekeepers: Local scientists prepare for the next pandemic',
  url: 'https://verafiles.org/articles/virologists-gatekeepers-local-scientists-prepare-next-pandem',
};

let documentBody: RenderResult;

describe('Google Fact Check Cards', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <VeraFilesCard data={data} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  test('check author', async () => {
    const text = await documentBody.findByText(
      'By Klaire Ting and Nica Rhiana Hanopol'
    );
    expect(text).toBeInTheDocument();
  });
  test('check date', async () => {
    const text = await documentBody.findByText('11:54:00 AM Tue Nov 30 2021');
    expect(text).toBeInTheDocument();
  });
  test('check title', async () => {
    const text = await documentBody.findByText(
      'Virologists as gatekeepers: Local scientists prepare for the next pandemic'
    );
    expect(text).toBeInTheDocument();
  });
});
