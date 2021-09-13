import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Tooltip,
  Drawer,
  Backdrop,
} from '@material-ui/core';
import AddFeedsIcon from '@material-ui/icons/AddCircle';
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
  const [title, setTitle] = useState('');

  const NavBarMenu = [
    {
      id: 'add',
      title: 'Add News Feeds',
      icon: <AddFeedsIcon className={classes.icons} />,
    },
    {
      id: 'add',
      title: 'Add Twitter Feeds',
      icon: <AddFeedsIcon className={classes.icons} />,
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
              <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <DrawerContentContainer drawerTitle={title} />
              </Drawer>
            </div>
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
