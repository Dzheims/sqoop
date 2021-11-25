/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import theme from '../../theme';
import NoColumnsImage from '../../assets/noColumns.png';
import { useNavDrawerState } from '../Navigation/NavDrawerState';

const useStyles = makeStyles(() => ({
  noColumnsContainer: {
    width: '520px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  headerText: {
    padding: '5px',
    fontSize: '20px',
    color: theme.palette.primary.main,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  subText: {
    color: 'gray',
  },
  image: {
    width: '160px',
    height: '160px',
  },
  button: {
    textTransform: 'none',
    marginTop: '15px',
  },
}));
const NoColumns = () => {
  const classes = useStyles();
  const { drawerState, setDrawerState } = useNavDrawerState();

  const handleClick = (currentDrawer: string) => {
    setDrawerState({
      ...drawerState,
      isOpen: true,
      current: currentDrawer,
    });
  };

  useEffect(() => {
    drawerState;
  }, [drawerState]);

  return (
    <div className={classes.noColumnsContainer}>
      <div className={classes.contentContainer}>
        <div>
          <img className={classes.image} src={NoColumnsImage} alt="" />
        </div>
        <Typography className={classes.headerText}>No columns yet</Typography>
        <Typography align="center" className={classes.subText}>
          Add subtext here
        </Typography>
        <Button
          className={classes.button}
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleClick('Add Column');
          }}
        >
          Add Now
        </Button>
      </div>
    </div>
  );
};

export default NoColumns;
