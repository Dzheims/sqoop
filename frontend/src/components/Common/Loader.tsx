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
    fontSize: '17px',
    color: theme.palette.primary.main,
  },
  loaderText: {
    color: 'gray',
    fontSize: '14px',
  },
}));

interface LoaderProps {
  header: string;
  subHeader: string;
}

const Loader: React.FC<LoaderProps> = ({ header, subHeader }: LoaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress size={50} color="primary" />
      <Typography className={classes.waitText}>{header}</Typography>
      <Typography align="center" className={classes.loaderText}>
        {subHeader}
      </Typography>
    </div>
  );
};

export default Loader;
