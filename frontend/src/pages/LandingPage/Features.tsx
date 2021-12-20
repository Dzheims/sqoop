import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ViewNewsContents from '../../assets/viewNewsContents.png';
import CreateCustomFeeds from '../../assets/createCustomFeedsAndCollections.png';
import SaveContentsToCollections from '../../assets/saveContentsToCollections.png';
import FactCheckClaims from '../../assets/factCheckClaims.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 10%',
    backgroundColor: '#ffffff',
  },
  text: {
    fontWeight: 500,
    color: '#575757',
  },
  sectionContentContainer: {
    display: 'flex',
    height: '400px',
    alignItems: 'center',
  },
  featureSubtitle: {
    marginTop: '10px',
    color: '#808080',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  imageContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  image: {
    height: '450px',
    width: '450px',
  },
}));

const Features = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.sectionContentContainer}>
        <Grid xs={6}>
          <Typography className={classes.text} variant="h4">
            View News Contents
          </Typography>
          <Typography className={classes.featureSubtitle} variant="subtitle1">
            Sqoop is a Newsroom Content Discovery and Management Tool that aims
            to provide its users a convenient way ...
          </Typography>
        </Grid>
        <Grid xs={6}>
          <div className={classes.imageContentContainer}>
            <img className={classes.image} src={ViewNewsContents} alt="" />
          </div>
        </Grid>
      </div>
      <div className={classes.sectionContentContainer}>
        <Grid xs={6}>
          <div className={classes.imageContentContainer}>
            <img className={classes.image} src={CreateCustomFeeds} alt="" />
          </div>
        </Grid>
        <Grid xs={6}>
          <Typography className={classes.text} variant="h4">
            Create Custom Feeds & Collections
          </Typography>
          <Typography className={classes.featureSubtitle} variant="subtitle1">
            Sqoop is a Newsroom Content Discovery and Management Tool that aims
            to provide its users a convenient way ...
          </Typography>
        </Grid>
      </div>
      <div className={classes.sectionContentContainer}>
        <Grid xs={6}>
          <Typography className={classes.text} variant="h4">
            Save Contents to Collections
          </Typography>
          <Typography className={classes.featureSubtitle} variant="subtitle1">
            Sqoop is a Newsroom Content Discovery and Management Tool that aims
            to provide its users a convenient way ...
          </Typography>
        </Grid>
        <Grid xs={6}>
          <div className={classes.imageContentContainer}>
            <img
              className={classes.image}
              src={SaveContentsToCollections}
              alt=""
            />
          </div>
        </Grid>
      </div>
      <div className={classes.sectionContentContainer}>
        <Grid xs={6}>
          <div className={classes.imageContentContainer}>
            <img className={classes.image} src={FactCheckClaims} alt="" />
          </div>
        </Grid>
        <Grid xs={6}>
          <Typography className={classes.text} variant="h4">
            View Claims for Fact Check
          </Typography>
          <Typography className={classes.featureSubtitle} variant="subtitle1">
            Sqoop is a Newsroom Content Discovery and Management Tool that aims
            to provide its users a convenient way ...
          </Typography>
        </Grid>
      </div>
    </div>
  );
};

export default Features;
