import React, { useState, useEffect, useRef } from 'react';
import { GetNewsApiContentsQuery } from './query.generated';
import NewsCards from '../Cards/NewsCard';
import NewUnreadsButton from '../Common/Button/NewUnreadsButton';

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
}

const NewsContents: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasNewUnreads, setHasNewUnreads] = useState(false);
  const [lastSeen, setLastSeen] = useState(
    data.topHeadlines[0].publishedAt as string
  );

  useEffect(() => {
    if (lastSeen !== (data.topHeadlines[0].publishedAt as string)) {
      setHasNewUnreads(true);
      setLastSeen(data.topHeadlines[0].publishedAt as string);
    }
  }, [data]);

  return (
    <div ref={ref}>
      {hasNewUnreads ? (
        <NewUnreadsButton setHasNewUnreads={setHasNewUnreads} refObject={ref} />
      ) : (
        <div />
      )}
      {data?.topHeadlines?.map((value, index) => (
        <div key={index}>
          <NewsCards data={value} />
        </div>
      ))}
    </div>
  );
};

export default NewsContents;
