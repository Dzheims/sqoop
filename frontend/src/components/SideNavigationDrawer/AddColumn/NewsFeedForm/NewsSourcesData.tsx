/* eslint-disable @typescript-eslint/naming-convention */
import { useQuery } from '@apollo/client';
import { NEWS_SOURCES } from './query';
import { NewsSourceQuery } from './query.generated';

const NewsSourcesData = () => {
  const { data, loading, error } = useQuery<NewsSourceQuery>(NEWS_SOURCES);

  if (error || loading || !data) return [];

  return data.topHeadlinesSources.map((value) => {
    const { __typename, ...source } = value;
    return source;
  });
};

export default NewsSourcesData;
