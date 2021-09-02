import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterAPIColumn from './TwitterAPIColumn';

const TwitterAPIColumnData: React.FC = () => {
  const { data, loading, error } = useQuery<GetTwitterApiContentsQuery>(
    GET_TWITTER_API_CONTENTS_QUERY
  );
  if (loading) return <div>loading</div>;

  if (error) return <div>error</div>;

  if (!data) return <div>data</div>;

  return <TwitterAPIColumn data={data} />;
};

export default TwitterAPIColumnData;
