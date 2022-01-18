import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  makeStyles,
  AppBar as SqoopBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Logo from '../../assets/sqoopLogo.webp';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#f7fafc',
    boxShadow: 'none',
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      padding: '0 5px 0 5px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 90px 0 90px',
    },
    display: 'flex',
  },
  logo: {
    height: '40px',
    width: '110px',
  },
  icon: {
    height: '40px',
    width: '40px',
  },
  button: {
    textTransform: 'none',
    marginLeft: '8px',
    boxShadow: 'none',
  },
  appbarContentsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const AppBar = () => {
  const matches = useMediaQuery('(min-width:450px)');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const classes = useStyles();
  const history = useHistory();

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openMenu = Boolean(anchorEl);

  return (
    <SqoopBar position="static" className={classes.appBar}>
      <Toolbar>
        <div className={classes.appbarContentsContainer}>
          <a href="/">
            <img src={Logo} alt="logo" className={classes.logo} />
          </a>
          <div>
            {matches ? (
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    history.push('/signup');
                  }}
                >
                  Create Account
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    history.push('/signin');
                  }}
                >
                  Sign in
                </Button>
              </div>
            ) : (
              <div>
                <IconButton onClick={onMenuClick}>
                  <MenuIcon className={classes.icon} />
                </IconButton>
                <Menu open={openMenu} anchorEl={anchorEl}>
                  <MenuItem
                    onClick={() => {
                      history.push('/signup');
                    }}
                  >
                    Create Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      history.push('/signin');
                    }}
                  >
                    Sign In
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </Toolbar>
    </SqoopBar>
  );
};

export default AppBar;
