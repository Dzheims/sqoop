import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignupPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import Board from './pages/Boards/Board';
import NavigationBar from './components/Navigation/NavigationBar';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/board" exact component={Board} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
