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
  },
}));

const fabButtonStyle = {
  position: 'fixed',
  textTransform: 'none',
  zIndex: 500,
  boxShadow: 'none',
  width: '125px',
  marginTop: '20px',
  color: '#f04b4c',
  border: '1px solid #f04b4c',
  backgroundColor: '#ffffff',
} as React.CSSProperties;

const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
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
  //     window.scrollTo(0, ref.current.offsetTop);
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
              // scrollToTop();
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
export default TwitterAPIColumn;
