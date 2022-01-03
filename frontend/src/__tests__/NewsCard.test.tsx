import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { MockedProvider } from '@apollo/client/testing';
import NewsCard from '../components/Cards/NewsCard';
import { Article } from '../types.generated';

const data: Article = {
  author: 'Rappler.com',
  content:
    'I pray that after this game called politics is over, that wounds are healed, loved ones do not doubt your love for them, and I and my sisters, especially, the only family I have left besides my own, … [+212 chars]',
  description:
    "Kiko has been married to Sharon since 1996, while Tito is married to the actress' aunt Helen Gamboa",
  publishedAt: '2021-10-12T10:19:00Z',
  sourceId: null,
  sourceName: 'Rappler',
  suggestedKeywords: ['kiko', 'helen', 'gamboa'],
  title:
    "'In the midst of two rocks': Sharon Cuneta struggles as Kiko Pangilinan, Tito Sotto vie for VP - Rappler",
  url: 'https://www.rappler.com/entertainment/celebrities/sharon-cuneta-struggles-kiko-pangilinan-tito-sotto-run-for-vice-president-2022',
  urlToImage: null,
};

let documentBody: RenderResult;

describe('News Cards', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <NewsCard data={data} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  it('checks source name', async () => {
    const text = await documentBody.findByText('Rappler');
    expect(text).toBeInTheDocument();
  });
  it('check title', async () => {
    const text = await documentBody.findByText(
      "'In the midst of two rocks': Sharon Cuneta struggles as Kiko Pangilinan, Tito Sotto vie for VP - Rappler"
    );
    expect(text).toBeInTheDocument();
  });
  it('check link', async () => {
    const link = documentBody.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      'https://www.rappler.com/entertainment/celebrities/sharon-cuneta-struggles-kiko-pangilinan-tito-sotto-run-for-vice-president-2022'
    );
  });
  it('check description', async () => {
    const text = await documentBody.findByText(
      "Kiko has been married to Sharon since 1996, while Tito is married to the actress' aunt Helen Gamboa"
    );
    expect(text).toBeInTheDocument();
  });
  it('check date', async () => {
    const text = await documentBody.findByText('10:19:00 AM Tue Oct 12 2021');
    expect(text).toBeInTheDocument();
  });
});
