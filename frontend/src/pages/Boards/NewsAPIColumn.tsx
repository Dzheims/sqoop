import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import { Item } from './ColumnsStyle';
import NewsCards from '../../components/Cards/NewsCards';

// interface NewsAPIDataProps {
//   data: GetNewsApiContentsQuery;
// }

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
}

const NewsAPIColumn: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => (
  <div>
    {data?.topHeadlines?.map((value, index) => (
      <div key={index}>
        <NewsCards data={value} isUnderCollections={false} />
      </div>
    ))}
  </div>
);

export default NewsAPIColumn;
