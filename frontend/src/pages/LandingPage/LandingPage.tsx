import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import AppBar from './AppBar';
import Header from './Header';
import Footer from './Footer';
import Features from './Features';
import Benefits from './Benefits';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75px',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      margin: '50px 0 0 0',
      padding: '20px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '50px 0 10px 0',
    },
  },
  benefitsTitleContainer: {
    display: 'flex',
    paddingTop: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    backgroundColor: '#f7fafc',
  },
  adContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    padding: '10px',
    margin: '30px 0 50px',
  },
  sectionTitle: {
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
    },
  },
  adTitle: {
    fontWeight: 500,
    color: '#0036e7',
    marginBottom: '20px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
    },
  },
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '10px',
    },
  },
  featureSubtitle: {
    marginTop: '10px',
    color: '#808080',
    fontWeight: 400,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar />
      <Toolbar />
      <Header />
      <div className={classes.benefitsTitleContainer}>
        <Typography className={classes.sectionTitle} color="secondary">
          Never miss a beat
        </Typography>
      </div>
      <Benefits />
      <div className={classes.featureTitleContainer}>
        <Typography className={classes.sectionTitle} color="primary">
          Be on top of everything you need to know
        </Typography>
        <Typography className={classes.featureSubtitle}>
          Sqoop assists you with tools to keep track of overflooding contents.
        </Typography>
      </div>
      <Features />
      <div className={classes.adContainer}>
        <Typography className={classes.adTitle}>
          Conquer Information Overload with Sqoop
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
      <Footer />
    </div>
  );
};

export default LandingPage;
