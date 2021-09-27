import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GOOGLE_FACTCHECK_SEARCH_QUERY } from '../components/FactCheck/query';
import GoogleFactCheckData from '../components/FactCheck/GoogleFactCheckData';

const keyword = 'Duterte';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: GOOGLE_FACTCHECK_SEARCH_QUERY,
      variables: { keyword },
    },
    result: {
      data: {
        googleFactCheckSearch: [
          {
            claimDate: '2021-09-18T00:00:00Z',
            claimReview: [
              {
                languageCode: 'en',
                publisher: {
                  name: 'AFP Fact Check',
                  site: 'factcheck.afp.com',
                },
                reviewDate: '2021-09-22T05:52:00Z',
                textualRating: 'Missing context',
                title:
                  "Video does not show Philippine senator 'apologising' to President Duterte after public spat",
                url: 'https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9N74GZ-7',
              },
            ],
            claimant: 'multiple persons',
            text: 'Philippine senator apologised to President Duterte after public spat',
          },
          {
            claimDate: null,
            claimReview: [
              {
                languageCode: 'fil',
                publisher: {
                  name: 'Rappler',
                  site: 'rappler.com',
                },
                reviewDate: '2021-09-21T08:43:50Z',
                textualRating: 'False',
                title:
                  'HINDI TOTOO: Sinisiraan ng US si Bongbong Marcos dahil sa ...',
                url: 'https://www.rappler.com/newsbreak/fact-check/united-states-vilifies-bongbong-marcos-ahead-2022-elections',
              },
            ],
            claimant: null,
            text: 'Sinisiraan na raw ng United States si Bongbong Marcos dahil sa takot na baka siya ang maging susunod na presidente ng Pilipinas.',
          },
          {
            claimDate: null,
            claimReview: [
              {
                languageCode: 'en',
                publisher: {
                  name: 'Rappler',
                  site: 'rappler.com',
                },
                reviewDate: '2021-08-19T09:52:19Z',
                textualRating: 'False',
                title:
                  "FALSE: No gov't funds spent building Imelda Marcos' pet ...",
                url: 'https://www.rappler.com/newsbreak/fact-check/no-government-funds-spent-build-imelda-marcos-pet-infrastructure-projects',
              },
            ],
            claimant: null,
            text: 'No government funds were spent to build infrastructures former first lady Imelda Marcos wanted built.',
          },
          {
            claimDate: null,
            claimReview: [
              {
                languageCode: 'en',
                publisher: {
                  name: 'Rappler',
                  site: 'rappler.com',
                },
                reviewDate: '2021-08-14T02:00:31Z',
                textualRating: 'Misleading',
                title:
                  'MISSING CONTEXT: No SUCs established during 5 administrations ...',
                url: 'https://www.rappler.com/newsbreak/fact-check/no-state-universities-and-colleges-established-during-the-next-five-administrations-after-marcos',
              },
            ],
            claimant: null,
            text: 'There were no state universities and colleges (SUC’s) established during the administrations of former presidents Corazon “Cory” Aquino, Fidel Ramos, Joseph Estrada, Gloria Macapagal-Arroyo, and Benigno “Noynoy” Aquino, which were the next five administrations after the presidency of former president Ferdinand Marcos.',
          },
        ],
      },
    },
  },
];

let documentBody: RenderResult;

describe('Twitter API contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GoogleFactCheckData keyword={keyword} />
      </MockedProvider>
    );
  });
  it('checks content text data 1', async () => {
    const name = await documentBody.findByText('AFP Fact Check');
    expect(name).toBeInTheDocument();
  });
  it('checks content text data 2', async () => {
    const claimant = await documentBody.findByText('Claim by multiple persons');
    expect(claimant).toBeInTheDocument();
  });
  it('checks content text data 3', async () => {
    const description = await documentBody.findByText(
      'Sinisiraan na raw ng United States si Bongbong Marcos dahil sa takot na baka siya ang maging susunod na presidente ng Pilipinas.'
    );
    expect(description).toBeInTheDocument();
  });
  it('checks content text data 4', async () => {
    const date = await documentBody.findByText(
      'Review Date 2:00:31 AM Sat Aug 14 2021'
    );
    expect(date).toBeInTheDocument();
  });
  it('checks content text data 5', async () => {
    const rating = await documentBody.findAllByText('Info Rating: False');
    expect(rating[0]).toBeInTheDocument();
  });
});
