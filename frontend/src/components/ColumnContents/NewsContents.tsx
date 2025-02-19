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

  const scrollToTop = () => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  };

  return (
    <div ref={ref}>
      {hasNewUnreads ? (
        <NewUnreadsButton
          onClick={() => {
            setHasNewUnreads(false);
            scrollToTop();
          }}
        />
      ) : (
        <div />
      )}
      {data?.topHeadlines?.map((value) => (
        <div key={value.publishedAt as string}>
          <NewsCards data={value} />
        </div>
      ))}
    </div>
  );
};

export default NewsContents;
