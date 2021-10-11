import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from './query.generated';
import Loader from '../Common/Loader';
import Columns from './Column';
import Error from '../Common/Error';
import NoContents from '../Common/NoContents';
import { GET_COLUMNS_QUERY } from './query';

interface DrawerState {
  data: any;
  open: boolean;
}

interface ColumnsDataProps {
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

export const ColumnsData = ({ setDrawerState }: ColumnsDataProps) => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;

  return <Columns data={data} setDrawerState={setDrawerState} />;
};

export default ColumnsData;
