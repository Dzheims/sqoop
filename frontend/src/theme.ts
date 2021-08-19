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
      paper: '#213159ff',
      default: '#fafafa',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    text: {
      primary: '#303030',
      secondary: '#fff'
    }
  },
  typography: {
      fontFamily: 'Roboto',
      fontSize: 14,
  }
});

export default theme;