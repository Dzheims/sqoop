/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Button } from '@material-ui/core';
import { useDrawerState } from './FactCheckDrawerState';

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

interface FactCheckProps {
  suggestedKeywords: any;
}

const FactCheckButton = ({ suggestedKeywords }: FactCheckProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [highlightButton, setHighlightButton] = useState<boolean>(false);
  const [stateUpdater, setStateUpdater] = useState<boolean>(true);

  useEffect(() => {
    if (suggestedKeywords === state.suggestedKeyWords) {
      setHighlightButton(!highlightButton);
    } else {
      setHighlightButton(false);
    }
  }, [state.suggestedKeyWords]);

  useEffect(() => {
    setOpenDrawer(state.open);
  }, [state.open]);

  const handleOpen = () => {
    if (suggestedKeywords === state.suggestedKeyWords) {
      setOpenDrawer(!openDrawer);
      setStateUpdater(!stateUpdater);
      setState({
        ...state,
        suggestedKeyWords: [],
        open: false,
      });
    } else {
      setOpenDrawer(true);
      setStateUpdater(!stateUpdater);
      setState({
        ...state,
        suggestedKeyWords: suggestedKeywords,
        open: true,
      });
    }
  };

  return (
    <div>
      <Button
        className={
          highlightButton
            ? classes.onClickFactCheckButton
            : classes.factCheckButton
        }
        startIcon={
          <FactCheckIcon
            className={
              highlightButton
                ? classes.onClickFactCheckIcon
                : classes.factCheckIcon
            }
          />
        }
        variant="outlined"
        onClick={() => {
          handleOpen();
        }}
      >
        Fact Check
      </Button>
    </div>
  );
};

export default FactCheckButton;
