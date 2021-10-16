/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@mui/icons-material/Add';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import CollectionsList from '../Collections/CollectionsList';
import {
  SaveContentToCollectionMutation,
  SaveContentToCollectionMutationVariables,
} from '../Collections/query.generated';
import { SAVE_CONTENT_TO_COLLECTION } from '../Collections/query';
import { COLLECTION_CONTENTS_QUERY, COLLECTION_TWEETS } from '../Columns/query';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '10px',
  },
  icon: {
    color: 'gray',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  selectedIcon: {
    color: theme.palette.secondary.main,
  },
  dialogTitle: {
    color: theme.palette.primary.main,
  },
}));

interface IDProps {
  id: string;
}

const CardsAddToCollectionButton = ({ id }: IDProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [collectionId, setCollectionId] = useState(0);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const [saveContentToCollection] = useMutation<
    SaveContentToCollectionMutation,
    SaveContentToCollectionMutationVariables
  >(SAVE_CONTENT_TO_COLLECTION, {
    variables: {
      input: {
        collectionTweet: {
          collectionId,
          tweetId: id,
        },
      },
    },
    onCompleted: () => {
      handleClickClose();
    },
    refetchQueries: [
      {
        query: COLLECTION_CONTENTS_QUERY,
        variables: { collectionId },
      },
      { query: COLLECTION_TWEETS, variables: { id } },
    ],
  });

  const handleSave = () => {
    saveContentToCollection();
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon
            fontSize="small"
            className={isOpen ? classes.selectedIcon : classes.icon}
          />
        </IconButton>
      </div>
      <Dialog open={isOpen} onClose={handleClickClose}>
        <DialogTitle className={classes.dialogTitle}>
          Save Contents to Collection
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a collection in which you would want to save the content.
          </DialogContentText>
          <CollectionsList
            collectionID={collectionId}
            setCollectionID={setCollectionId}
          />
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleSave} autoFocus>
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardsAddToCollectionButton;
