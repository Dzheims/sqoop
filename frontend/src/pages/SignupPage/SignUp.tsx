import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ApolloError, useMutation } from '@apollo/client';
import SIGN_UP_MUTATION from './query';
import AUTH_TOKEN from '../../constants';
import { SignupMutation, SignupMutationVariables } from './query.generated';
import { SignupInput } from '../../types.generated';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${'https://cdn.dribbble.com/users/1573739/screenshots/3706625/trump.gif'})`,
    backgroundColor: 'theme.palette.background.paper',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'column',
    margin: '100px 80px 0px 60px',
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  welcome: {
    fontWeight: 'bold',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginInput, setLoginInput] = useState<SignupInput>({
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

  const [signUp] = useMutation<SignupMutation, SignupMutationVariables>(
    SIGN_UP_MUTATION,
    {
      // fetchPolicy: 'network-only',
      // onError: (error: ApolloError) => {
      //   console.log(error.message);
      // },
      // onCompleted: (data: SignupMutation) => {
      //   localStorage.setItem(AUTH_TOKEN, data.signup?.jwtToken);
      //   history.push('/board');
      //   console.log(data.signup?.jwtToken);
      // },
    }
  );

  const handleSubmit = () => {
    signUp({
      variables: {
        input: {
          userName: loginInput.userName,
          password: loginInput.password,
        },
      },
    }).then((data) => {
      localStorage.setItem(AUTH_TOKEN, data.data?.signup?.jwtToken as string);
      history.push('/signin');
    });
    // .then(({ data }) => {
    //   localStorage.setItem('test', data?.signup?.jwtToken);
    //   history.push('/signin');
    //   console.log('wala giiid???');
    // })
    // .then((res) => {
    //   localStorage.setItem(AUTH_TOKEN, res.data?.signup?.jwtToken);
    //   console.log(res.data?.signup?.jwtToken);
    // });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} md={7} className={classes.image} />
      <Grid item xs={12} sm={7} md={5}>
        <div className={classes.paper}>
          <Typography className={classes.welcome} color="primary" variant="h3">
            Welcome to <br /> Sqoop
          </Typography>
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
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;
