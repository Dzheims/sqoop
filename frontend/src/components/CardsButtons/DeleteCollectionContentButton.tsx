/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  DeleteArticleContentMutation,
  DeleteTweetContentMutation,
  DeleteVeraFileContentMutation,
  DeleteTweetContentMutationVariables,
  DeleteArticleContentMutationVariables,
  DeleteVeraFileContentMutationVariables,
  DeleteGoogleFactCheckContentMutation,
  DeleteGoogleFactCheckContentMutationVariables,
} from '../Collections/query.generated';
import {
  DELETE_COLLECTION_CONTENT_TWEET,
  DELETE_COLLECTION_CONTENT_VERA_FILE,
  DELETE_COLLECTION_CONTENT_ARTICLE,
  DELETE_COLLECTION_CONTENT_GOOGLE_FACT_CHECK,
} from '../Collections/query';
import { CollectionContent } from '../../types.generated';
import { COLLECTION_CONTENTS_QUERY, GET_COLUMNS_QUERY } from '../Columns/query';
import MutationLoader from '../Common/MutationLoader';

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

const DeleteCollectionContentButton = ({ data }: CollectionContentProps) => {
  const classes = useStyles();
  const [warningDelete, setWarningDelete] = useState(false);
  const [proceedDelete, setProceedDelete] = useState(false);

  const handleCloseDialog = () => {
    setWarningDelete(false);
  };

  const [deleteArticle, { loading: mutationArticleLoading }] = useMutation<
    DeleteArticleContentMutation,
    DeleteArticleContentMutationVariables
  >(DELETE_COLLECTION_CONTENT_ARTICLE, {
    variables: {
      id: data.id,
    },
    onCompleted: () => {
      setProceedDelete(false);
    },
    refetchQueries: [
      {
        query: COLLECTION_CONTENTS_QUERY,
        variables: { collectionId: data.collectionId },
      },
    ],
  });

  const [deleteTweet, { loading: mutationTweetLoading }] = useMutation<
    DeleteTweetContentMutation,
    DeleteTweetContentMutationVariables
  >(DELETE_COLLECTION_CONTENT_TWEET, {
    variables: {
      id: data.id,
    },
    onCompleted: () => {
      setProceedDelete(false);
    },
    refetchQueries: [
      {
        query: COLLECTION_CONTENTS_QUERY,
        variables: { collectionId: data.collectionId },
      },
    ],
  });

  const [deleteVeraFilesContent, { loading: mutationVeraFilesLoading }] =
    useMutation<
      DeleteVeraFileContentMutation,
      DeleteVeraFileContentMutationVariables
    >(DELETE_COLLECTION_CONTENT_VERA_FILE, {
      variables: {
        id: data.id,
      },
      onCompleted: () => {
        setProceedDelete(false);
      },
      refetchQueries: [
        {
          query: COLLECTION_CONTENTS_QUERY,
          variables: { collectionId: data.collectionId },
        },
      ],
    });

  const [
    deleteGoogleFactCheckContent,
    { loading: mutationGoogleFactCheckLoading },
  ] = useMutation<
    DeleteGoogleFactCheckContentMutation,
    DeleteGoogleFactCheckContentMutationVariables
  >(DELETE_COLLECTION_CONTENT_GOOGLE_FACT_CHECK, {
    variables: {
      id: data.id,
    },
    onCompleted: () => {
      setProceedDelete(false);
    },
    refetchQueries: [
      {
        query: COLLECTION_CONTENTS_QUERY,
        variables: { collectionId: data.collectionId },
      },
    ],
  });

  useEffect(() => {
    if (proceedDelete) {
      if (data.__typename === 'CollectionTweet') {
        deleteTweet();
      }
      if (data.__typename === 'CollectionArticle') {
        deleteArticle();
      }
      if (data.__typename === 'CollectionVeraFile') {
        deleteVeraFilesContent();
      }
      if (data.__typename === 'CollectionGoogleFactCheck') {
        deleteGoogleFactCheckContent();
      }
    }
  }, [proceedDelete]);

  const handleMutationLoading = () => {};

  const handleDelete = () => {
    setWarningDelete(true);
  };

  return (
    <div>
      <div className={classes.root}>
        <IconButton
          onClick={() => {
            handleDelete();
          }}
          data-testid="remove-from-collections"
        >
          <CloseIcon
            sx={{ height: '15px', width: '15px' }}
            className={classes.icon}
          />
        </IconButton>
      </div>
      <Dialog
        data-testid="warning"
        open={warningDelete}
        onClose={handleCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this article from the collection?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-testid="cancel-delete" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            data-testid="agree-delete"
            onClick={() => {
              setWarningDelete(false);
              setProceedDelete(true);
            }}
            autoFocus
          >
            {mutationArticleLoading ||
            mutationTweetLoading ||
            mutationVeraFilesLoading ||
            mutationGoogleFactCheckLoading ? (
              <MutationLoader color="primary" />
            ) : (
              <div />
            )}
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCollectionContentButton;
