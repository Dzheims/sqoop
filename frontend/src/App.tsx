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
import Homepage from './pages/Homepage';
import SignUp from './pages/SignupPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import { ColumnsData } from './components/Columns/ColumnsData';
import Board from './pages/Boards/BoardsSample/Board';
import NavigationBar from './components/Navigation/NavigationBar';
import Columns from './components/Columns/Column';
import AUTH_TOKEN from './constants';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/home" exact component={Homepage} />
            <Route
              render={() => {
                if (Cookies.get(AUTH_TOKEN)) {
                  return <Redirect to="/home" />;
                }
                return <Redirect to="/" />;
              }}
            />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
