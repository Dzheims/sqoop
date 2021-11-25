/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useQuery } from '@apollo/client';
import Error from '../../components/Common/Error';
import Loader from '../../components/Common/Loader';
import CardsLoaderSkeleton from '../../components/Common/Skeletons/CardsLoaderSkeleton';
import { CollectionTweetsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_TWEETS } from '../../components/Columns/query';
import TwitterCards from '../../components/Cards/TwitterCards';

interface CollectionsTweetsProps {
  id: string | null;
}

const CollectionTweets: React.FC<CollectionsTweetsProps> = ({
  id,
}: CollectionsTweetsProps) => {
  const { data, loading, error } = useQuery<CollectionTweetsQuery>(
    COLLECTION_TWEETS,
    { variables: { id } }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data)
    return <Error header="Oops!" subHeader="No Twitter contents data" />;

  return <TwitterCards data={data.tweetLookup} isUnderCollections />;
};

export default CollectionTweets;
