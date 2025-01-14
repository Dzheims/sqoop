import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import theme from './theme';
import Homepage from './pages/Homepage/Homepage';
import SignUp from './pages/SignUpPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import AUTH_TOKEN from './constants';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact>
              {Cookies.get(AUTH_TOKEN) ? (
                <Redirect to="/home" />
              ) : (
                <LandingPage />
              )}
            </Route>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/home" exact component={Homepage} />
            <Route>
              {Cookies.get(AUTH_TOKEN) ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
