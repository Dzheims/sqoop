import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '320px',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
  },
  drawerTitle: {
    font: '18px sans-serif',
    marginTop: '10px',
    marginLeft: '12px',
    color: theme.palette.primary.main,
  },
  contentContainer: {
    padding: '8px',
  },
}));

const DrawerContentContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.drawer}>
      <Typography className={classes.drawerTitle}>Drawer Title</Typography>
      <div className={classes.contentContainer}>Drawer Content Here</div>
    </div>
  );
};

export default DrawerContentContainer;
