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
    maxWidth: '75px',
    maxHeight: '75px',
  },
  sorryText: {
    padding: '2px',
    fontSize: '20px',
    color: theme.palette.secondary.main,
  },
  noContentsText: {
    color: 'gray',
  },
}));

const NoContents = () => {
  const classes = useStyles();

  return (
    <div className={classes.noContents}>
      <div>
        <img className={classes.image} src={NoContentsImage} alt="" />
      </div>
      <Typography className={classes.sorryText}>Sorry,</Typography>
      <Typography className={classes.noContentsText}>
        No contents found.
      </Typography>
    </div>
  );
};

export default NoContents;
