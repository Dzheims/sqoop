import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import Benefit1 from '../../assets/benefit1.png';
import Benefit2 from '../../assets/benefit2.png';
import Benefit3 from '../../assets/benefit3.png';

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
          <img className={classes.image} src={Benefit1} alt="" />
          <Typography className={classes.text} variant="h6" align="center">
            Save time in monitoring online
          </Typography>
        </div>
      </Grid>
      <Grid xs={4} className={classes.grid}>
        <div className={classes.sectionContentContainer}>
          <img className={classes.image} src={Benefit2} alt="" />
          <Typography className={classes.text} variant="h6" align="center">
            Keep track of your stories of interest
          </Typography>
        </div>
      </Grid>
      <Grid xs={4} className={classes.grid}>
        <div className={classes.sectionContentContainer}>
          <img className={classes.image} src={Benefit3} alt="" />
          <Typography className={classes.text} variant="h6" align="center">
            Fight misinformation
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default Benefits;
