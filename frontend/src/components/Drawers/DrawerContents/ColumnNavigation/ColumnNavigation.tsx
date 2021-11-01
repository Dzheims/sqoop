import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    alignItems: 'center',
    justify: 'center',
  },
}));

const ColumnNavigation = () => {
  const classes = useStyles();

  return <div className={classes.root}>Navigation</div>;
};

export default ColumnNavigation;
