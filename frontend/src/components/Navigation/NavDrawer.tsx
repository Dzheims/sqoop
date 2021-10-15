/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from 'react';
import { Drawer } from '@material-ui/core';
import { useStyles } from './NavigationBarStyles';

interface DrawerProps {
  drawerStateProps: boolean;
  childComponent: React.ReactNode;
}

const NavDrawer = ({ drawerStateProps, childComponent }: DrawerProps) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerStateProps}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {childComponent}
      </Drawer>
    </div>
  );
};

export default NavDrawer;
