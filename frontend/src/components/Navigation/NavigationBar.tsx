import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Tooltip,
  Drawer,
  Backdrop,
  Button,
} from '@material-ui/core';
import AddCollectionsIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import {
  NavigationBarContainer,
  AccountAvatarContainer,
  MenuContainer,
  useStyles,
  IconContainer,
} from './NavigationBarStyles';
import DrawerContentContainer from '../Drawers/Drawer';

const NavigationBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const NavBarMenu = [
    {
      id: 'add',
      title: 'Add Collections',
      icon: <AddCollectionsIcon className={classes.icons} />,
    },
    {
      id: 'search',
      title: 'Search',
      icon: <SearchIcon className={classes.icons} />,
    },
  ];

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
        <DrawerContentContainer />
      </Drawer>
      <NavigationBarContainer>
        <MenuContainer>
          {NavBarMenu.map((item) => (
            <Tooltip title={item.title} key={item.id} arrow>
              <IconContainer>
                <IconButton aria-label={item.title} onClick={handleDrawer}>
                  {item.icon}
                </IconButton>
              </IconContainer>
            </Tooltip>
          ))}
        </MenuContainer>
        <AccountAvatarContainer>
          <Tooltip title="My Account" arrow>
            <IconButton>
              <Avatar className={classes.avatars}>S</Avatar>
            </IconButton>
          </Tooltip>
        </AccountAvatarContainer>
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
