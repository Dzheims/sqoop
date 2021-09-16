import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ApolloError, useMutation } from '@apollo/client';
import SIGN_IN_MUTATION from './query';
import AUTH_TOKEN from '../../constants';
import Cookies from 'js-cookie';
import { SigninMutation, SigninMutationVariables } from './query.generated';
import { SigninInput } from '../../types.generated';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  welcome: {
    marginTop: theme.spacing(10),
    fontWeight: 'bold',
    alignItems: 'left',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginInput, setLoginInput] = useState<SigninInput>({
    userName: '',
    password: '',
  });

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setLoginInput({
      ...loginInput,
      userName: value,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setLoginInput({
      ...loginInput,
      password: value,
    });
  };

  const [signIn] = useMutation<SigninMutation, SigninMutationVariables>(
    SIGN_IN_MUTATION,
    {
      variables: {
        input: {
          userName: loginInput.userName,
          password: loginInput.password,
        },
      },
      onCompleted: ({ signin }) => {
        Cookies.set(AUTH_TOKEN, signin?.jwtToken as string);
        history.push('/');
      },
    }
  );

  const handleSubmit = () => {
    signIn();
    // .then((res) => {
    //   localStorage.setItem(AUTH_TOKEN, res.data?.signin?.jwtToken as string);
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography className={classes.welcome} color="primary" variant="h3">
        Welcome Back <br /> to Sqoop
      </Typography>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            id="username"
            label="Username"
            placeholder="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            onChange={onUserNameChange}
          />
          <TextField
            inputProps={{ 'data-testid': 'Password' }}
            label="Password"
            type="password"
            placeholder="Password"
            id="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={onPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onMouseDown={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
