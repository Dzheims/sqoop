/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGetCollectionsListQuery } from './query.generated';
import currentUserId from '../../../../../authentication/currentUserId';
import Error from '../../../../Common/Error';
import Loader from '../../../../Common/Loader';
import { useCollectionsListState } from './CollectionsListState';
import { useNavDrawerState } from '../../../../SideNavigation/SideNavigationDrawerState';

const useStyles = makeStyles((theme) => ({
  div: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    borderRadius: '8px',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selectedButton: {
    borderRadius: '8px',
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  listContainer: {
    padding: '10px',
    overflow: 'auto',
    maxHeight: '180px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  noCollectionsText: {
    color: '#585858',
    fontSize: '14px',
  },
  addButton: {
    textTransform: 'none',
    marginTop: '10px',
    width: '100px',
  },
  noCollections: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '15px',
  },
}));

const CollectionsList = () => {
  const classes = useStyles();
  const { collectionListState, collectionListSetState } =
    useCollectionsListState();
  const [selectedButton, setSelectedButton] = useState(false);
  const { drawerState, setDrawerState } = useNavDrawerState();

  const handleClick = (currentDrawer: string) => {
    setDrawerState({
      ...drawerState,
      isOpen: true,
      current: currentDrawer,
    });
  };

  const { data, loading, error, refetch } = useGetCollectionsListQuery({
    variables: {
      condition: {
        userId: currentUserId(),
      },
    },
  });

  if (error)
    return (
      <Error
        header="Oops!"
        subHeader="Something went wrong"
        refetchQueries={refetch()}
      />
    );
  if (loading)
    return <Loader header="Please Wait" subHeader="Loading Collections List" />;
  if (!data)
    return (
      <Error
        header="Oops!"
        subHeader="No collections list data"
        refetchQueries={refetch()}
      />
    );
  if (data.collections?.length === 0)
    return (
      <div className={classes.noCollections}>
        <Typography className={classes.noCollectionsText}>
          No collections yet.
        </Typography>
        <Button
          className={classes.addButton}
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleClick('Collection');
          }}
        >
          Add Now
        </Button>
      </div>
    );

  const handleSelectButton = () => {
    setSelectedButton(!selectedButton);
  };

  return (
    <div className={classes.div}>
      <List
        dense
        subheader={<ListSubheader component="div">Collections</ListSubheader>}
      >
        <div className={classes.listContainer}>
          {data?.collections?.map((value) => (
            <div>
              <ListItem
                className={
                  collectionListState.collectionId === value.id
                    ? classes.selectedButton
                    : classes.button
                }
              >
                <ListItemButton
                  onClick={() => {
                    collectionListSetState({
                      ...collectionListState,
                      collectionId: value.id,
                    });
                    handleSelectButton();
                  }}
                >
                  <ListItemText primary={value.title} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </div>
      </List>
    </div>
  );
};

export default CollectionsList;
