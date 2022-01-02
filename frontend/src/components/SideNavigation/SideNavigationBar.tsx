import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
  Backdrop,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@mui/material';
import AddFeedsIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import {
  NavigationBarContainer,
  MenuContainer,
  useStyles,
  IconContainer,
} from './SideNavigationBarStyles';
import AddNewsAPIFeedForm from '../SideNavigationDrawer/AddColumn/NewsFeedForm/AddNewsAPIFeedForm';
import AddTwitterFeedForm from '../SideNavigationDrawer/AddColumn/TwitterFeedForm/AddTwitterFeedForm';
import AddCollectionForm from '../SideNavigationDrawer/AddColumn/CollectionForm/AddCollectionsForm';
import Search from '../SideNavigationDrawer/Search/Search';
import NavDrawer from './SideNavigationDrawer';
import ColumnsListData from '../SideNavigationDrawer/ColumnNavigation/ColumnsListData';
import { useNavDrawerState } from './SideNavigationDrawerState';
import AddColumn from '../SideNavigationDrawer/AddColumn/AddColumn';
import MyAccountPopover from './MyAccountPopover';

interface DrawerState {
  current: string;
  open: boolean;
}

interface SuccessAlert {
  type: string;
  feedTitle: string;
  success: boolean;
}

const NavigationBar = () => {
  const classes = useStyles();
  const { drawerState, setDrawerState } = useNavDrawerState();
  const [successAlert, setSuccessAlert] = useState<SuccessAlert>({
    type: '',
    feedTitle: '',
    success: false,
  });

  const buttonOnSelectHandler = (
    title: string,
    selectedButton: string,
    defaultButton: string
  ) => {
    if (drawerState.isOpen && drawerState.current === title)
      return selectedButton;
    if (
      drawerState.isOpen &&
      (drawerState.current === 'News Feed' ||
        drawerState.current === 'Twitter Feed' ||
        drawerState.current === 'Collection') &&
      title === 'Add Column'
    )
      return selectedButton;
    return defaultButton;
  };

  const setDrawer = (currentTitle: string, isDrawerOpen: boolean) => {
    setDrawerState({
      ...drawerState,
      isOpen: isDrawerOpen,
      current: currentTitle,
    });
  };

  const NavBarMenu = [
    {
      id: 'add',
      title: 'Add Column',
      icon: (
        <AddFeedsIcon
          className={buttonOnSelectHandler(
            'Add Column',
            classes.selectedIcons,
            classes.icons
          )}
        />
      ),
    },
    {
      id: 'search',
      title: 'Search',
      icon: (
        <SearchIcon
          className={buttonOnSelectHandler(
            'Search',
            classes.selectedIcons,
            classes.icons
          )}
        />
      ),
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: (
        <ViewColumnIcon
          className={buttonOnSelectHandler(
            'Navigation',
            classes.selectedIcons,
            classes.icons
          )}
        />
      ),
    },
  ];

  const getDrawerTitleIcon = (contentTitle: string) => {
    if (
      contentTitle === 'News Feed' ||
      contentTitle === 'Twitter Feed' ||
      contentTitle === 'Collection'
    )
      return (
        <IconButton
          onClick={() => {
            setDrawer('Add Column', true);
          }}
        >
          <ArrowBackIcon
            className={classes.backIcon}
            sx={{ height: '15px', width: '15px' }}
          />
        </IconButton>
      );
    return <></>;
  };

  const getDrawerContent = (contentTitle: string) => {
    switch (contentTitle) {
      case 'Add Column':
        return <AddColumn />;
      case 'Search':
        return <Search />;
      case 'Navigation':
        return <ColumnsListData />;
      case 'News Feed':
        return (
          <AddNewsAPIFeedForm
            drawerStateChanger={setDrawerState}
            snackbarStateChanger={setSuccessAlert}
          />
        );
      case 'Twitter Feed':
        return (
          <AddTwitterFeedForm
            drawerStateChanger={setDrawerState}
            snackbarStateChanger={setSuccessAlert}
          />
        );
      case 'Collection':
        return (
          <AddCollectionForm
            drawerStateChanger={setDrawerState}
            snackbarStateChanger={setSuccessAlert}
          />
        );
      default:
        return <div />;
    }
  };

  const openDrawer = (drawer: DrawerState) => {
    if (drawer.current === drawerState.current) setDrawer('', false);
    else setDrawer(drawer.current, drawer.open);
  };

  const closeDrawer = () => {
    setDrawer('', false);
  };

  const drawerChild = (
    <div className={classes.drawer}>
      <div className={classes.drawerHeader}>
        <div className={classes.drawerTitleContainer}>
          {getDrawerTitleIcon(drawerState.current)}
          <Typography className={classes.drawerTitle}>
            {drawerState.current}
          </Typography>
        </div>
        <IconButton onClick={closeDrawer}>
          <CloseIcon
            className={classes.closeIcon}
            sx={{ height: '15px', width: '15px' }}
          />
        </IconButton>
      </div>
      {getDrawerContent(drawerState.current)}
    </div>
  );

  const handleSnackbarClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    setSuccessAlert({ ...successAlert, success: false });
  };

  return (
    <>
      <NavDrawer
        drawerStateProps={drawerState.isOpen}
        childComponent={drawerChild}
      />
      <div>
        <NavigationBarContainer>
          <MenuContainer>
            {NavBarMenu.map((item) => (
              <div key={item.id}>
                <Tooltip title={item.title} key={item.id} arrow>
                  <IconContainer
                    className={buttonOnSelectHandler(
                      item.title,
                      classes.selectedIconContainer,
                      classes.iconContainer
                    )}
                  >
                    <IconButton
                      aria-label={item.title}
                      onClick={() => {
                        openDrawer({ current: item.title, open: true });
                        setDrawer(item.title, true);
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </IconContainer>
                </Tooltip>
              </div>
            ))}
          </MenuContainer>
          <MyAccountPopover />
        </NavigationBarContainer>
        <Backdrop
          className={classes.backdrop}
          open={drawerState.isOpen}
          onClick={closeDrawer}
        />
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
