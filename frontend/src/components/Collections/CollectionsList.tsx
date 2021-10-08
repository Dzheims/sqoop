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

const useStyles = makeStyles((theme) => ({
  div: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '200px',
    overFlow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
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
}));

interface CollectionIDProps {
  collectionID: number;
  setCollectionID: React.Dispatch<React.SetStateAction<number>>;
}

const CollectionsList: React.FC<CollectionIDProps> = ({
  collectionID,
  setCollectionID,
}: CollectionIDProps) => {
  const classes = useStyles();
  const [selectedButton, setSelectedButton] = useState(false);

  const { data, loading, error } = useGetCollectionsListQuery({
    variables: {
      condition: {
        userId: currentUserId(),
      },
    },
  });

  if (error) return <Error />;
  if (loading) return <Loader />;
  if (!data) return <Error />;

  const handleSelectButton = () => {
    setSelectedButton(!selectedButton);
  };

  return (
    <div className={classes.div}>
      <List
        dense
        subheader={<ListSubheader component="div">Collections</ListSubheader>}
      >
        {data?.collections?.map((value) => (
          <div>
            <ListItem
              className={
                collectionID === value.id
                  ? classes.selectedButton
                  : classes.button
              }
            >
              <ListItemButton
                onClick={() => {
                  setCollectionID(value.id);
                  handleSelectButton();
                }}
              >
                <ListItemText primary={value.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default CollectionsList;
