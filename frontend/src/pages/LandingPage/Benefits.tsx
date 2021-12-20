import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Image from '../../assets/sqoopLogo.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 5%',
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    height: '400px',
  },
  text: {
    fontWeight: 500,
    color: '#575757',
  },
  image: {
    height: '40px',
    width: '110px',
    marginBottom: '20px',
  },
  sectionContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    width: '280px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    // border: '1px solid #eeeeee',
    borderRadius: '10px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Benefits = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid xs={4} className={classes.grid}>
        <div className={classes.sectionContentContainer}>
          <img className={classes.image} src={Image} alt="" />
          <Typography className={classes.text} variant="h5" align="center">
            View news contents in one place
          </Typography>
        </div>
      </Grid>
      <Grid xs={4} className={classes.grid}>
        <div className={classes.sectionContentContainer}>
          <img className={classes.image} src={Image} alt="" />
          <Typography className={classes.text} variant="h5" align="center">
            Take control of the contents you see
          </Typography>
        </div>
      </Grid>
      <Grid xs={4} className={classes.grid}>
        <div className={classes.sectionContentContainer}>
          <img className={classes.image} src={Image} alt="" />
          <Typography className={classes.text} variant="h5" align="center">
            Avoid misinformation or fake news
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default Benefits;
