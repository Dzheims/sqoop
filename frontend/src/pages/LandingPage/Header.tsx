import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Button, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 10%',
    backgroundColor: '#ffffff',
  },
  sectionContentContainer: {
    display: 'flex',
    height: '550px',
    alignItems: 'center',
  },
  headerMainTitle: {
    fontWeight: 500,
  },
  headerMainSubtitle: {
    marginTop: '10px',
    color: '#808080',
  },
  button: {
    marginTop: '10px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  headerMainImage: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
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
            Stay Updated. <br /> Verify Information. <br /> You Sqoop.
          </Typography>
          <Typography
            className={classes.headerMainSubtitle}
            variant="subtitle1"
          >
            Sqoop is a Newsroom Content Discovery and Management Tool
            <br />
            that aims to provide its users a convenient way ...
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={() => {
              history.push('/signup');
            }}
          >
            Get Started
          </Button>
        </Grid>
        <Grid xs={6}>
          <div className={classes.headerMainImage}>Picture Here</div>
        </Grid>
      </div>
    </div>
  );
};

export default Header;
