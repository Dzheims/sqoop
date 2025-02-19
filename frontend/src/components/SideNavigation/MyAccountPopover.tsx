import React, { useState } from 'react';
import { IconButton, Tooltip, Popover, Box } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { AccountAvatarContainer, useStyles } from './SideNavigationBarStyles';
import Logout from '../Account/Logout';
import UserProfile from '../Account/UserProfile';

const MyAccountPopover = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openAccount = Boolean(anchorEl);

  return (
    <div>
      <AccountAvatarContainer>
        <Tooltip title="My Account" arrow>
          <IconButton onClick={onAccountClick}>
            <AccountCircle className={classes.icons} />
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
    </div>
  );
};

export default MyAccountPopover;
