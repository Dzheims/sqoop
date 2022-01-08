import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useGetUserNameQuery } from './query.generated';
import { truncateName } from '../Common/Functions/Functions';
import currentUserId from '../../authentication/currentUserId';
import Loader from '../Common/Loader';

const useStyles = makeStyles(() => ({
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottom: 'thin solid lightgray',
    padding: '5px',
  },
  errorContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  errorMessage: {
    padding: '5px',
    fontSize: '14px',
    color: 'gray',
  },
}));

const UserProfile = () => {
  const classes = useStyles();

  const { data, loading, error } = useGetUserNameQuery({
    variables: {
      input: currentUserId(),
    },
  });
  if (error)
    return (
      <div className={classes.errorContainer}>
        <Typography className={classes.errorMessage} variant="body2">
          Something went wrong.
        </Typography>
      </div>
    );
  if (loading) return <Loader header="" subHeader="" />;

  return (
    <div className={classes.div}>
      <Typography color="primary" style={{ fontSize: '18px' }}>
        {truncateName(data?.user?.username as string, 12)}
      </Typography>
    </div>
  );
};

export default UserProfile;
