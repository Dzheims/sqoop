import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formContainer: {
    alignItems: 'center',
  },
}));

const AddTwitterFeedForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <TextField
        id="Title"
        label="Feed Title"
        placeholder="Feed Title"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <TextField
        id="Keywords"
        label="Keywords"
        placeholder="Keywords"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
      <TextField
        id="Sources"
        label="Sources"
        placeholder="Sources"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
    </div>
  );
};

export default AddTwitterFeedForm;
