import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_NEWS_API_DATA_QUERY } from './query';
import { GetNewsApiDataQuery } from './query.generated';
import { Category } from '../../../types.generated';

interface CategoriesProps {
  category: Category;
}

const NewsCategories = ({ category }: CategoriesProps) => {
  const [getNewsByCategories, { loading, data, error }] =
    useLazyQuery<GetNewsApiDataQuery>(GET_NEWS_API_DATA_QUERY);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>data</div>;

  return (
    <div>
      {data}
      <button onClick={() => getNewsByCategories({ variables: { category } })}>
        {category}
      </button>
    </div>
  );
};

export default NewsCategories;
