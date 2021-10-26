/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from '@apollo/client';
import { TWITTER_SOURCES } from './query';
import { TwitterSourcesQuery } from './query.generated';

const TwitterSourcesData = () => {
  const { data, loading, error } =
    useQuery<TwitterSourcesQuery>(TWITTER_SOURCES);

  if (error || loading || !data) return [];

  return data.twitterSources?.map((value) => {
    const { __typename, ...source } = value;
    return source;
  });
};

export default TwitterSourcesData;
