/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../pages/Boards/ColumnsStyle';
import { GetColumnsQuery } from './query.generated';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {
  DeleteTwitterMutation,
  DeleteTwitterMutationVariables,
  DeleteNewsMutation,
  DeleteNewsMutationVariables,
} from './query.generated';
import {
  DELETE_TWITTER_MUTATION,
  GET_COLUMNS_QUERY,
  DELETE_NEWS_MUTATION,
} from './query';

interface ColumnDataProps {
  data: GetColumnsQuery;
}

const ColumnDeleteWarning = (title: string) => {
  const classes = useStyles();
  const [proceedDelete, setProceedDelete] = useState(false);
  const [warningDelete, setWarningDelete] = useState(false);

  const history = useHistory();
  const onDragEnd = () => {};

  const [deleteTwitterFeed] = useMutation<
    DeleteTwitterMutation,
    DeleteTwitterMutationVariables
  >(DELETE_TWITTER_MUTATION);

  const [deleteNewsFeed] = useMutation<
    DeleteNewsMutation,
    DeleteNewsMutationVariables
  >(DELETE_NEWS_MUTATION);

  // REFACTOR LATER
  const handleDelete = (id: number) => {};

  const handleCloseDialog = () => {
    setWarningDelete(false);
  };

  return (
    <Dialog open={warningDelete} onClose={handleCloseDialog}>
      <DialogTitle>Warning!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{title}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={() => {
            setProceedDelete(true);
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnDeleteWarning;
