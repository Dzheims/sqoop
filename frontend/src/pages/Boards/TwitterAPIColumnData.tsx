import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterAPIColumn from './TwitterAPIColumn';
import Loader from '../../components/Common/Loader';

const TwitterAPIColumnData: React.FC = () => {
  const { data, loading, error } = useQuery<GetTwitterApiContentsQuery>(
    GET_TWITTER_API_CONTENTS_QUERY
  );
  if (error) return <div>error</div>;
  if (loading) return <Loader />;
  if (!data) return <div>data</div>;

  return <TwitterAPIColumn data={data} />;
};

export default TwitterAPIColumnData;
