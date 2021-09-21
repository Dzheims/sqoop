import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorImage from '../../assets/error.png';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  loader: {
    marginTop: '25px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  image: {
    maxWidth: '75px',
    maxHeight: '75px',
  },
  sorryText: {
    padding: '2px',
    fontSize: '20px',
    color: theme.palette.secondary.main,
  },
  errorText: {
    color: 'gray',
  },
}));

const Error = () => {
  const classes = useStyles();

  // const refreshPage = () => {
  //   window.location.reload(false);
  // };

  return (
    <div className={classes.loader}>
      <div>
        <img className={classes.image} src={ErrorImage} alt="" />
      </div>
      <Typography className={classes.sorryText}>Sorry,</Typography>
      <Typography className={classes.errorText}>
        Loading data has failed.
      </Typography>
      {/* <Button onClick={refreshPage}>Reload</Button> */}
    </div>
  );
};

export default Error;
