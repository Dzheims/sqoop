import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import AUTH_TOKEN from '../../constants';
import client from '../../apolloClient';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: 0,
    height: '30px',
    textTransform: 'none',
    boxShadow: 'none',
  },
  // div: {
  //   padding: theme.spacing(1, 2, 2),
  // },
}));

const Logout = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async () => {
    Cookies.remove(AUTH_TOKEN);
    history.push('/signin');
    await client.clearStore();
  };

  const handleManageAccount = async () => {};

  return (
    <div className={classes.buttonContainer}>
      {/* <Button
        data-testid="btn-logout"
        type="submit"
        fullWidth
        color="inherit"
        variant="contained"
        onClick={handleManageAccount}
        className={classes.button}
      >
        Manage Account
      </Button> */}
      <Button
        data-testid="btn-logout"
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        className={classes.button}
      >
        Log out
      </Button>
    </div>
  );
};

export default Logout;
