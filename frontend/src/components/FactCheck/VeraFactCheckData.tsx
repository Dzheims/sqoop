import React from 'react';
import { useQuery } from '@apollo/client';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import { VERA_FACTCHECK_SEARCH_QUERY } from './query';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import VeraFactCheckResultsCards from './VeraFactCheckResultsCards';

interface SearchQueryProps {
  keyword: string;
}

const VeraFactCheckData: React.FC<SearchQueryProps> = ({
  keyword,
}: SearchQueryProps) => {
  const { data, loading, error } = useQuery<VeraFactCheckSearchResultQuery>(
    VERA_FACTCHECK_SEARCH_QUERY,
    { variables: { keyword } }
  );
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;

  return <VeraFactCheckResultsCards data={data} />;
};

export default VeraFactCheckData;
