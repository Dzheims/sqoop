import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useGetUserNameQuery } from './query.generated';
import { useGetCurrentUserIdQuery } from '../../authentication/authentication.query.generated';

const useStyles = makeStyles((theme) => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const { data, loading, error } = useGetUserNameQuery({
    variables: {
      input: useGetCurrentUserIdQuery().data?.currentUserId as number,
    },
  });

  return (
    <div className={classes.div}>
      <Typography color="primary" variant="h4">
        {data?.user?.username}
      </Typography>
    </div>
  );
};

export default UserProfile;
