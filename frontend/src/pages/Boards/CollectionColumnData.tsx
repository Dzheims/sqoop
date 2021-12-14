import React from 'react';
import { useQuery } from '@apollo/client';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_CONTENTS_QUERY } from '../../components/Columns/query';
import CollectionColumn from './CollectionColumn';
import NoContents from '../../components/Common/NoContents';
import Error from '../../components/Common/Error';

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
        subHeader="Something went wrong"
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
