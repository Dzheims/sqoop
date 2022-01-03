import React from 'react';
import { Drawer } from '@material-ui/core';
import { useStyles } from './SideNavigationBarStyles';

interface DrawerProps {
  drawerStateProps: boolean;
  childComponent: React.ReactNode;
}

const SideNavigationDrawer = ({
  drawerStateProps,
  childComponent,
}: DrawerProps) => {
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

export default SideNavigationDrawer;
