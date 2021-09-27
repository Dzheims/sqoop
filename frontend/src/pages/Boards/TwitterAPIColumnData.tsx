import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterAPIColumn from './TwitterAPIColumn';
import Loader from '../../components/Common/Loader';
import Error from '../../components/Common/Error';
import NoContents from '../../components/Common/NoContents';

interface TwitterApiColumnDataProps {
  keyword: string | null;
  sources: string | null;
}

const TwitterAPIColumnData: React.FC<TwitterApiColumnDataProps> = ({
  keyword,
  sources,
}: TwitterApiColumnDataProps) => {
  const { data, loading, error } = useQuery<GetTwitterApiContentsQuery>(
    GET_TWITTER_API_CONTENTS_QUERY,
    { variables: { keyword, sources } }
  );
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;
  if (data.searchTweets.length === 0) return <NoContents />;

  return <TwitterAPIColumn data={data} />;
};

export default TwitterAPIColumnData;
