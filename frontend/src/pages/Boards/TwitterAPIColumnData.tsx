import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterAPIColumn from './TwitterAPIColumn';
import Loader from '../../components/Common/Loader';
import Error from '../../components/Common/Error';
import NoContents from '../../components/Common/NoContents';
import CardsLoaderSkeleton from '../../components/Common/Skeletons/CardsLoaderSkeleton';

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
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (!data.searchTweets.length)
    return <NoContents header="Sorry," subHeader="No contents found" />;

  return <TwitterAPIColumn data={data} />;
};

export default TwitterAPIColumnData;
