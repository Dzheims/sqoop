import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
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
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});

export default theme;
