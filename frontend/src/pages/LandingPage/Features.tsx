import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ViewNewsContents from '../../assets/viewNewsContents.png';
import CreateCustomFeeds from '../../assets/createCustomFeedsAndCollections.png';
import SaveContentsToCollections from '../../assets/saveContentsToCollections.png';
import FactCheckClaims from '../../assets/factCheckClaims.png';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '25px 25px 50px 25px',
      // display: 'flex',
      // flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 100px 20px 100px',
      // height: '400px',
    },
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  text: {
    fontWeight: 500,
    color: '#575757',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  textContainer: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  featureSubtitle: {
    marginTop: '5px',
    color: '#808080',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  featureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      margin: '50px 0 50px 0',
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      height: '350px',
      width: '350px',
    },
    [theme.breakpoints.up('md')]: {
      height: '450px',
      width: '450px',
    },
  },
}));

const Features = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.featureContainer}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.textContainer}>
            <Typography className={classes.text} variant="h4">
              View News Contents
            </Typography>
            <Typography className={classes.featureSubtitle} variant="h6">
              Catch the latest News and Tweets across verified media accounts.
            </Typography>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div>
            <img className={classes.image} src={ViewNewsContents} alt="" />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div>
            <img className={classes.image} src={CreateCustomFeeds} alt="" />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.textContainer}>
            <Typography className={classes.text} variant="h4">
              Create Custom Feeds & Collections
            </Typography>
            <Typography className={classes.featureSubtitle} variant="h6">
              Take control of the contents you see.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.featureContainer}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.textContainer}>
            <Typography className={classes.text} variant="h4">
              Save Contents to Collections
            </Typography>
            <Typography className={classes.featureSubtitle} variant="h6">
              Save contents to a collection for future reference.
            </Typography>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div>
            <img
              className={classes.image}
              src={SaveContentsToCollections}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div>
            <img className={classes.image} src={FactCheckClaims} alt="" />
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.textContainer}>
            <Typography className={classes.text} variant="h4">
              Read Claim Reviews
            </Typography>
            <Typography className={classes.featureSubtitle} variant="h6">
              Cross-examine claims for fact-checking.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
