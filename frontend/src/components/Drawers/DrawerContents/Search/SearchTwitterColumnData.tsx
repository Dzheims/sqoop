/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TWITTER_CONTENTS_QUERY } from './query';
import { SearchAllTweetsQuery } from './query.generated';
import Error from '../../../Common/Error';
import NoContents from '../../../Common/NoContents';
import CardsLoaderSkeleton from '../../../Common/Skeletons/CardsLoaderSkeleton';
import TwitterCards from '../../../Cards/TwitterCards';

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
  const { data, loading, error } = useQuery<SearchAllTweetsQuery>(
    SEARCH_TWITTER_CONTENTS_QUERY,
    { variables: { keyword, sources, fromDate, toDate } }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading) return <CardsLoaderSkeleton />;
  if (!data)
    return <Error header="Oops!" subHeader="No search results found" />;
  if (!data.searchAllTweets.length)
    return <NoContents header="Sorry," subHeader="No Twitter contents found" />;

  return (
    <div>
      {data?.searchAllTweets?.map((value, index) => (
        <TwitterCards
          data={value}
          isUnderCollections={false}
          collectionTweet={null}
        />
      ))}
    </div>
  );
};

export default SearchAllTweetsColumnData;
