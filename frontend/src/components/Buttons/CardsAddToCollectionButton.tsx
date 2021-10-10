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
import {
  GET_COLLECTIONS_LIST_QUERY,
  SAVE_CONTENT_TO_COLLECTION,
} from '../Collections/query';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '10px',
  },
  icon: {
    height: '30px',
    width: '30px',
    color: 'gray',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  selectedIcon: {
    height: '30px',
    width: '30px',
    color: theme.palette.secondary.main,
  },
}));

interface IDProps {
  id: any;
}

const CardsAddToCollectionButton = ({ id }: IDProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [collectionID, setCollectionID] = useState(0);

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
          collectionId: collectionID,
          tweetId: id as string,
        },
      },
    },
    onCompleted: () => {
      handleClickClose();
    },
    refetchQueries: [{ query: GET_COLLECTIONS_LIST_QUERY }],
  });

  const handleSave = () => {
    saveContentToCollection();
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton onClick={handleClickOpen}>
          <AddIcon className={isOpen ? classes.selectedIcon : classes.icon} />
        </IconButton>
      </div>
      <Dialog open={isOpen} onClose={handleClickClose}>
        <DialogTitle>Save Contents to Collection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a collection in which you would want to save the content.
          </DialogContentText>
          <CollectionsList
            collectionID={collectionID}
            setCollectionID={setCollectionID}
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
