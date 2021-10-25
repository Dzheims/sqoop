import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_NEWS_API_CONTENTS_QUERY } from './query';
import { SearchNewsApiContentsQuery } from './query.generated';
import Error from '../../../Common/Error';
import NoContents from '../../../Common/NoContents';
import CardsLoaderSkeleton from '../../../Common/Skeletons/CardsLoaderSkeleton';
import NewsCards from '../../../Cards/NewsCards';

interface SearchNewsApiColumnDataProps {
  keyword: string;
  sources: string | null;
  from: string | null;
  to: string | null;
}

const SearchNewsAPIColumnData: React.FC<SearchNewsApiColumnDataProps> = ({
  keyword,
  sources,
  from,
  to,
}: SearchNewsApiColumnDataProps) => {
  const { data, loading, error } = useQuery<SearchNewsApiContentsQuery>(
    SEARCH_NEWS_API_CONTENTS_QUERY,
    { variables: { keyword, sources, from, to } }
  );
  if (error) return <Error />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data) return <Error />;
  if (!data.searchArticles.length) return <NoContents />;

  return (
    <div>
      {data?.searchArticles?.map((value, index) => (
        <NewsCards data={value} />
      ))}
    </div>
  );
};

export default SearchNewsAPIColumnData;
