import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignupPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
