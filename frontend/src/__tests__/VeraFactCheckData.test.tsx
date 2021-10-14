import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { VERA_FACTCHECK_SEARCH_QUERY } from '../components/FactCheck/query';
import VeraFactCheckData from '../components/FactCheck/VeraFactCheckData';

const keyword = 'Duterte';

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: VERA_FACTCHECK_SEARCH_QUERY,
      variables: { keyword },
    },
    result: {
      data: {
        veraFilesFactCheck: [
          {
            author: 'VERA Files',
            category: 'Fact Check Filipino',
            date: '2021-05-31 20:30:00',
            dateText: 'May 31, 2021, 8:30 PM',
            description:
              'Mula sa pagsabing malamang na hindi tumakbo para&hellip;',
            id: 0,
            imageStyle:
              "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
            title:
              'VERA FILES FACT CHECK: Palasyo nagbago ng linya sa pagtakbo ni Duterte sa 2022 bilang VP',
            imageUrl:
              'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
            url: 'https://verafiles.org/articles/vera-files-fact-check-palasyo-nagbago-ng-linya-sa-pagtakbo-n',
          },
          {
            author: 'VERA Files',
            category: 'Reports, Fact-Check',
            date: '2021-05-31 19:41:00',
            dateText: 'May 31, 2021, 7:41 PM',
            description:
              'From expressing that President Rodrigo Duterte&hellip;',
            id: 1,
            imageStyle:
              "background-image: url('/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg')",
            title:
              'VERA FILES FACT CHECK: Palace sings different tune on Duterte&rsquo;s 2022 bid for VP',
            imageUrl:
              'verafiles.org/application/files/7916/2246/1567/thumbnail_Duterte_and_Roque.jpg',
            url: 'https://verafiles.org/articles/vera-files-fact-check-palace-sings-different-tune-dutertes-2',
          },
          {
            author: 'VERA FILES',
            category: 'Fact Check Filipino',
            date: '2018-11-02 01:00:00',
            dateText: 'Nov 2, 2018, 1:00 AM',
            description:
              'Maling ipinahayag ni Pangulo Rodrigo Duterte nang&hellip;',
            id: 2,
            imageStyle:
              "background-image: url('/application/files/5115/4104/3772/Duterte_Oct_28_2018_in_Davao.jpg')",
            title:
              'VERA FILES FACT CHECK: Duterte MALI ANG PAHAYAG na EU ang lumikha ng ICC',
            imageUrl:
              'verafiles.org/application/files/5115/4104/3772/Duterte_Oct_28_2018_in_Davao.jpg',
            url: 'https://verafiles.org/articles/vera-files-check-fact-duterte-mali-ang-pahayag-na-eu-ang-lum',
          },
          {
            author: 'VERA FILES',
            category: 'Reports, Fact-Check',
            date: '2018-11-01 11:41:00',
            dateText: 'Nov 1, 2018, 11:41 AM',
            description:
              'President Rodrigo Duterte wrongly claimed at least&hellip;',
            id: 3,
            imageStyle:
              "background-image: url('/application/files/5115/4104/3772/Duterte_Oct_28_2018_in_Davao.jpg')",
            title:
              'VERA FILES FACT CHECK: Duterte FALSELY CLAIMS the EU created the ICC',
            imageUrl:
              'verafiles.org/application/files/5115/4104/3772/Duterte_Oct_28_2018_in_Davao.jpg',
            url: 'https://verafiles.org/articles/vera-files-fact-check-duterte-falsely-claims-eu-created-icc',
          },
        ],
      },
    },
  },
];

let documentBody: RenderResult;

describe('Vera contents', () => {
  beforeEach(() => {
    documentBody = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <VeraFactCheckData keyword={keyword} />
      </MockedProvider>
    );
  });
  it('checks content text data 1', async () => {
    const title = await documentBody.findByText(
      'VERA FILES FACT CHECK: Palace sings different tune on Duterte’s 2022 bid for VP'
    );
    expect(title).toBeInTheDocument();
  });
  it('checks content text data 2', async () => {
    const author = await documentBody.findAllByText('By VERA FILES');
    expect(author[0]).toBeInTheDocument();
  });
  // it('checks content text data 3', async () => {
  //   const description = await documentBody.findByText(
  //     'Maling ipinahayag ni Pangulo Rodrigo Duterte nang…'
  //   );
  //   expect(description).toBeInTheDocument();
  // });
  it('checks content text data 4', async () => {
    const date = await documentBody.findByText('8:30:00 PM Mon May 31 2021');
    expect(date).toBeInTheDocument();
  });
});
