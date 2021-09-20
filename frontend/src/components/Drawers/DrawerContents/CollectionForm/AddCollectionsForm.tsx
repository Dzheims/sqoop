/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

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
      />
      <div className={classes.button}>
        <Button type="submit" variant="contained" color="secondary">
          Create
        </Button>
      </div>
    </div>
  );
};

export default AddCollectionForm;
