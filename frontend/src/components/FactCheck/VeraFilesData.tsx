import React from 'react';
import { useQuery } from '@apollo/client';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import { VERA_FACTCHECK_SEARCH_QUERY } from './query';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import NoContents from '../Common/NoContents';
import VeraFilesCards from '../Cards/VeraFilesCard';

interface SearchQueryProps {
  keyword: string;
}

const VeraFilesData: React.FC<SearchQueryProps> = ({
  keyword,
}: SearchQueryProps) => {
  const { data, loading, error, refetch } =
    useQuery<VeraFactCheckSearchResultQuery>(VERA_FACTCHECK_SEARCH_QUERY, {
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
  if (!data || data.veraFilesFactCheck.length === 0)
    return (
      <NoContents
        header="Sorry,"
        subHeader={`No search results found on ${keyword}. Try other keywords.`}
      />
    );

  return (
    <div>
      {data?.veraFilesFactCheck.map((value) => (
        <VeraFilesCards data={value} />
      ))}
    </div>
  );
};

export default VeraFilesData;
