import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TWITTER_API_CONTENTS_QUERY } from './query';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterContents from './TwitterContents';
import Error from '../Common/Error';
import NoContents from '../Common/NoContents';
import CardLoaderSkeleton from '../Common/Skeletons/CardLoaderSkeleton';

interface TwitterApiColumnDataProps {
  keyword: string | null;
  sources: string | null;
}

const TwitterContentsData: React.FC<TwitterApiColumnDataProps> = ({
  keyword,
  sources,
}: TwitterApiColumnDataProps) => {
  const { data, loading, error, refetch } =
    useQuery<GetTwitterApiContentsQuery>(GET_TWITTER_API_CONTENTS_QUERY, {
      variables: { keyword, sources },
      pollInterval: 3000,
    });
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading) return <CardLoaderSkeleton />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (!data.searchTweets.length)
    return (
      <NoContents
        header="Sorry,"
        subHeader="No contents found in the last 7 days. Try search feature to view previous contents in the last 30 days"
      />
    );

  return <TwitterContents data={data} />;
};

export default TwitterContentsData;
