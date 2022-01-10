import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Button, Grid, Typography } from '@material-ui/core';
import Image from '../../assets/sqoopHeaderImage.png';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 8%',
    backgroundColor: '#ffffff',
  },
  sectionContentContainer: {
    display: 'flex',
    height: '580px',
    alignItems: 'center',
  },
  headerMainTitle: {
    fontWeight: 500,
  },
  headerMainSubtitle: {
    marginTop: '10px',
    color: '#808080',
    fontWeight: 400,
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  headerMainImage: {
    marginLeft: '20px',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
  image: {
    height: '525px',
    width: '525px',
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.sectionContentContainer}>
        <Grid xs={6}>
          <Typography
            className={classes.headerMainTitle}
            color="primary"
            variant="h2"
          >
            Never miss a thing. <br /> Sqoop everything.
          </Typography>
          <Typography className={classes.headerMainSubtitle} variant="h6">
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
        </Grid>
        <Grid xs={6}>
          <div className={classes.headerMainImage}>
            <img className={classes.image} src={Image} alt="" />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Header;
