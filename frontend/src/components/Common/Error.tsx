import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorImage from '../../assets/error.png';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  error: {
    marginTop: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  image: {
    maxWidth: '75px',
    maxHeight: '75px',
  },
  oopsText: {
    padding: '2px',
    fontSize: '20px',
    color: theme.palette.secondary.main,
  },
  errorText: {
    color: 'gray',
  },
}));

interface ErrorProps {
  header: string;
  subHeader: string;
}

const Error: React.FC<ErrorProps> = ({ header, subHeader }: ErrorProps) => {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <div>
        <img className={classes.image} src={ErrorImage} alt="" />
      </div>
      <Typography className={classes.oopsText}>{header}</Typography>
      <Typography className={classes.errorText}>{subHeader}</Typography>
    </div>
  );
};

export default Error;
