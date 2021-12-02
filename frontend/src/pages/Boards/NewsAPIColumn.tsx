import React from 'react';
import { GetNewsApiContentsQuery } from './query.generated';
import NewsCards from '../../components/Cards/NewsCards';

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
