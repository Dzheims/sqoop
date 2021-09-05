import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  loader: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  loaderText: {
    padding: '10px',
    color: theme.palette.primary.main,
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" />
      <Typography className={classes.loaderText}>Loading data ...</Typography>
    </div>
  );
};

export default Loader;
