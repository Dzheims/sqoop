import React from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from '../../../Columns/query.generated';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import Error from '../../../Common/Error';
import Loader from '../../../Common/Loader';
import ColumnNavigation from './ColumnNavigation';

const ColumnsListData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;
  if (data.getColumnResult.length === 0) return <div>No Columns Yet</div>;

  return <ColumnNavigation data={data} />;
};

export default ColumnsListData;
