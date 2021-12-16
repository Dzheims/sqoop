import React from 'react';
import { useQuery } from '@apollo/client';
import { CollectionTweetsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_TWEETS } from '../../components/Columns/query';
import { CollectionTweet } from '../../types.generated';
import TwitterCards from '../../components/Cards/TwitterCards';
import Error from '../../components/Common/Error';
import CardsLoaderSkeleton from '../../components/Common/Skeletons/CardsLoaderSkeleton';

interface CollectionsTweetsProps {
  dataProps: CollectionTweet;
}

const CollectionTweets: React.FC<CollectionsTweetsProps> = ({
  dataProps,
}: CollectionsTweetsProps) => {
  const { data, loading, error, refetch } = useQuery<CollectionTweetsQuery>(
    COLLECTION_TWEETS,
    {
      variables: { id: dataProps.tweetId },
    }
  );
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading) return <CardsLoaderSkeleton />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="No Twitter contents data"
        refetchQueries={refetch()}
      />
    );

  return (
    <TwitterCards
      data={data.tweetLookup}
      collectionTweet={dataProps}
      isUnderCollections
    />
  );
};

export default CollectionTweets;
