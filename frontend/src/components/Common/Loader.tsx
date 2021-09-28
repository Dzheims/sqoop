import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  loader: {
    marginTop: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  waitText: {
    padding: '5px',
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  loaderText: {
    color: 'gray',
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress size={50} color="primary" />
      <Typography className={classes.waitText}>Please Wait</Typography>
      <Typography className={classes.loaderText}>Loading data...</Typography>
    </div>
  );
};

export default Loader;
