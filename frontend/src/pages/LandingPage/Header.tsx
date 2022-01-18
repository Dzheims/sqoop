import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import Image from '../../assets/sqoopHeaderImage.webp';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '25px 25px 0 25px',
      height: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 100px 0 100px',
      height: '550px',
    },
  },
  headerText: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
    },
  },
  headerMainTitle: {
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '40px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '60px',
    },
  },
  headerMainSubtitle: {
    marginTop: '10px',
    color: '#808080',
    fontWeight: 400,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  headerMainImage: {
    alignItems: 'center',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      height: '335px',
      width: '335px',
    },
    [theme.breakpoints.up('md')]: {
      height: '525px',
      width: '525px',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div className={classes.headerText}>
            <Typography className={classes.headerMainTitle} color="primary">
              Never miss a thing. Sqoop everything.
            </Typography>
            <Typography className={classes.headerMainSubtitle}>
              A content discovery and management tool to conveniently monitor,
              track and manage overflooding information.
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
        <Grid xs={12} sm={12} md={6} className={classes.container}>
          <div>
            <img className={classes.image} src={Image} alt="" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
