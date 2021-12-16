import React from 'react';
import { makeStyles, Toolbar, Grid } from '@material-ui/core';
import LandingPageAppBar from './AppBar';
import Header from './Header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LandingPageAppBar />
      <Toolbar />
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <div style={{ backgroundColor: '#fafafa' }}>Section 2</div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ backgroundColor: '#808080' }}>Section 3</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
