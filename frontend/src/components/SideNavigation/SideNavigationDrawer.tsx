import React from 'react';
import { Drawer } from '@material-ui/core';
import { useStyles } from './SideNavigationBarStyles';

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
        // style={{
        //   marginLeft: drawerStateProps ? '292px' : 0,
        //   transition: 'all 0.25s ease-out',
        // }}
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
