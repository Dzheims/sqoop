/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { Dispatch, SetStateAction, useState } from 'react';
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

interface SuccessAlert {
  feedTitle: string;
  success: boolean;
}
interface DrawerState {
  current: string;
  open: boolean;
}

interface ParentState {
  stateChanger: Dispatch<SetStateAction<DrawerState>>;
}

const AddCollectionForm = ({ stateChanger }: ParentState) => {
  const history = useHistory();
  const classes = useStyles();

  const [collectionForm, setCollectionForm] = useState<CollectionInput>({
    title: '',
  });

  const [successAlert, setSuccessAlert] = useState<SuccessAlert>({
    feedTitle: '',
    success: false,
  });
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
      setSuccessAlert({
        ...successAlert,
        feedTitle: createCollection?.collection?.title as string,
        success: true,
      });
      setdisableCreateButton(true);
      history.push('/');
      stateChanger({ open: false, current: '' });
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  const handleSubmit = () => {
    createNewCollection();
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
      />
      <div className={classes.button}>
        <Button
          style={{ textTransform: 'none', borderRadius: '12px' }}
          type="submit"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={disableCreateButton}
        >
          Create
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={successAlert.success}
        autoHideDuration={5000}
      >
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessAlert({ ...successAlert, success: false });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Feed <strong>{successAlert.feedTitle}</strong> was created
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddCollectionForm;
