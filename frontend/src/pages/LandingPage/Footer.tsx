import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 10%',
    backgroundColor: '#eeeeee',
  },
  sectionContentContainer: {
    display: 'flex',
    height: '125px',
    alignItems: 'center',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
}));

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="left">
    ©&nbsp;{new Date().getFullYear()}&nbsp;Sqoop. All Rights Reserved.
  </Typography>
);

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sectionContentContainer}>
        <Grid xs={12}>
          <Copyright />
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
