/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
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
import CollectionsList from './CollectionsList/CollectionsList';
import {
  SaveTweetToCollectionMutation,
  SaveTweetToCollectionMutationVariables,
  SaveArticleToCollectionMutation,
  SaveArticleToCollectionMutationVariables,
  SaveVeraFileToCollectionMutation,
  SaveVeraFileToCollectionMutationVariables,
  SaveGoogleFactCheckToCollectionMutation,
  SaveGoogleFactCheckToCollectionMutationVariables,
} from './query.generated';
import {
  SAVE_TWEET_TO_COLLECTION,
  SAVE_ARTICLE_TO_COLLECTION,
  SAVE_VERA_FILE_TO_COLLECTION,
  SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION,
} from './query';
import { COLLECTION_CONTENTS_QUERY } from '../../../ColumnContents/query';
import {
  CollectionContent,
  Photo,
  CollectionTweetPhotosCollectionTweetIdFkeyCollectionTweetPhotosCreateInput,
} from '../../../../types.generated';
import { useCollectionsListState } from './CollectionsList/CollectionsListState';
import MutationLoader from '../../../Common/MutationLoader';

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

const AddToCollectionButton = ({ data }: CollectionContentProps) => {
  const classes = useStyles();
  const { collectionListState } = useCollectionsListState();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const [saveTweetToCollection, { loading: mutationTweetLoading }] =
    useMutation<
      SaveTweetToCollectionMutation,
      SaveTweetToCollectionMutationVariables
    >(
      SAVE_TWEET_TO_COLLECTION,
      data.__typename === 'CollectionTweet'
        ? {
            variables: {
              input: {
                collectionTweet: {
                  collectionId: data.collectionId,
                  tweetId: data.tweetId,
                  authorId: data.authorId,
                  text: data.text,
                  name: data.name,
                  profileImageUrl: data.profileImageUrl,
                  username: data.username,
                  verified: data.verified,
                  suggestedKeywords: data.suggestedKeywords,
                  publishedAt: data.publishedAt,
                  photos: {
                    create: data.photos.map(
                      (photo: Photo) =>
                        ({
                          mediaKey: photo.mediaKey,
                          url: photo.url,
                          type: photo.type,
                        } as CollectionTweetPhotosCollectionTweetIdFkeyCollectionTweetPhotosCreateInput)
                    ),
                  },
                },
              },
            },
            onCompleted: () => {
              setIsSubmitting(false);
            },
            refetchQueries: [
              {
                query: COLLECTION_CONTENTS_QUERY,
                variables: { collectionId: collectionListState.collectionId },
              },
            ],
          }
        : {}
    );

  const [saveArticleToCollection, { loading: mutationArticleLoading }] =
    useMutation<
      SaveArticleToCollectionMutation,
      SaveArticleToCollectionMutationVariables
    >(
      SAVE_ARTICLE_TO_COLLECTION,
      data.__typename === 'CollectionArticle'
        ? {
            variables: {
              input: {
                collectionArticle: {
                  collectionId: data.collectionId,
                  title: data.title,
                  description: data.description,
                  publishedAt: data.publishedAt,
                  sourceName: data.sourceName,
                  url: data.url,
                  urlToImage: data.urlToImage,
                  suggestedKeywords: data.suggestedKeywords,
                },
              },
            },
            onCompleted: () => {
              setIsSubmitting(false);
            },
            refetchQueries: [
              {
                query: COLLECTION_CONTENTS_QUERY,
                variables: { collectionId: collectionListState.collectionId },
              },
            ],
          }
        : {}
    );

  const [saveVeraFileToCollection, { loading: mutationVeraFileLoading }] =
    useMutation<
      SaveVeraFileToCollectionMutation,
      SaveVeraFileToCollectionMutationVariables
    >(
      SAVE_VERA_FILE_TO_COLLECTION,
      data.__typename === 'CollectionVeraFile'
        ? {
            variables: {
              input: {
                collectionVeraFile: {
                  collectionId: data.collectionId,
                  author: data.author,
                  category: data.category,
                  date: data.date,
                  dateText: data.dateText,
                  description: data.description,
                  imageStyle: data.imageStyle,
                  imageUrl: data.imageUrl,
                  url: data.url,
                  title: data.title,
                },
              },
            },
            onCompleted: () => {
              setIsSubmitting(false);
            },
            refetchQueries: [
              {
                query: COLLECTION_CONTENTS_QUERY,
                variables: { collectionId: collectionListState.collectionId },
              },
            ],
          }
        : {}
    );

  const [
    saveGoogleFactCheckToCollection,
    { loading: mutationGoogleFactCheckLoading },
  ] = useMutation<
    SaveGoogleFactCheckToCollectionMutation,
    SaveGoogleFactCheckToCollectionMutationVariables
  >(
    SAVE_GOOGLE_FACT_CHECK_TO_COLLECTION,
    data.__typename === 'CollectionGoogleFactCheck'
      ? {
          variables: {
            input: {
              collectionGoogleFactCheck: {
                collectionId: data.collectionId,
                claimDate: data.claimDate,
                claimant: data.claimant,
                createdAt: data.createdAt,
                languageCode: data.languageCode,
                publisherName: data.publisherName,
                publisherSite: data.publisherSite,
                reviewDate: data.reviewDate,
                text: data.text,
                title: data.title,
                textualRating: data.textualRating,
                url: data.url,
              },
            },
          },
          onCompleted: () => {
            setIsSubmitting(false);
          },
          refetchQueries: [
            {
              query: COLLECTION_CONTENTS_QUERY,
              variables: { collectionId: collectionListState.collectionId },
            },
          ],
        }
      : {}
  );

  useEffect(() => {
    if (isSubmitting) {
      if (data.__typename === 'CollectionTweet') saveTweetToCollection();

      if (data.__typename === 'CollectionArticle') saveArticleToCollection();

      if (data.__typename === 'CollectionVeraFile') saveVeraFileToCollection();

      if (data.__typename === 'CollectionGoogleFactCheck')
        saveGoogleFactCheckToCollection();
    }
  }, [isSubmitting]);

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
            <Button
              onClick={() => {
                handleClickClose();
                setIsSubmitting(true);
              }}
              autoFocus
              data-testid="submit-save"
            >
              {mutationTweetLoading ||
              mutationArticleLoading ||
              mutationVeraFileLoading ||
              mutationGoogleFactCheckLoading ? (
                <MutationLoader color="primary" />
              ) : (
                <div />
              )}
              {mutationTweetLoading ||
              mutationArticleLoading ||
              mutationVeraFileLoading ||
              mutationGoogleFactCheckLoading
                ? 'Saving'
                : 'Save'}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToCollectionButton;
