import React from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from './query.generated';
import Loader from '../Common/Loader';
import Columns from './Column';
import Error from '../Common/Error';
import { GET_COLUMNS_QUERY } from './query';
import ColumnLoaderSkeleton from '../Common/Skeletons/ColumnLoaderSkeleton';

export const ColumnsData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error />;
  if (loading) return <ColumnLoaderSkeleton />;
  if (!data) return <Error />;

  return <Columns data={data} />;
};

export default ColumnsData;
