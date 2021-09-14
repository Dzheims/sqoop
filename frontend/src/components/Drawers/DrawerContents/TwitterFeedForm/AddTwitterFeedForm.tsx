import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import {
  CreateTwitterFeedMutation,
  CreateTwitterFeedMutationVariables,
} from './query.generated';
import { CreateTwitterFeedInput } from '../../../../types.generated';
import CREATE_TWITTER_FEED from './query';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
}));

const AddTwitterFeedForm = () => {
  const classes = useStyles();

  const [twitterFeedForm, setTwitterFeedForm] =
    useState<CreateTwitterFeedInput>({
      twitterFeed: {
        keyword: '',
        sources: '',
        title: '',
      },
    });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTwitterFeedForm({
      ...twitterFeedForm,
      twitterFeed: {
        title: value,
      },
    });
  };

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTwitterFeedForm({
      ...twitterFeedForm,
      twitterFeed: {
        title: twitterFeedForm.twitterFeed.title,
        keyword: value,
        sources: twitterFeedForm.twitterFeed.sources,
      },
    });
  };

  const onSourcesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTwitterFeedForm({
      ...twitterFeedForm,
      twitterFeed: {
        title: twitterFeedForm.twitterFeed.title,
        keyword: twitterFeedForm.twitterFeed.keyword,
        sources: value,
      },
    });
  };

  const [createFeed] = useMutation<
    CreateTwitterFeedMutation,
    CreateTwitterFeedMutationVariables
  >(CREATE_TWITTER_FEED, {
    variables: {
      input: {
        twitterFeed: {
          title: twitterFeedForm.twitterFeed.title,
          keyword: twitterFeedForm.twitterFeed.keyword,
          sources: twitterFeedForm.twitterFeed.sources,
        },
      },
    },
  });

  const handleSubmit = () => {
    createFeed();
  };

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
        onChange={onTitleChange}
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

export default AddTwitterFeedForm;
