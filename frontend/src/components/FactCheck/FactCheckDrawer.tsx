/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton } from '@material-ui/core';
import FactCheckDrawerContent from './FactCheckDrawerContent';
import { useDrawerState } from './FactCheckDrawerState';
import { Title } from '../Columns/ColumnsStyle';

const useStyles = makeStyles((theme) => ({
  factCheckIcon: {
    height: '35px',
    width: '35px',
    color: theme.palette.secondary.main,
  },
  closeIcon: {
    color: 'gray',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
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
  drawerPaper: {
    width: '325px',
    backgroundColor: '#f7fafc',
    zIndex: 200,
    display: 'flex',
    overflow: 'hidden',
  },
  drawer: {
    width: '280',
    maxHeight: '100vh',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
  },
  drawerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const FactCheckDrawer = () => {
  const classes = useStyles();

  useEffect(() => {});

  const { state, setState } = useDrawerState();
  const handleClose = () => {
    setState({ ...state, open: false, suggestedKeyWords: [] });
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="right"
        open={state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawer}>
          <div className={classes.drawerTitle}>
            <Title>Fact Check</Title>
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{ height: '20px', width: '20px' }}
                className={classes.closeIcon}
              />
            </IconButton>
          </div>
          <FactCheckDrawerContent suggestedKeyWords={state.suggestedKeyWords} />
        </div>
      </Drawer>
    </div>
  );
};

export default FactCheckDrawer;
