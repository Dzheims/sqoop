import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0036e7',
    },
    secondary: {
      main: '#f04b4c',
    },
    background: {
      default: '#213159ff',
      paper: '#fafafa',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    text: {
      primary: '#6a6a6a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", "Calibri", "Helvetica"',
    fontSize: 14,
  },
});

export default theme;
