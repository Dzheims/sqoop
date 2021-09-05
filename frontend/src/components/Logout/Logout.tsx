import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import AUTH_TOKEN from '../../constants';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Logout = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = () => {
    Cookies.remove(AUTH_TOKEN);
    history.push('/signin');
  };

  return (
    <div className={classes.button}>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
      >
        Log out
      </Button>
    </div>
  );
};

export default Logout;
