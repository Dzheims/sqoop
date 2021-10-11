/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Dispatch, SetStateAction, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Drawer, IconButton } from '@material-ui/core';
import FactCheckDrawerContent from '../Drawers/DrawerContents/FactCheck/FactCheckDrawerContent';

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

interface DrawerState {
  data: any;
  open: boolean;
}

interface FactCheckProps {
  suggestedKeywords: any;
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

const FactCheckButton = ({
  setDrawerState,
  suggestedKeywords,
}: FactCheckProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

    setDrawerState({
      open: true,
      data: suggestedKeywords,
    });
  };

  const handleDrawer = () => {};

  return (
    <div>
      <Button
        className={
          open ? classes.onClickFactCheckButton : classes.factCheckButton
        }
        startIcon={
          <FactCheckIcon
            className={
              open ? classes.onClickFactCheckIcon : classes.factCheckIcon
            }
          />
        }
        variant="outlined"
        onClick={handleOpen}
      >
        Fact Check
      </Button>
    </div>
  );
};

export default FactCheckButton;
