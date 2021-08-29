import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import SIGN_UP_MUTATION from './query';
import AUTH_TOKEN from '../../constants';
import { SignupMutation, SignupMutationVariables } from './query.generated';
import { SignupInput } from '../../types.generated';
import { FormValues, validate } from './SignUpValidation';

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
  const [errors, setErrors] = useState<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [signupInput, setSignupInput] = useState<SignupInput>({
    userName: '',
    password: '',
  });

  const setErrorInForm = (input: string | undefined): boolean => {
    if (input === '') return false;
    if (input === undefined) return false;
    return true;
  };

  const containsError = () => {
    if (errors) {
      Object.values(errors).forEach((error) => {
        if (error === '') {
          setValidForm(true);
        } else if (error === undefined) {
          setValidForm(true);
        }
      });
    }
  };

  const [signUp] = useMutation<SignupMutation, SignupMutationVariables>(
    SIGN_UP_MUTATION,
    {
      onCompleted: ({ signup }) => {
        localStorage.setItem(AUTH_TOKEN, signup?.jwtToken);
        history.push('/signin');
      },
    }
  );

  useEffect(() => {
    if (isSubmitting) {
      containsError();
    }
  }, [errors]);

  const handleSubmit = () => {
    setErrors(validate(signupInput));
    setIsSubmitting(true);

    if (validForm) {
      setValidForm(false);
      signUp({
        variables: {
          input: {
            userName: signupInput.userName,
            password: signupInput.password,
          },
        },
      });
    }
  };

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isSubmitting) setErrors(validate(signupInput));
    const { value } = e.target;
    setSignupInput({
      ...signupInput,
      userName: value,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isSubmitting) setErrors(validate(signupInput));
    const { value } = e.target;
    setSignupInput({
      ...signupInput,
      password: value,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={5} md={7} className={classes.image} />
      <Grid item xs={12} sm={7} md={5}>
        <div className={classes.paper}>
          <Typography className={classes.welcome} color="primary" variant="h3">
            Welcome to <br /> Sqoop
          </Typography>
          <form className={classes.form}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              value={signupInput.userName || ''}
              placeholder="Username"
              onChange={onUserNameChange}
              error={setErrorInForm(errors?.userName || '')}
              helperText={errors?.userName}
            />
            <TextField
              inputProps={{ 'data-testid': 'Password' }}
              label="Password"
              type="password"
              id="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={signupInput.password || ''}
              placeholder="Password"
              onChange={onPasswordChange}
              error={setErrorInForm(errors?.password || '')}
              helperText={errors?.password}
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
                <Link href="/" variant="body2">
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
