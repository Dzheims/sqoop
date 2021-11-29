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
  SaveTweetToCollectionMutation,
  SaveTweetToCollectionMutationVariables,
  SaveArticleToCollectionMutation,
  SaveArticleToCollectionMutationVariables,
} from '../Collections/query.generated';
import {
  SAVE_TWEET_TO_COLLECTION,
  SAVE_ARTICLE_TO_COLLECTION,
} from '../Collections/query';
import { COLLECTION_CONTENTS_QUERY } from '../Columns/query';
import { CollectionContent } from '../../types.generated';
import { useCollectionsListState } from '../Collections/CollectionsListState';

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

interface CollectionContentProps {
  data: CollectionContent;
}

const CardsAddToCollectionButton = ({ data }: CollectionContentProps) => {
  const classes = useStyles();
  const { state, setState } = useCollectionsListState();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const [saveTweetToCollection] = useMutation<
    SaveTweetToCollectionMutation,
    SaveTweetToCollectionMutationVariables
  >(SAVE_TWEET_TO_COLLECTION);

  const [saveArticleToCollection] = useMutation<
    SaveArticleToCollectionMutation,
    SaveArticleToCollectionMutationVariables
  >(SAVE_ARTICLE_TO_COLLECTION);

  const handleSave = () => {
    if (data.__typename) {
      switch (data.__typename) {
        case 'CollectionTweet':
          saveTweetToCollection({
            variables: {
              input: {
                collectionTweet: {
                  collectionId: state.collectionId,
                  tweetId: data.tweetId,
                },
              },
            },
            onCompleted: () => {
              handleClickClose();
            },
            refetchQueries: [
              {
                query: COLLECTION_CONTENTS_QUERY,
                variables: { collectionId: state.collectionId },
              },
            ],
          });
          break;
        case 'CollectionArticle':
          saveArticleToCollection({
            variables: {
              input: {
                collectionArticle: {
                  collectionId: state.collectionId,
                  title: data.title,
                  description: data.description,
                  publishedAt: data.publishedAt,
                  sourceName: data.sourceName,
                  url: data.url,
                  urlToImage: data.urlToImage,
                },
              },
            },
            onCompleted: () => {
              handleClickClose();
            },
            refetchQueries: [
              {
                query: COLLECTION_CONTENTS_QUERY,
                variables: { collectionId: state.collectionId },
              },
            ],
          });
          break;
        default:
          handleClickClose();
          break;
      }
    }
    handleClickClose();
  };

  return (
    <div>
      <div className={classes.root}>
        <IconButton onClick={handleClickOpen} data-testid="save-to-collections">
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
          <CollectionsList />
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleSave} autoFocus data-testid="submit-save">
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardsAddToCollectionButton;