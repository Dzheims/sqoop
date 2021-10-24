/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import {
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
} from './query.generated';
import { CollectionInput } from '../../../../types.generated';
import CREATE_COLLECTION from './query';
import currentUserId from '../../../../authentication/currentUserId';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import { GET_COLLECTIONS_LIST_QUERY } from '../../../Collections/query';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignItems: 'center',
    maxWidth: '260px',
    margin: '10px',
  },
  formControl: {
    margin: theme.spacing(2, 0, 1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));

interface DrawerState {
  current: string;
  open: boolean;
}

interface SuccessAlert {
  type: string;
  feedTitle: string;
  success: boolean;
}

interface ParentState {
  drawerStateChanger: Dispatch<SetStateAction<DrawerState>>;
  snackbarStateChanger: Dispatch<SetStateAction<SuccessAlert>>;
}

const AddCollectionForm = ({
  drawerStateChanger,
  snackbarStateChanger,
}: ParentState) => {
  const history = useHistory();
  const classes = useStyles();

  const [collectionForm, setCollectionForm] = useState<CollectionInput>({
    title: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState<string>('');

  const setErrorInForm = (input: string | undefined): boolean => {
    if (input === '' || input === undefined) return false;
    return true;
  };

  function validateTitle(title: string) {
    if (!title) {
      return 'Title must not be empty';
    }
    return '';
  }

  const [disableCreateButton, setdisableCreateButton] = useState(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setCollectionForm({
      ...collectionForm,
      title: value,
    });
  };

  const [createNewCollection] = useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(CREATE_COLLECTION, {
    variables: {
      input: {
        collection: {
          title: collectionForm.title,
          userId: currentUserId(),
        },
      },
    },
    onCompleted: ({ createCollection }) => {
      snackbarStateChanger({
        type: 'Collection',
        feedTitle: createCollection?.collection?.title as string,
        success: true,
      });
      setdisableCreateButton(true);
      history.push('/');
      drawerStateChanger({ open: false, current: '' });
    },
    refetchQueries: [
      { query: GET_COLUMNS_QUERY },
      {
        query: GET_COLLECTIONS_LIST_QUERY,
        variables: {
          condition: {
            userId: currentUserId(),
          },
        },
      },
    ],
  });

  useEffect(() => {
    if (isSubmitting) setTitleError(validateTitle(collectionForm.title));
  }, [collectionForm.title, isSubmitting]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (collectionForm.title) {
      createNewCollection();
    }
  };

  return (
    <div className={classes.formContainer}>
      <TextField
        id="CollectionTitle"
        label="Collection Title"
        placeholder="Collection Title"
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        onChange={onTitleChange}
        error={setErrorInForm(titleError || '')}
        helperText={titleError}
      />
      <div className={classes.button}>
        <Button
          fullWidth
          style={{ textTransform: 'none' }}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={disableCreateButton}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddCollectionForm;
