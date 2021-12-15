import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';
import Logo from '../../assets/sqoopLogo.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    background: theme.palette.background.paper,
    boxShadow: 'none',
    position: 'fixed',
    padding: '0 5%',
  },
  logo: {
    height: '40px',
    width: '110px',
  },
  button: {
    textTransform: 'none',
    marginLeft: '8px',
    boxShadow: 'none',
  },
  appbarContentsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const LandingPageAppBar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.appbarContentsContainer}>
          <a href="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </a>
          <div>
            <Button
              variant="text"
              color="primary"
              className={classes.button}
              onClick={() => {
                history.push('/');
              }}
            >
              About
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                history.push('/signin');
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default LandingPageAppBar;
