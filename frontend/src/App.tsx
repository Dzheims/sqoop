import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignupPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import NavigationBar from './components/Navigation/NavigationBar';
import Columns from './components/Columns/Column';
import CurrentUser from './authentication/authentication';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <div>
              <NavigationBar />
              <Route path="/" exact component={Homepage} />
              <Route path="/column" exact component={Columns} />
            </div>
            {/* <Route path="/users" exact component={CurrentUser} /> */}
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
