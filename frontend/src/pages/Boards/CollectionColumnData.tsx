/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useQuery } from '@apollo/client';
import Error from '../../components/Common/Error';
import Loader from '../../components/Common/Loader';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_CONTENTS_QUERY } from '../../components/Columns/query';
import CollectionColumn from './CollectionColumn';
import NoContents from '../../components/Common/NoContents';

interface CollectionsColumnDataProps {
  collectionId: number;
}

const CollectionColumnData: React.FC<CollectionsColumnDataProps> = ({
  collectionId,
}: CollectionsColumnDataProps) => {
  const { data, loading, error } = useQuery<CollectionContentsQuery>(
    COLLECTION_CONTENTS_QUERY,
    { variables: { collectionId } }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <div />;
  if (!data)
    return <Error header="Oops!" subHeader="No collection contents data" />;
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
