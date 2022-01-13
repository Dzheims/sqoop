import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 10%',
    backgroundColor: '#f7fafc',
    height: '125px',
    alignItems: 'center',
    display: 'flex',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="left">
        ©&nbsp;{new Date().getFullYear()}&nbsp;Sqoop. All Rights Reserved.
      </Typography>
    </div>
  );
};

export default Footer;
