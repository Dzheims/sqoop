import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Tooltip,
  Drawer,
  Backdrop,
  Typography,
  ListItemText,
  List,
  ListItem,
  Divider,
  Popover,
  Container,
  Box,
  Grid,
} from '@material-ui/core';
import AddFeedsIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
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

const NavigationBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
      icon: <AddFeedsIcon className={classes.icons} />,
    },
    {
      id: 'search',
      title: 'Search',
      icon: <SearchIcon className={classes.icons} />,
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
    if (contentTitle === 'Search')
      return <div>Pretend this is a search bar</div>;
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
                <ListItemText> + {value.title}</ListItemText>
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
                <ListItemText> + {value.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      );
    if (contentTitle === 'News Feed') return <AddNewsAPIFeedForm />;
    if (contentTitle === 'Twitter Feed') return <AddTwitterFeedForm />;
    if (contentTitle === 'Collection') return <AddCollectionForm />;
    return <div />;
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawer}>
          <div className={classes.drawerHeader}>
            {handleBack(title)}
            <Typography className={classes.drawerTitle}>{title}</Typography>
          </div>

          {getDrawerContent(title)}
        </div>
      </Drawer>
      <NavigationBarContainer>
        <MenuContainer>
          {NavBarMenu.map((item) => (
            <div>
              <Tooltip title={item.title} key={item.id} arrow>
                <IconContainer>
                  <IconButton
                    aria-label={item.title}
                    onClick={() => {
                      handleDrawer();
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
              <Avatar className={classes.avatars}>S</Avatar>
            </IconButton>
          </Tooltip>
        </AccountAvatarContainer>
        <Popover
          open={openAccount}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              height: '15vh',
              width: '20vh',
              maxWidth: '30vh',
            }}
            className={classes.profileBox}
          >
            <UserProfile />
            <Logout />
          </Box>
        </Popover>
      </NavigationBarContainer>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleDrawer}
      />
    </div>
  );
};

export default NavigationBar;
