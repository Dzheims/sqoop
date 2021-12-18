import React from 'react';
import { makeStyles, Toolbar, Grid } from '@material-ui/core';
import LandingPageAppBar from './AppBar';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import Benefits from './Benefits';

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
          <Benefits />
        </Grid>
        <Grid item xs={12}>
          <Features />
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
