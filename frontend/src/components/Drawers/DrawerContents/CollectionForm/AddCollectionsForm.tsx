/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
} from './query.generated';
import { CollectionInput } from '../../../../types.generated';
import CREATE_COLLECTION from './query';
import currentUserId from '../../../../authentication/currentUserId';
import GET_COLUMNS_QUERY from '../../../Columns/query';

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

const AddCollectionForm = () => {
  const history = useHistory();
  const classes = useStyles();

  const [collectionForm, setCollectionForm] = useState<CollectionInput>({
    title: '',
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setCollectionForm({
      ...collectionForm,
      title: value,
    });
  };

  const [createCollection] = useMutation<
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
    onCompleted: () => {
      history.push('/');
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  const handleSubmit = () => {
    createCollection();
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
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddCollectionForm;
