/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useQuery } from '@apollo/client';
import Error from '../../components/Common/Error';
import Loader from '../../components/Common/Loader';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import { COLLECTION_CONTENTS_QUERY } from '../../components/Columns/query';
import CollectionColumn from './CollectionColumn';

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
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;

  return <CollectionColumn data={data} />;
};

export default CollectionColumnData;