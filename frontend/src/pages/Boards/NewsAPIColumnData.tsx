import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_API_CONTENTS_QUERY } from './query';
import { GetNewsApiContentsQuery } from './query.generated';
import NewsAPIColumn from './NewsAPIColumn';
import Loader from '../../components/Common/Loader';
import { Category } from '../../types.generated';
import Error from '../../components/Common/Error';
import NoContents from '../../components/Common/NoContents';
import CardsLoaderSkeleton from '../../components/Common/Skeletons/CardsLoaderSkeleton';

// interface NewsApiColumnDataProps {
//   country: string;
//   category: Category;
//   keyword: string | null;
//   sources: string | null;
// }

interface NewsApiColumnDataProps {
  country: string;
  category: Category;
  keyword: string | null;
  sources: string | null;
}

const NewsAPIColumnData: React.FC<NewsApiColumnDataProps> = ({
  country,
  category,
  keyword,
  sources,
}: NewsApiColumnDataProps) => {
  const { data, loading, error } = useQuery<GetNewsApiContentsQuery>(
    GET_NEWS_API_CONTENTS_QUERY,
    { variables: { country, category, keyword, sources }, pollInterval: 1000 }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (!data.topHeadlines.length)
    return (
      <NoContents
        header="Sorry,"
        subHeader="No contents found in the last 7 days."
      />
    );

  return <NewsAPIColumn data={data} />;
};

export default NewsAPIColumnData;
