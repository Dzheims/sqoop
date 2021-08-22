import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Homepage from './pages/Homepage';
import Board from './pages/Boards/Board';

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/board" exact component={Board} />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
