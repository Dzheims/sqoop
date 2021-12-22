import React from 'react';
import { useQuery } from '@apollo/client';
import { GoogleFactCheckSearchResultQuery } from './query.generated';
import { GOOGLE_FACTCHECK_SEARCH_QUERY } from './query';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import GoogleFactCheckCards from '../Cards/GoogleFactCheckCards';

interface SearchQueryProps {
  keyword: string;
}

const GoogleFactCheckData: React.FC<SearchQueryProps> = ({
  keyword,
}: SearchQueryProps) => {
  const { data, loading, error, refetch } =
    useQuery<GoogleFactCheckSearchResultQuery>(GOOGLE_FACTCHECK_SEARCH_QUERY, {
      variables: { keyword },
    });
  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading)
    return (
      <Loader header="Please Wait" subHeader="Loading Fact Check Contents" />
    );
  if (!data || data.googleFactCheckSearch.length === 0)
    return (
      <Error
        header="Oops!"
        subHeader="No search results found. Try other keywords."
        refetchQueries={refetch()}
      />
    );

  return (
    <div>
      {data?.googleFactCheckSearch.map((value) => (
        <GoogleFactCheckCards data={value} />
      ))}
    </div>
  );
};

export default GoogleFactCheckData;
