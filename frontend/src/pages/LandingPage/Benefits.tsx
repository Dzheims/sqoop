import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Benefit1 from '../../assets/benefit1.webp';
import Benefit2 from '../../assets/benefit2.webp';
import Benefit3 from '../../assets/benefit3.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      padding: '25px',
      height: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 100px 0 100px',
      height: '400px',
    },
  },
  text: {
    fontWeight: 500,
    color: '#575757',
  },
  image: {
    height: '130px',
    width: '130px',
    marginBottom: '10px',
  },
  sectionContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '280px',
    width: '280px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    backgroundColor: '#ffffff',
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
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
}));

const Benefits = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={4} className={classes.grid}>
          <div className={classes.sectionContentContainer}>
            <img className={classes.image} src={Benefit1} alt="" />
            <Typography className={classes.text} variant="h5" align="center">
              Save time in monitoring online
            </Typography>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={4} className={classes.grid}>
          <div className={classes.sectionContentContainer}>
            <img className={classes.image} src={Benefit2} alt="" />
            <Typography className={classes.text} variant="h5" align="center">
              Keep track of your stories of interest
            </Typography>
          </div>
        </Grid>
        <Grid xs={12} sm={12} md={4} className={classes.grid}>
          <div className={classes.sectionContentContainer}>
            <img className={classes.image} src={Benefit3} alt="" />
            <Typography className={classes.text} variant="h5" align="center">
              Fight misinformation
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Benefits;
