import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

function SignUp() {
  const classes = useStyles();

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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
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
}

export default SignUp;
