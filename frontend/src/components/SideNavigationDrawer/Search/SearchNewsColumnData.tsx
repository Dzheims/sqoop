import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_NEWS_API_CONTENTS_QUERY } from './query';
import { SearchNewsApiContentsQuery } from './query.generated';
import Error from '../../Common/Error';
import NoContents from '../../Common/NoContents';
import CardLoaderSkeleton from '../../Common/Skeletons/CardLoaderSkeleton';
import NewsCards from '../../Cards/NewsCard';

interface SearchNewsColumnDataProps {
  keyword: string;
  sources: string | null;
  from: string | null;
  to: string | null;
}

const SearchNewsColumnData: React.FC<SearchNewsColumnDataProps> = ({
  keyword,
  sources,
  from,
  to,
}: SearchNewsColumnDataProps) => {
  const { data, loading, error, refetch } =
    useQuery<SearchNewsApiContentsQuery>(SEARCH_NEWS_API_CONTENTS_QUERY, {
      variables: { keyword, sources, from, to },
    });
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading) return <CardLoaderSkeleton />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="No search results found"
        refetchQueries={refetch()}
      />
    );
  if (!data.searchArticles.length)
    return <NoContents header="Sorry," subHeader="No News contents found" />;

  return (
    <div>
      {data?.searchArticles?.map((value) => (
        <NewsCards data={value} />
      ))}
    </div>
  );
};

export default SearchNewsColumnData;
