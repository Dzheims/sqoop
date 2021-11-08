/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  IconButton,
  Tooltip,
  Backdrop,
  Typography,
  ListItemText,
  List,
  ListItem,
  Divider,
  Popover,
  Box,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import AddFeedsIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Person } from '@material-ui/icons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  NavigationBarContainer,
  AccountAvatarContainer,
  MenuContainer,
  useStyles,
  IconContainer,
} from './NavigationBarStyles';
import AddNewsAPIFeedForm from '../Drawers/DrawerContents/NewsApiFeedForm/AddNewsAPIFeedForm';
import AddTwitterFeedForm from '../Drawers/DrawerContents/TwitterFeedForm/AddTwitterFeedForm';
import Logout from '../Account/Logout';
import UserProfile from '../Account/UserProfile';
import AddCollectionForm from '../Drawers/DrawerContents/CollectionForm/AddCollectionsForm';
import Search from '../Drawers/DrawerContents/Search/Search';
import NavDrawer from './NavDrawer';
import ColumnsListData from '../Drawers/DrawerContents/ColumnNavigation/ColumnsListData';

interface DrawerState {
  current: string;
  open: boolean;
}

interface DrawerProps {
  drawerStateProps: boolean;
  titleProps: string;
}

interface SuccessAlert {
  type: string;
  feedTitle: string;
  success: boolean;
}

const NavigationBar = () => {
  const classes = useStyles();

  const [drawerState, setDrawerState] = useState<DrawerProps>({
    drawerStateProps: false,
    titleProps: '',
  });

  // useEffect(() => {
  //   setDrawerState({ ...drawerState, drawerStateProps: drawerStateProps });
  // }, [drawerStateProps]);

  const [open, setOpen] = useState<DrawerState>({
    current: '',
    open: false,
  });

  const [successAlert, setSuccessAlert] = useState<SuccessAlert>({
    type: '',
    feedTitle: '',
    success: false,
  });

  const [title, setTitle] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openAccount = Boolean(anchorEl);

  const NavBarMenu = [
    {
      id: 'add',
      title: 'Add Column',
      icon: (
        <AddFeedsIcon
          className={
            open.open === true && open.current === 'Add Column'
              ? classes.selectedIcons
              : classes.icons
          }
        />
      ),
    },
    {
      id: 'search',
      title: 'Search',
      icon: (
        <SearchIcon
          className={
            open.open === true && open.current === 'Search'
              ? classes.selectedIcons
              : classes.icons
          }
        />
      ),
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: (
        <NavigationIcon
          className={
            open.open === true && open.current === 'Navigation'
              ? classes.selectedIcons
              : classes.icons
          }
        />
      ),
    },
  ];

  const AddFeedsButtons = [
    {
      title: 'Twitter Feed',
      onClick: () => {
        setTitle('Twitter Feed');
      },
    },
    {
      title: 'News Feed',
      onClick: () => {
        setTitle('News Feed');
      },
    },
  ];
  const AddCollectionButton = [
    {
      title: 'Collection',
      onClick: () => {
        setTitle('Collection');
      },
    },
  ];

  const handleBack = (contentTitle: string) => {
    if (
      contentTitle === 'News Feed' ||
      contentTitle === 'Twitter Feed' ||
      contentTitle === 'Collection'
    )
      return (
        <IconButton
          onClick={() => {
            setTitle('Add Column');
          }}
        >
          <ArrowBackIcon className={classes.backIcon} />
        </IconButton>
      );
    return <div />;
  };

  const getDrawerContent = (contentTitle: string) => {
    if (contentTitle === 'Search') return <Search />;
    if (contentTitle === 'Add Column')
      return (
        <div>
          <Typography className={classes.drawerSubtitle}>Feeds</Typography>
          <List>
            {AddFeedsButtons.map((value) => (
              <ListItem
                button
                className={classes.listItemButtons}
                onClick={value.onClick}
                key={value.title}
              >
                <ListItemText>{value.title}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography className={classes.drawerSubtitle}>
            Collections
          </Typography>
          <List>
            {AddCollectionButton.map((value) => (
              <ListItem
                button
                className={classes.listItemButtons}
                onClick={value.onClick}
                key={value.title}
              >
                <ListItemText>{value.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      );
    if (contentTitle === 'Navigation') return <ColumnsListData />;
    if (contentTitle === 'News Feed')
      return (
        <AddNewsAPIFeedForm
          drawerStateChanger={setOpen}
          snackbarStateChanger={setSuccessAlert}
        />
      );
    if (contentTitle === 'Twitter Feed')
      return (
        <AddTwitterFeedForm
          drawerStateChanger={setOpen}
          snackbarStateChanger={setSuccessAlert}
        />
      );
    if (contentTitle === 'Collection')
      return (
        <AddCollectionForm
          drawerStateChanger={setOpen}
          snackbarStateChanger={setSuccessAlert}
        />
      );
    return <div />;
  };

  const openDrawer = (drawer: DrawerState) => {
    if (drawer.current === open.current) {
      setOpen({
        ...open,
        current: '',
        open: false,
      });
    } else {
      setOpen({
        ...open,
        current: drawer.current,
        open: drawer.open,
      });
    }
  };
  const closeDrawer = (drawer: DrawerState) => {
    setOpen({
      ...open,
      current: '',
      open: false,
    });
  };

  const drawerChild = (
    <div className={classes.drawer}>
      <div className={classes.drawerHeader}>
        {handleBack(title)}
        <Typography className={classes.drawerTitle}>{title}</Typography>
      </div>
      {getDrawerContent(title)}
    </div>
  );

  const handleSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessAlert({ ...successAlert, success: false });
  };

  return (
    <>
      <div>
        <NavDrawer drawerStateProps={open.open} childComponent={drawerChild} />
        <NavigationBarContainer>
          <MenuContainer>
            {NavBarMenu.map((item) => (
              <div>
                <Tooltip title={item.title} key={item.id} arrow>
                  <IconContainer
                    className={
                      open.open === true && open.current === item.title
                        ? classes.selectedIconContainer
                        : classes.iconContainer
                    }
                  >
                    <IconButton
                      aria-label={item.title}
                      onClick={() => {
                        openDrawer({ current: item.title, open: true });
                        setTitle(item.title);
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </IconContainer>
                </Tooltip>
              </div>
            ))}
          </MenuContainer>
          <AccountAvatarContainer>
            <Tooltip title="My Account" arrow>
              <IconButton onClick={onAccountClick}>
                <Avatar className={classes.avatars}>
                  <Person />
                </Avatar>
              </IconButton>
            </Tooltip>
          </AccountAvatarContainer>
          <Popover
            open={openAccount}
            anchorEl={anchorEl}
            onClose={handleClose}
            className={classes.popover}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box className={classes.profileBox}>
              <UserProfile />
              <Logout />
            </Box>
          </Popover>
        </NavigationBarContainer>
        <Backdrop
          className={classes.backdrop}
          open={open.open}
          onClick={() => {
            closeDrawer({ current: '', open: false });
          }}
        />
        ß
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={successAlert.success}
        autoHideDuration={7000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {successAlert.type} <strong>{successAlert.feedTitle}</strong> was
          created
        </Alert>
      </Snackbar>
    </>
  );
};

export default NavigationBar;
