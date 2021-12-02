import React from 'react';
import { useQuery } from '@apollo/client';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import { VERA_FACTCHECK_SEARCH_QUERY } from './query';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import VeraFilesCards from '../Cards/VeraFilesCards';

interface SearchQueryProps {
  keyword: string;
}

const VeraFilesData: React.FC<SearchQueryProps> = ({
  keyword,
}: SearchQueryProps) => {
  const { data, loading, error } = useQuery<VeraFactCheckSearchResultQuery>(
    VERA_FACTCHECK_SEARCH_QUERY,
    { variables: { keyword } }
  );
  if (error) return <Error header="Oops!" subHeader="Something went wrong" />;
  if (loading)
    return (
      <Loader header="Please Wait" subHeader="Loading Fact Check Contents" />
    );
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="No search results found. Try other keywords."
      />
    );

  return (
    <div>
      {data?.veraFilesFactCheck.map((value, index) => (
        <VeraFilesCards data={value} />
      ))}
    </div>
  );
};

export default VeraFilesData;
