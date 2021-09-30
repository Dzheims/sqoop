import React, { useState } from 'react';
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

const FactCheck = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
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
          <IconButton
            className={classes.closeButton}
            onClick={() => setOpen(false)}
          >
            <CancelIcon className={classes.factCheckIcon} />
          </IconButton>
          <FactCheckDrawerContent />
        </div>
      </Drawer>
      <Button
        className={classes.factCheckButton}
        startIcon={<FactCheckIcon className={classes.factCheckIcon} />}
        variant="outlined"
        onClick={handleOpen}
      >
        Fact Check
      </Button>
    </div>
  );
};

export default FactCheck;
