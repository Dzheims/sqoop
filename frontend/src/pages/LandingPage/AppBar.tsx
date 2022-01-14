import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  AppBar as SqoopBar,
  Toolbar,
  Button,
} from '@material-ui/core';
import Logo from '../../assets/sqoopLogo.webp';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#f7fafc',
    boxShadow: 'none',
    position: 'fixed',
    padding: '0 5%',
    display: 'flex',
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

const AppBar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <SqoopBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.appbarContentsContainer}>
          <a href="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </a>
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                history.push('/signup');
              }}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
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
    </SqoopBar>
  );
};

export default AppBar;
