import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterAPIColumn from './TwitterAPIColumn';
import Loader from '../../components/Common/Loader';
import Error from '../../components/Common/Error';
import NoContents from '../../components/Common/NoContents';

interface DrawerState {
  data: any;
  open: boolean;
}

interface TwitterApiColumnDataProps {
  keyword: string | null;
  sources: string | null;
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

const TwitterAPIColumnData: React.FC<TwitterApiColumnDataProps> = ({
  keyword,
  sources,
  setDrawerState,
}: TwitterApiColumnDataProps) => {
  const { data, loading, error } = useQuery<GetTwitterApiContentsQuery>(
    GET_TWITTER_API_CONTENTS_QUERY,
    { variables: { keyword, sources } }
  );
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;
  if (data.searchTweets.length === 0) return <NoContents />;

  return <TwitterAPIColumn data={data} setDrawerState={setDrawerState} />;
};

export default TwitterAPIColumnData;
