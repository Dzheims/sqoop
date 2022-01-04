import React from 'react';
import {
  render,
  RenderResult,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import GoogleFactCheckCard from '../components/Cards/GoogleFactCheckCard';
import { Claim } from '../types.generated';

const data: Claim = {
  text: 'The World Econimic Forum reported on the Omicron COVID-19 variant in July.',
  claimant: 'Facebook,Twitter',
  claimDate: '2021-10-12T10:30:47.000Z',
  publisherName: 'The Quint',
  publisherSite: 'thequint.com',
  url: 'https://www.thequint.com/news/webqoof/world-economic-forum-reported-on-omicron-in-july-fact-check',
  title: "No, World Economic Forum Didn't Report on Omicron COVID-19 ...",
  reviewDate: '2021-11-30T10:49:17Z',
  textualRating: 'False',
  languageCode: 'en',
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
                <GoogleFactCheckCard data={data} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  test('check claim text', async () => {
    const text = await documentBody.findByText(
      'The World Econimic Forum reported on the Omicron COVID-19 variant in July.'
    );
    expect(text).toBeInTheDocument();
  });
  test('check claim title', async () => {
    const text = await documentBody.findByText(
      "No, World Economic Forum Didn't Report on Omicron COVID-19 ..."
    );
    expect(text).toBeInTheDocument();
  });
  test('check claimant', async () => {
    const text = await documentBody.findByText('Claim by Facebook,Twitter');
    expect(text).toBeInTheDocument();
  });
  test('check publisher name and textual rating', async () => {
    const text = await documentBody.findByText('The Quint Info Rating: False');
    expect(text).toBeInTheDocument();
  });
  test('check claim date', async () => {
    const text = await documentBody.findByText(
      'Claim Date 10:30:47 AM Tue Oct 12 2021'
    );
    expect(text).toBeInTheDocument();
  });
  test('check review date', async () => {
    const text = await documentBody.findByText(
      'Review Date 10:49:17 AM Tue Nov 30 2021'
    );
    expect(text).toBeInTheDocument();
  });
});
