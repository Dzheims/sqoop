import React from 'react';
import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import AddCollectionsIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import {
  NavigationBarContainer,
  AccountAvatarContainer,
  MenuContainer,
  useStyles,
  IconContainer,
} from './NavigationBarStyles';

const NavigationBar = () => {
  const classes = useStyles();
  const NavBarMenu = [
    {
      id: 'add',
      title: 'Add Collections',
      path: '/board',
      icon: <AddCollectionsIcon className={classes.icons} />,
    },
    {
      id: 'search',
      title: 'Search',
      path: '/',
      icon: <SearchIcon className={classes.icons} />,
    },
  ];

  return (
    <NavigationBarContainer>
      <MenuContainer>
        {NavBarMenu.map((item) => (
          <Tooltip title={item.title} key={item.id} arrow>
            <IconContainer>
              <IconButton
                component={Link}
                aria-label={item.title}
                to={item.path}
              >
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
  );
};

export default NavigationBar;
