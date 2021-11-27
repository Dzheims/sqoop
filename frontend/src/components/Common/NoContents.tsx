import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import NoContentsImage from '../../assets/noContents.png';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  noContents: {
    marginTop: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  image: {
    maxWidth: '150px',
    maxHeight: '150px',
  },
  sorryText: {
    padding: '2px',
    fontSize: '17px',
    color: theme.palette.secondary.main,
  },
  noContentsText: {
    color: 'gray',
    fontSize: '14px',
  },
}));

interface NoContentsProps {
  header: string;
  subHeader: string;
}

const NoContents: React.FC<NoContentsProps> = ({
  header,
  subHeader,
}: NoContentsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.noContents}>
      <div>
        <img className={classes.image} src={NoContentsImage} alt="" />
      </div>
      <Typography align="center" className={classes.sorryText}>
        {header}
      </Typography>
      <Typography align="center" className={classes.noContentsText}>
        {subHeader}
      </Typography>
    </div>
  );
};

export default NoContents;
