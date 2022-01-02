import React from 'react';
import { GetNewsApiContentsQuery } from './query.generated';
import NewsCards from '../Cards/NewsCard';

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
}

const NewsAPIColumn: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => (
  <div>
    {data?.topHeadlines?.map((value, index) => (
      <div key={index}>
        <NewsCards data={value} />
      </div>
    ))}
  </div>
);

export default NewsAPIColumn;
