/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Category } from '../../../types.generated';

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
}));

const AddNewsAPIFeedForm = () => {
  const classes = useStyles();

  const [category, setCategory] = useState('');

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
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel>Categories</InputLabel>
        <Select
          label="Category"
          value={category}
          // onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value="Business">Business</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Health">Health</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Sports">Sports</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
        </Select>
      </FormControl>
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

export default AddNewsAPIFeedForm;
