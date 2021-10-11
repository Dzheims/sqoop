import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box, Modal } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ApolloError, useMutation } from '@apollo/client';
import SIGN_UP_MUTATION from './query';
import AUTH_TOKEN from '../../constants';
import { SignupMutation, SignupMutationVariables } from './query.generated';
import { SignupInput } from '../../types.generated';
import {
  SigninMutation,
  SigninMutationVariables,
} from '../SignInPage/query.generated';
import SIGN_IN_MUTATION from '../SignInPage/query';
import { FormValues, validate } from './SignUpValidation';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successIcon: { margin: theme.spacing(2, 0, 4) },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 500,
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
        history.push('/');
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
          <CheckCircleOutlineIcon
            color="success"
            fontSize="inherit"
            style={{ fontSize: 150 }}
            className={classes.successIcon}
          />
        </div>
        <Typography variant="h2" component="h1">
          Awesome!
        </Typography>
        <Typography variant="h6">Your account was created</Typography>
        <Button
          data-testid="btn-get-started"
          fullWidth
          variant="contained"
          color="primary"
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
