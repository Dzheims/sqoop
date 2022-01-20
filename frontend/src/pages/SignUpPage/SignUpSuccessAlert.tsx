import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';
import Typography from '@material-ui/core/Typography';
import Welcome from '../../assets/welcome.webp';
import AUTH_TOKEN from '../../constants';
import {
  SigninMutation,
  SigninMutationVariables,
} from '../SignInPage/query.generated';
import SIGN_IN_MUTATION from '../SignInPage/query';
import { FormValues } from './SignUpValidation';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    boxShadow: 'none',
  },
  successIcon: {
    margin: theme.spacing(2, 0, 4),
  },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 400,
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: '1vh',
  },
  divBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  image: {
    width: '200px',
    height: '200px',
  },
}));

const SignUpSuccessAlertBox = ({ userName, password }: FormValues) => {
  const classes = useStyles();
  const history = useHistory();

  const [signIn] = useMutation<SigninMutation, SigninMutationVariables>(
    SIGN_IN_MUTATION,
    {
      variables: {
        input: {
          userName: userName as string,
          password: password as string,
        },
      },
      onCompleted: ({ signin }) => {
        Cookies.set(AUTH_TOKEN, signin?.jwtToken as string);
        history.push('/home');
      },
    }
  );

  const handleSignIn = () => {
    signIn();
  };

  return (
    <Box className={classes.box}>
      <Grid className={classes.divBox}>
        <div>
          <img className={classes.image} src={Welcome} alt="" />
        </div>
        <Typography color="primary" variant="h4">
          Awesome!
        </Typography>
        <Typography variant="body1">Your account was created</Typography>
        <Button
          data-testid="btn-get-started"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleSignIn}
        >
          Let&apos;s get started!
        </Button>
      </Grid>
    </Box>
  );
};

export default SignUpSuccessAlertBox;
