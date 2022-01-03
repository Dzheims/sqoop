import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useGetUserNameQuery } from './query.generated';
import { truncateName } from '../Common/Functions/Functions';
import currentUserId from '../../authentication/currentUserId';

const useStyles = makeStyles((theme) => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: 'thin solid lightgray',
    padding: '5px',
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  // add error, loading handler
  const { data, loading, error } = useGetUserNameQuery({
    variables: {
      input: currentUserId(),
    },
  });

  return (
    <div className={classes.div}>
      <Typography color="primary" style={{ fontSize: '18px' }}>
        {truncateName(data?.user?.username as string, 12)}
      </Typography>
    </div>
  );
};

export default UserProfile;
