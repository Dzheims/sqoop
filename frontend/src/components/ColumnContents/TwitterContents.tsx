import React, { useEffect, useState, useRef } from 'react';
import { GetTwitterApiContentsQuery } from './query.generated';
import { makeStyles } from '@material-ui/core/styles';
import TwitterCards from '../Cards/TwitterCard';
import Fab from '@mui/material/Fab';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}

const useStyles = makeStyles(() => ({
  fabButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 30,
    zIndex: 50,
  },
}));

const fabButtonStyle = {
  position: 'absolute',
  textTransform: 'none',
  boxShadow: 'none',
  width: '125px',
  color: '#ffffff',
  backgroundColor: '#0036e7',
} as React.CSSProperties;

const TwitterContents: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [lastSeen, setLastSeen] = useState(
    data.searchTweets[0].publishedAt as string
  );
  const [hasNewUnreads, setHasNewUnreads] = useState(false);

  useEffect(() => {
    if (lastSeen !== (data.searchTweets[0].publishedAt as string)) {
      setHasNewUnreads(true);
      setLastSeen(data.searchTweets[0].publishedAt as string);
    }
  }, [data]);

  // const scrollToTop = () => {
  //   if (ref.current) {
  //     ref.current.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };

  return (
    <div>
      {hasNewUnreads ? (
        <div className={classes.fabButtonContainer}>
          <Fab
            style={fabButtonStyle}
            variant="extended"
            onClick={() => {
              setHasNewUnreads(false);
            }}
            size="small"
          >
            New Unreads
          </Fab>
        </div>
      ) : (
        <div />
      )}
      {data?.searchTweets?.map((value, index) => (
        <div key={index} ref={ref}>
          <TwitterCards data={value} />
        </div>
      ))}
    </div>
  );
};
export default TwitterContents;
