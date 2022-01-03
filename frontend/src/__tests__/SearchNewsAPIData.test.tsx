import React, { useState } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchNewsAPIColumnData from '../components/SideNavigationDrawer/Search/SearchNewsColumnData';
import { SEARCH_NEWS_API_CONTENTS_QUERY } from '../components/SideNavigationDrawer/Search/query';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SEARCH_NEWS_API_CONTENTS_QUERY,
      variables: { keyword: 'BBM', sources: null, from: null, to: null },
    },
    result: {
      data: {
        searchArticles: [
          {
            author: 'John Doe',
            title: 'Daily News Updates',
            description: 'Daily News',
            url: 'http://www.url.com',
            urlToImage: 'http://urltoimage.com',
            publishedAt: '2021-08-26T10:09:00Z',
            content: 'The quick brown fox jumps over the lazy dog',
            sourceId: 'daily-news-updates',
            sourceName: 'John Doe News',
            suggestedKeywords: ['brown', 'quick'],
          },
          {
            author: 'Juan Dela Cruz',
            title: 'Trending News',
            description: 'Juan Dela Cruz Trending News',
            url: 'http://www.url.ph',
            urlToImage: 'http://urltoimage.ph',
            publishedAt: '2021-08-27T12:04:00Z',
            content: 'The lazy dog jumps over the quick brown fox',
            sourceId: 'trending-news-updates',
            sourceName: 'JDC News',
            suggestedKeywords: ['quick', 'fox'],
          },
          {
            author: 'Anonymous',
            title: 'Anonynews',
            description: 'Anonynews Updates',
            url: 'http://www.url.anon',
            urlToImage: 'http://urltoimage.anon',
            publishedAt: '2021-08-27T12:06:00Z',
            content: 'The quick brown dog jumps over the lazy fox',
            sourceId: 'anonymous-news-updates',
            sourceName: 'Anonymous News',
            suggestedKeywords: ['dog', 'jumps'],
          },
          {
            author: 'ABS-CNN',
            title: 'ABS-CNN News',
            description: 'Delivering the latest news',
            url: 'http://www.url.abscnn',
            urlToImage: 'http://urltoimage.abscnn',
            publishedAt: '2021-08-27T12:08:00Z',
            content: 'The quick fox jumps over the lazy brown dog',
            sourceId: 'abscnn-news-updates',
            sourceName: 'ABS-CNN News Updates',
            suggestedKeywords: ['lazy', 'jumps'],
          },
          {
            author: 'GMA',
            title: 'GMA News',
            description: '24 Hours of News',
            url: 'http://www.url.gma',
            urlToImage: 'http://urltoimage.gma',
            publishedAt: '2021-08-27T12:12:00Z',
            content: 'The quick lazy dog jumps over the brown fox',
            sourceId: 'gma-news-updates',
            sourceName: 'RGMA Daily News',
            suggestedKeywords: ['quick', 'jumps'],
          },
        ],
      },
    },
  },
];

let documentBody: RenderResult;

describe('News API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                <SearchNewsAPIColumnData
                  keyword={'BBM'}
                  sources={null}
                  from={null}
                  to={null}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </MockedProvider>
    );
  });
  it('checks content title data 1', async () => {
    const title1 = await documentBody.findByText('Daily News Updates');
    expect(title1).toBeInTheDocument();
  });
  it('checks content title data 2', async () => {
    const title2 = await documentBody.findByText('Trending News');
    expect(title2).toBeInTheDocument();
  });
  it('checks content title data 4', async () => {
    const title4 = await documentBody.findByText('ABS-CNN News');
    expect(title4).toBeInTheDocument();
  });
  it('checks content publishedAt data 1', async () => {
    const publishedAt1 = await documentBody.findByText(
      '10:09:00 AM Thu Aug 26 2021'
    );
    expect(publishedAt1).toBeInTheDocument();
  });
  it('checks content publishedAt data 2', async () => {
    const publishedAt2 = await documentBody.findByText(
      '12:04:00 PM Fri Aug 27 2021'
    );
    expect(publishedAt2).toBeInTheDocument();
  });
  it('checks content publishedAt data 3', async () => {
    const publishedAt3 = await documentBody.findByText(
      '12:06:00 PM Fri Aug 27 2021'
    );
    expect(publishedAt3).toBeInTheDocument();
  });
  it('checks content source name for data 1', async () => {
    const sourceName1 = await documentBody.findByText('John Doe News');
    expect(sourceName1).toBeInTheDocument();
  });
  it('checks content source name for data 2', async () => {
    const sourceName2 = await documentBody.findByText('JDC News');
    expect(sourceName2).toBeInTheDocument();
  });
  it('checks content source name for data 3', async () => {
    const sourceName3 = await documentBody.findByText('Anonymous News');
    expect(sourceName3).toBeInTheDocument();
  });
  it('checks content source name for data 4', async () => {
    const sourceName4 = await documentBody.findByText('ABS-CNN News Upda...');
    expect(sourceName4).toBeInTheDocument();
  });
  it('checks content source name for data 5', async () => {
    const sourceName5 = await documentBody.findByText('RGMA Daily News');
    expect(sourceName5).toBeInTheDocument();
  });
  // it('checks content url', () => {
  //   const urlToImage = documentBody.getByTestId('Image');
  //   expect(urlToImage).toHaveProperty(
  //     'background-image',
  //     `url('http://urltoimage.com')`
  //   );
  // });
});
