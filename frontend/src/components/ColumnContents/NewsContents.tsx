import React, { useState, useEffect } from 'react';
import { GetNewsApiContentsQuery } from './query.generated';
import { makeStyles } from '@material-ui/core/styles';
import NewsCards from '../Cards/NewsCard';
import Fab from '@mui/material/Fab';

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
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

const NewsContents: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => {
  const classes = useStyles();
  const [lastSeen, setLastSeen] = useState(
    data.topHeadlines[0].publishedAt as string
  );
  const [hasNewUnreads, setHasNewUnreads] = useState(false);

  useEffect(() => {
    if (lastSeen !== (data.topHeadlines[0].publishedAt as string)) {
      setHasNewUnreads(true);
      setLastSeen(data.topHeadlines[0].publishedAt as string);
    }
  }, [data]);

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
            New Contents
          </Fab>
        </div>
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
