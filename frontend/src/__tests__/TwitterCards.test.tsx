import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { GET_TWITTER_API_CONTENTS_QUERY } from '../pages/Boards/query';
import TwitterAPIColumnData from '../pages/Boards/TwitterAPIColumnData';
import TwitterCards from '../components/Cards/TwitterCards';
import { Tweet } from '../types.generated';

const data: Tweet = {
  author_id: '15448383',
  created_at: '2021-10-12T10:30:47.000Z',
  id: '1447872367074611210',
  name: 'Department of Foreign Affairs',
  photos: [],
  profile_image_url:
    'https://pbs.twimg.com/profile_images/1427192891126915082/NNybyA9y_normal.jpg',
  suggestedKeywords: ['man', 'tagged', 'wanted', 'persons'],
  text: 'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales was arrested Tuesday, police said. https://t.co/kTArDk2xlq',
  username: 'inquirerdotnet',
  verified: true,
};

let documentBody: RenderResult;

describe('Twitter API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TwitterCards data={data} />
      </MockedProvider>
    );
  });
  it('checks content text data 1', async () => {
    const text = await documentBody.findByText(
      'A man tagged as one of the most wanted persons in Sta. Cruz, Zambales was arrested Tuesday, police said.'
    );
    expect(text).toBeInTheDocument();
  });
  it('check links', async () => {
    const text = await documentBody.findByText('https://t.co/kTArDk2xlq');
    expect(text).toBeInTheDocument();
    expect(text).toHaveAttribute('href', 'https://t.co/kTArDk2xlq');
  });
  it('check username', async () => {
    const text = await documentBody.findByText('Department ...');
    expect(text).toBeInTheDocument();
  });
  it('date', async () => {
    const text = await documentBody.findByText('10:30:47 AM Tue Oct 12 2021');
    expect(text).toBeInTheDocument();
  });
});
