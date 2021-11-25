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
} from '../Collections/query.generated';
import {
  DELETE_COLLECTION_CONTENT_TWEET,
  DELETE_COLLECTION_CONTENT_VERA_FILE,
  DELETE_VERA_FILE_CONTENT,
} from '../Collections/query';
import { CollectionContent } from '../../types.generated';

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

const DeleteCollectionContentButton = () => {
  const classes = useStyles();
  const [warningDelete, setWarningDelete] = useState(false);
  const [proceedDelete, setProceedDelete] = useState(false);

  const handleCloseDialog = () => {
    setWarningDelete(false);
  };

  useEffect(() => {
    if (proceedDelete) {
      console.log('deleted');
    }
  }, [proceedDelete]);

  const handleDelete = () => {
    console.log('button fired');
    setWarningDelete(true);
  };

  return (
    <div>
      <div className={classes.root}>
        <IconButton
          onClick={() => {
            handleDelete();
          }}
        >
          <CloseIcon
            sx={{ height: '20px', width: '20px' }}
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
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCollectionContentButton;
