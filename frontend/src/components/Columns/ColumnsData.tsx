import React from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from './query.generated';
import Columns from './Column';
import Error from '../Common/Error';
import NoColumns from '../Common/NoColumns';
import { GET_COLUMNS_QUERY } from './query';
import ColumnLoaderSkeleton from '../Common/Skeletons/ColumnLoaderSkeleton';

export const ColumnsData = () => {
  const { data, loading, error, refetch } =
    useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading) return <ColumnLoaderSkeleton />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (data.getColumnResult.length === 0) return <NoColumns />;

  return <Columns data={data} />;
};

export default ColumnsData;
