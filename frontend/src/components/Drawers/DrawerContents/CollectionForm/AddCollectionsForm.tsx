/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
} from './query.generated';
import { CollectionInput } from '../../../../types.generated';
import CREATE_COLLECTION from './query';
import currentUserId from '../../../../authentication/currentUserId';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignItems: 'center',
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
        margin="normal"
        required
        fullWidth
        onChange={onTitleChange}
      />
      <div className={classes.button}>
        <Button
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
