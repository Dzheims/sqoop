/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useGetCollectionsListQuery } from './query.generated';
import currentUserId from '../../authentication/currentUserId';
import Error from '../Common/Error';
import Loader from '../Common/Loader';
import { useCollectionsListState } from './CollectionsListState';

const useStyles = makeStyles((theme) => ({
  div: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    borderRadius: '12px',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selectedButton: {
    borderRadius: '12px',
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
}));

const CollectionsList = () => {
  const classes = useStyles();
  const { collectionListState, collectionListSetState } =
    useCollectionsListState();
  const [selectedButton, setSelectedButton] = useState(false);

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
