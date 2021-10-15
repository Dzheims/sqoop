import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useGetUserNameQuery } from './query.generated';
import currentUserId from '../../authentication/currentUserId';

const useStyles = makeStyles((theme) => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: 'thin solid lightgray',
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const { data, loading, error } = useGetUserNameQuery({
    variables: {
      input: currentUserId(),
    },
  });

  return (
    <div className={classes.div}>
      <Typography color="primary" variant="h5">
        {data?.user?.username}
      </Typography>
    </div>
  );
};

export default UserProfile;
