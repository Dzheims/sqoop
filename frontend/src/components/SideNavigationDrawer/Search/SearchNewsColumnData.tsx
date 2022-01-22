import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_NEWS_API_CONTENTS_QUERY } from './query';
import { SearchNewsApiContentsQuery } from './query.generated';
import Error from '../../Common/Error';
import NoContents from '../../Common/NoContents';
import CardLoaderSkeleton from '../../Common/Skeletons/CardLoaderSkeleton';
import NewsCards from '../../Cards/NewsCard';
import useStyles from './SearchStyles';

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
  const classes = useStyles();
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
    return (
      <NoContents
        header="Sorry,"
        subHeader={`No search results found on ${keyword}. Try other keywords.`}
      />
    );

  return (
    <div className={classes.results}>
      {data?.searchArticles?.map((value) => (
        <NewsCards data={value} />
      ))}
    </div>
  );
};

export default SearchNewsColumnData;
