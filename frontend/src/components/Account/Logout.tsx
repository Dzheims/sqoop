import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import AUTH_TOKEN from '../../constants';
import client from '../../apolloClient';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '2.5vh',
    borderRadius: 0,
    color: 'black',
    backgroundColor: '#FFFFFF',
    textTransform: 'none',
    textAlign: 'left',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#eceeee',
    },
  },
  // div: {
  //   padding: theme.spacing(1, 2, 2),
  // },
}));

const Logout = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async () => {
    // client.clearStore().then(() => {
    Cookies.remove(AUTH_TOKEN);
    history.push('/signin');
    await client.clearStore();
    // });
  };

  const handleManageAccount = async () => {};

  return (
    <div>
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
        onClick={handleSubmit}
        className={classes.button}
      >
        Log out
      </Button>
    </div>
  );
};

export default Logout;
