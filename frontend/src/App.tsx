import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignupPage/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import { ColumnsData } from './components/Columns/ColumnsData';
import Board from './pages/Boards/BoardsSample/Board';
import Columns from './components/Columns/Column';
import Landing from './pages/LandingPage/Landing';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/board" exact component={Board} />
            <Route path="/column" exact component={Columns} />
            <Route path="/home" exact component={Homepage} />
            <Route path="/column" exact component={ColumnsData} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
