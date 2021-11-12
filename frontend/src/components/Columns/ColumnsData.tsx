import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from './query.generated';
import Loader from '../Common/Loader';
import Columns from './Column';
import Error from '../Common/Error';
import { GET_COLUMNS_QUERY } from './query';
import ColumnLoaderSkeleton from '../Common/Skeletons/ColumnLoaderSkeleton';

interface DrawerState {
  data: any;
  open: boolean;
}

interface ColumnsDataProps {
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

export const ColumnsData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <ColumnLoaderSkeleton />;
  if (!data) return <Error header="Oops!" subHeader="Something went wrong" />;

  return <Columns data={data} />;
};

export default ColumnsData;
