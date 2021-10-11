/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Drawer, IconButton } from '@material-ui/core';
import FactCheckDrawerContent from '../Drawers/DrawerContents/FactCheck/FactCheckDrawerContent';
import FactCheckButton from './FactCheckButton';

const useStyles = makeStyles((theme) => ({
  factCheckIcon: {
    height: '35px',
    width: '35px',
    color: theme.palette.secondary.main,
  },
  onClickFactCheckIcon: {
    height: '35px',
    width: '35px',
    color: 'white',
  },
  factCheckButton: {
    marginTop: '10px',
    textTransform: 'none',
    borderRadius: '12px',
    fontSize: '12px',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'white',
    },
  },
  onClickFactCheckButton: {
    marginTop: '10px',
    textTransform: 'none',
    borderRadius: '12px',
    fontSize: '12px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  closeButton: {
    fontSize: '12px',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'white',
    },
  },
  drawerPaper: {
    width: '325px',
    backgroundColor: '#f7fafc',
    zIndex: 200,
    display: 'flex',
  },
  drawer: {
    width: '280',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
  },
}));

interface FactCheckState {
  data: any;
  open: boolean;
}

interface DrawerState {
  data: any;
  open: boolean;
  setDrawerState: Dispatch<SetStateAction<FactCheckState>>;
}

const FactCheck = ({ data, open, setDrawerState }: DrawerState) => {
  const classes = useStyles();

  useEffect(() => {});

  const handleClose = () => {
    setDrawerState({
      data: [],
      open: false,
    });
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawer}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CancelIcon className={classes.factCheckIcon} />
          </IconButton>
          <FactCheckDrawerContent suggestedKeyWords={data} />
        </div>
      </Drawer>
    </div>
  );
};

export default FactCheck;
