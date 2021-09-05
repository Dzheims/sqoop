import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie';
import AUTH_TOKEN from '../../constants';
import Logout from '../../components/Logout/Logout';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const history = useHistory();

  if (!Cookies.get(AUTH_TOKEN)) {
    history.push('/signin');
  }

  return (
    <div className={classes.button}>
      <Typography color="primary" variant="h3">
        User Profile
      </Typography>
      <Logout />
    </div>
  );
};

export default UserProfile;
