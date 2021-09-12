import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formContainer: {
    alignItems: 'center',
  },
}));

const AddNewsAPIFeedForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <TextField
        id="FeedTitle"
        label="Feed Title"
        placeholder="Feed Title"
        variant="outlined"
        margin="normal"
        required
        fullWidth
      />
    </div>
  );
};

export default AddNewsAPIFeedForm;
