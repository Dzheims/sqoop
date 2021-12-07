/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useQuery } from '@apollo/client';
import Error from '../../components/Common/Error';
import CardsLoaderSkeleton from '../../components/Common/Skeletons/CardsLoaderSkeleton';
import { CollectionTweetsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_TWEETS } from '../../components/Columns/query';
import TwitterCards from '../../components/Cards/TwitterCards';
import { CollectionTweet } from '../../types.generated';

interface CollectionsTweetsProps {
  dataProps: CollectionTweet;
}

const CollectionTweets: React.FC<CollectionsTweetsProps> = ({
  dataProps,
}: CollectionsTweetsProps) => {
  const { data, loading, error } = useQuery<CollectionTweetsQuery>(
    COLLECTION_TWEETS,
    {
      variables: { id: dataProps.tweetId },
    }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data)
    return <Error header="Oops!" subHeader="No Twitter contents data" />;

  return (
    <TwitterCards
      data={data.tweetLookup}
      collectionTweet={dataProps}
      isUnderCollections
    />
  );
};

export default CollectionTweets;
