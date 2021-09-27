import React from 'react';
import { useQuery } from '@apollo/client';
import { GoogleFactCheckSearchResultQuery } from './query.generated';
import { GOOGLE_FACTCHECK_SEARCH_QUERY } from './query';
import Loader from '../Common/Loader';
import Error from '../Common/Error';
import GoogleFactCheckResultsCards from './GoogleFactCheckResultsCards';

interface SearchQueryProps {
  keyword: string;
}

const GoogleFactCheckData: React.FC<SearchQueryProps> = ({
  keyword,
}: SearchQueryProps) => {
  const { data, loading, error } = useQuery<GoogleFactCheckSearchResultQuery>(
    GOOGLE_FACTCHECK_SEARCH_QUERY,
    { variables: { keyword } }
  );
  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;

  return <GoogleFactCheckResultsCards data={data} />;
};

export default GoogleFactCheckData;
