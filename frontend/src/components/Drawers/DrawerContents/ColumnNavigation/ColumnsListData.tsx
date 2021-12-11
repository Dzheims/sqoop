import React from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from '../../../Columns/query.generated';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import Error from '../../../Common/Error';
import Loader from '../../../Common/Loader';
import ColumnNavigation from './ColumnNavigation';

const ColumnsListData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading)
    return <Loader header="Please Wait" subHeader="Loading Columns List" />;
  if (!data) return <Error header="Oops!" subHeader="No data found" />;

  return <ColumnNavigation data={data} />;
};

export default ColumnsListData;
