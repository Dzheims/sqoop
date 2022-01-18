import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ViewNewsContents from '../../assets/viewNewsContents.webp';
import CreateCustomFeeds from '../../assets/createCustomFeedsAndCollections.webp';
import SaveContentsToCollections from '../../assets/saveContentsToCollections.webp';
import FactCheckClaims from '../../assets/factCheckClaims.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 25px 50px 25px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 100px 20px 100px',
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
      fontSize: '30px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
    },
  },
  textContainer: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      marginBottom: '10px',
    },
  },
  featureSubtitle: {
    marginTop: '5px',
    color: '#808080',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
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
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      height: '335px',
      width: '335px',
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
            <Typography className={classes.text}>View News Contents</Typography>
            <Typography className={classes.featureSubtitle}>
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
            <Typography className={classes.text}>
              Create Custom Feeds & Collections
            </Typography>
            <Typography className={classes.featureSubtitle}>
              Take control of the contents you see.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.featureContainer}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.textContainer}>
            <Typography className={classes.text}>
              Save Contents to Collections
            </Typography>
            <Typography className={classes.featureSubtitle}>
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
            <Typography className={classes.text}>Read Claim Reviews</Typography>
            <Typography className={classes.featureSubtitle}>
              Cross-examine claims for fact-checking.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Features;
