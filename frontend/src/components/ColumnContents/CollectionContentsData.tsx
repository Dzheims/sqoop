import React from 'react';
import { useQuery } from '@apollo/client';
import { CollectionContentsQuery } from './query.generated';
import { COLLECTION_CONTENTS_QUERY } from './query';
import CollectionColumn from './CollectionContents';
import NoContents from '../Common/NoContents';
import Error from '../Common/Error';

interface CollectionsColumnDataProps {
  collectionId: number;
}

const CollectionColumnData: React.FC<CollectionsColumnDataProps> = ({
  collectionId,
}: CollectionsColumnDataProps) => {
  const { data, loading, error, refetch } = useQuery<CollectionContentsQuery>(
    COLLECTION_CONTENTS_QUERY,
    { variables: { collectionId } }
  );
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader={error.message}
        refetchQueries={refetch()}
      />
    );
  if (loading) return <div />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="No collection contents data"
        refetchQueries={refetch()}
      />
    );
  if (data.collectionContents.length === 0)
    return (
      <NoContents
        header="You haven't saved any contents yet."
        subHeader="Click + button in a card to start saving contents."
      />
    );

  return <CollectionColumn data={data} />;
};

export default CollectionColumnData;
