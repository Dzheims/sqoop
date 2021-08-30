import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_API_CONTENTS_QUERY } from './query';
import { GetNewsApiContentsQuery } from './query.generated';
import NewsAPIColumn from './NewsAPIColumn';

const NewsAPIColumnData: React.FC = () => {
  const { data, loading, error } = useQuery<GetNewsApiContentsQuery>(
    GET_NEWS_API_CONTENTS_QUERY
  );
  if (error) return <div>error</div>;

  if (loading) return <div>loading</div>;

  if (!data) return <div>data</div>;

  return <NewsAPIColumn data={data} />;
};

export default NewsAPIColumnData;
