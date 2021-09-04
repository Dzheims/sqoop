/* eslint-disable no-use-before-define */
import React from 'react';
import { useGetCurrentUserQuery } from './authentication.query.generated';

const CurrentUser = () => {
  const { data, loading, error } = useGetCurrentUserQuery();

  if (!data) return <div>No data</div>;

  if (loading) return <div>Loading</div>;

  if (error) return <div>error</div>;

  return data?.currentUserId as number;
};

export default CurrentUser;
