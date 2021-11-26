import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Box, Modal } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from '@material-ui/core/Link';
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
import SignUpSuccessAlertBox from './SignUpSuccessAlert';

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
    margin: '80px 60px 0px 60px',
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
  successIcon: { margin: theme.spacing(2, 0, 4) },
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 500,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: theme.spacing(4),
  },
  divBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [signupInput, setSignupInput] = useState<FormValues>({
    userName: '',
    password: '',
    confirmedPassword: '',
  });
  const [errors, setErrors] = useState<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [triggerSubmit, setTriggerSubmit] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const setErrorInForm = (input: string | undefined): boolean => {
    if (input === '' || input === undefined) return false;
    return true;
  };

  const [signUp, { error }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGN_UP_MUTATION, {
    variables: {
      input: {
        userName: signupInput.userName,
        password: signupInput.password,
      },
    },
    onCompleted: () => {
      setSuccessAlert(true);
    },
  });

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setSignupInput({
      ...signupInput,
      userName: value,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setSignupInput({
      ...signupInput,
      password: value,
    });
  };

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setSignupInput({
      ...signupInput,
      confirmedPassword: value,
    });
  };

  const validateSignUp = () => {
    if (errors) {
      if (Object.values(errors).every((err) => err === '')) {
        if (signupInput.confirmedPassword === signupInput.password) {
          signUp();
        }
      }
    }
    setTriggerSubmit(false);
  };

  const handleSubmit = () => {
    setTriggerSubmit(true);
    setIsSubmitting(true);
    setErrors(validate(signupInput, error));
  };

  useEffect(() => {
    if (isSubmitting) setErrors(validate(signupInput, error));
    if (triggerSubmit) validateSignUp();
  }, [signupInput, triggerSubmit, error]);

  const passwordStrengthIndicator = () => {
    if (signupInput.password) {
      if (signupInput.password?.length < 8)
        return (
          <text style={{ color: 'red' }}>
            <span style={{ fontWeight: 600 }}>Weak Password.</span> It must be a
            minimum of 8 characters
          </text>
        );
      if (signupInput.password?.length > 8)
        return (
          <text style={{ color: 'green' }}>
            <span style={{ fontWeight: 600 }}>Strong Password.</span> Great!
          </text>
        );
    }
    return '';
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
              error={setErrorInForm(errors?.userName || '')}
              helperText={errors?.userName}
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
              error={setErrorInForm(errors?.password || '')}
              helperText={
                isSubmitting ? errors?.password : passwordStrengthIndicator()
              }
            />
            <TextField
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              id="confirm password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={onConfirmPasswordChange}
              error={setErrorInForm(errors?.confirmedPassword || '')}
              helperText={errors?.confirmedPassword}
            />
            <Button
              data-testid="btn-signup"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Modal open={successAlert}>
              <SignUpSuccessAlertBox
                userName={signupInput.userName}
                password={signupInput.password}
              />
            </Modal>
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
