/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorImage from '../../assets/error.webp';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  error: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '10px',
  },
  image: {
    maxWidth: '150px',
    maxHeight: '150px',
  },
  oopsText: {
    padding: '2px',
    fontSize: '17px',
    color: theme.palette.secondary.main,
  },
  errorText: {
    color: 'gray',
    fontSize: '14px',
  },
  buttonContainer: {
    marginTop: '10px',
  },
}));

interface ErrorProps {
  header: string;
  subHeader: string;
  refetchQueries: any;
}

const Error: React.FC<ErrorProps> = ({
  header,
  subHeader,
  refetchQueries,
}: ErrorProps) => {
  const classes = useStyles();

  return (
    <div className={classes.error}>
      <div>
        <img className={classes.image} src={ErrorImage} alt="" />
      </div>
      <Typography className={classes.oopsText}>{header}</Typography>
      <Typography align="center" className={classes.errorText}>
        {subHeader}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            refetchQueries;
          }}
        >
          Reload
        </Button>
      </div>
    </div>
  );
};

export default Error;
