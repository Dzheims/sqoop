import React from 'react';
import { makeStyles, Toolbar, Grid, Typography } from '@material-ui/core';
import LandingPageAppBar from './AppBar';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import Benefits from './Benefits';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  featureTitleContainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
    flexDirection: 'column',
  },
  benefitsTitleContainer: {
    display: 'flex',
    paddingTop: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    // marginBottom: '20px',
    backgroundColor: '#f7fafc',
    flexDirection: 'column',
  },
  sectionTitle: {
    fontWeight: 500,
  },
  featureSubtitle: {
    marginTop: '10px',
    color: '#808080',
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
          <div className={classes.benefitsTitleContainer}>
            <Typography
              className={classes.sectionTitle}
              variant="h4"
              color="primary"
            >
              Why Sqoop?
            </Typography>
            <Typography className={classes.featureSubtitle} variant="subtitle1">
              The benefits of Sqoop...
            </Typography>
          </div>
          <Benefits />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.featureTitleContainer}>
            <Typography
              className={classes.sectionTitle}
              variant="h4"
              color="primary"
            >
              Our platform features make it easier
            </Typography>
            <Typography className={classes.featureSubtitle} variant="subtitle1">
              Shows how Sqoop works ...
            </Typography>
          </div>
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
