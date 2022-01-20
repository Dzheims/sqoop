import React, { useEffect, useState, useRef } from 'react';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterCards from '../Cards/TwitterCard';
import NewUnreadsButton from '../Common/Button/NewUnreadsButton';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}

const TwitterContents: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasNewUnreads, setHasNewUnreads] = useState(false);
  const [lastSeen, setLastSeen] = useState(
    data.searchTweets[0].publishedAt as string
  );

  useEffect(() => {
    if (lastSeen !== (data.searchTweets[0].publishedAt as string)) {
      setHasNewUnreads(true);
      setLastSeen(data.searchTweets[0].publishedAt as string);
    }
  }, [data]);

  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
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
      {data?.searchTweets?.map((value) => (
        <div key={value.publishedAt as string}>
          <TwitterCards data={value} />
        </div>
      ))}
    </div>
  );
};
export default TwitterContents;
