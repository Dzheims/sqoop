import React from 'react';
import { useQuery } from '@apollo/client';
import { GetColumnsQuery } from '../../../Columns/query.generated';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import Error from '../../../Common/Error';
import Loader from '../../../Common/Loader';
import ColumnNavigation from './ColumnNavigation';
import NoContents from '../../../Common/NoContents';

const ColumnsListData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading)
    return <Loader header="Please Wait" subHeader="Loading Columns List" />;
  if (!data) return <Error header="Oops!" subHeader="No data found" />;
  if (data.getColumnResult.length === 0)
    return <NoContents header="Sorry," subHeader="No columns yet" />;

  return <ColumnNavigation data={data} />;
};

export default ColumnsListData;
