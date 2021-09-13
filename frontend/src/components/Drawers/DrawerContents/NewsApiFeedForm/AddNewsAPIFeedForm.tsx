/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {
  CreateNewsFeedMutation,
  CreateNewsFeedMutationVariables,
} from './query.generated';
import { Category, CreateNewsFeedInput } from '../../../../types.generated';
import CREATE_NEWS_FEED from './query';

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

const AddNewsAPIFeedForm = () => {
  const classes = useStyles();

  const [category, setCategory] = useState('');

  const [newsFeedForm, setNewsFeedForm] = useState<CreateNewsFeedInput>({
    newsFeed: {
      title: '',
      category: undefined,
      country: '',
      keyword: '',
      sources: '',
    },
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setNewsFeedForm({
      ...newsFeedForm,
      newsFeed: {
        title: value,
        category: newsFeedForm.newsFeed.category,
        country: newsFeedForm.newsFeed.country,
        keyword: newsFeedForm.newsFeed.keyword,
        sources: newsFeedForm.newsFeed.sources,
      },
    });
  };

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setNewsFeedForm({
      ...newsFeedForm,
      newsFeed: {
        title: newsFeedForm.newsFeed.title,
        category: newsFeedForm.newsFeed.category,
        country: newsFeedForm.newsFeed.country,
        keyword: value,
        sources: newsFeedForm.newsFeed.sources,
      },
    });
  };

  const onSourcesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setNewsFeedForm({
      ...newsFeedForm,
      newsFeed: {
        title: newsFeedForm.newsFeed.title,
        category: newsFeedForm.newsFeed.category,
        country: newsFeedForm.newsFeed.country,
        keyword: newsFeedForm.newsFeed.keyword,
        sources: value,
      },
    });
  };

  const onCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setNewsFeedForm({
      ...newsFeedForm,
      newsFeed: {
        title: newsFeedForm.newsFeed.title,
        country: value,
        category: newsFeedForm.newsFeed.category,
        keyword: newsFeedForm.newsFeed.keyword,
        sources: newsFeedForm.newsFeed.sources,
      },
    });
  };

  const onCategoryChange = (value: Category) => {
    setNewsFeedForm({
      ...newsFeedForm,
      newsFeed: {
        title: newsFeedForm.newsFeed.title,
        category: value,
        keyword: newsFeedForm.newsFeed.keyword,
        country: newsFeedForm.newsFeed.country,
        sources: newsFeedForm.newsFeed.sources,
      },
    });
  };

  const [createNewsFeed] = useMutation<
    CreateNewsFeedMutation,
    CreateNewsFeedMutationVariables
  >(CREATE_NEWS_FEED, {
    variables: {
      input: {
        newsFeed: {
          title: newsFeedForm.newsFeed.title,
          category: newsFeedForm.newsFeed.category,
          country: newsFeedForm.newsFeed.country,
          keyword: newsFeedForm.newsFeed.keyword,
          sources: newsFeedForm.newsFeed.sources,
        },
      },
    },
  });

  const handleSubmit = () => {
    createNewsFeed();
  };

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
        onChange={onTitleChange}
      />
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel>Categories</InputLabel>
        <Select
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category)}
        >
          <MenuItem value={Category.Business}>Business</MenuItem>
          <MenuItem value={Category.Entertainment}>Entertainment</MenuItem>
          <MenuItem value={Category.General}>General</MenuItem>
          <MenuItem value={Category.Health}>Health</MenuItem>
          <MenuItem value={Category.Science}>Science</MenuItem>
          <MenuItem value={Category.Sports}>Sports</MenuItem>
          <MenuItem value={Category.Technology}>Technology</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="Country"
        label="Country"
        placeholder="Country"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={onCountryChange}
      />
      <TextField
        id="Keywords"
        label="Keywords"
        placeholder="Keywords"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={onKeywordChange}
      />
      <TextField
        id="Sources"
        label="Sources"
        placeholder="Sources"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        onChange={onSourcesChange}
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

export default AddNewsAPIFeedForm;
