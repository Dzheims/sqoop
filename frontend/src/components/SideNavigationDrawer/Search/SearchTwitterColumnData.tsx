import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TWITTER_CONTENTS_QUERY } from './query';
import { SearchAllTweetsQuery } from './query.generated';
import Error from '../../Common/Error';
import NoContents from '../../Common/NoContents';
import CardLoaderSkeleton from '../../Common/Skeletons/CardLoaderSkeleton';
import TwitterCards from '../../Cards/TwitterCard';
import useStyles from './SearchStyles';

interface SearchTwitterColumnDataProps {
  keyword: string;
  sources: string | null;
  fromDate: string | null;
  toDate: string | null;
}

const SearchAllTweetsColumnData: React.FC<SearchTwitterColumnDataProps> = ({
  keyword,
  sources,
  fromDate,
  toDate,
}: SearchTwitterColumnDataProps) => {
  const classes = useStyles();
  const { data, loading, error, refetch } = useQuery<SearchAllTweetsQuery>(
    SEARCH_TWITTER_CONTENTS_QUERY,
    { variables: { keyword, sources, fromDate, toDate } }
  );
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
  if (!data.searchAllTweets.length)
    return (
      <NoContents
        header="Sorry,"
        subHeader={`No search results found on ${keyword}. Try other keywords.`}
      />
    );

  return (
    <div className={classes.results}>
      {data?.searchAllTweets?.map((value) => (
        <TwitterCards data={value} />
      ))}
    </div>
  );
};

export default SearchAllTweetsColumnData;
