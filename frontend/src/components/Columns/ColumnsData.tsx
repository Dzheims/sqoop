// const columnsData = {
//   columns: [
//     {
//       id: 'news-api',
//       isVisible: true,
//       feedType: 'news',
//       title: 'News Feed',
//     },
//     {
//       id: 'twitter-api',
//       isVisible: true,
//       feedType: 'twitter',
//       title: 'Twitter Feed',
//     },
//     {
//       id: 'a',
//       isVisible: true,
//       feedType: 'twitter',
//       title: 'User Feed',
//     },
//     {
//       id: 'a',
//       isVisible: true,
//       feedType: 'news',
//       title: 'Sqoopified Feed',
//     },
//   ],
// };

// export default columnsData;
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_COLUMNS_QUERY } from './query';
import { GetColumnsQuery } from './query.generated';
import Loader from '../Common/Loader';
import Columns from './Column';

export const ColumnsData = () => {
  const { data, loading, error } = useQuery<GetColumnsQuery>(GET_COLUMNS_QUERY);
  if (error) return <div>error</div>;
  if (loading) return <Loader />;
  if (!data) return <div>data</div>;

  return <Columns data={data} />;
};

export default ColumnsData;
