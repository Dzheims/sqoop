import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Toolbar,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import AppBar from './AppBar';
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
  adContainer: {
    display: 'flex',
    padding: '60px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  sectionTitle: {
    fontWeight: 500,
  },
  adTitle: {
    fontWeight: 500,
    color: '#0036e7',
    marginBottom: '20px',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  featureSubtitle: {
    marginTop: '10px',
    color: '#808080',
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar />
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
          <div className={classes.adContainer}>
            <Typography className={classes.adTitle} variant="h4">
              Conquer Information Overload and Misinformation with Sqoop
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => {
                history.push('/signup');
              }}
            >
              Get Started - it&apos;s free!
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
