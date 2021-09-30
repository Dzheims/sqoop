/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { Alert, AlertTitle, Autocomplete } from '@mui/material';
import {
  CreateTwitterFeedMutation,
  CreateTwitterFeedMutationVariables,
} from './query.generated';
import { CreateTwitterFeedInput } from '../../../../types.generated';
import CREATE_TWITTER_FEED from './query';
import GET_COLUMNS_QUERY from '../../../Columns/query';
import accountSources from './SourcesList';
import currentUserId from '../../../../authentication/currentUserId';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignItems: 'center',
    maxWidth: '260px',
    margin: '10px',
  },
  button: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  alert: {
    marginTop: theme.spacing(5),
  },
  options: {
    display: 'block',
  },
  optionsUsername: { fontSize: '14px', color: 'gray' },
}));

interface SuccessAlert {
  feedTitle: string;
  success: boolean;
}

const AddTwitterFeedForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [source, setSource] = useState({ label: '', username: '' });

  const [twitterFeedForm, setTwitterFeedForm] =
    useState<CreateTwitterFeedInput>({
      twitterFeed: {
        title: '',
        keyword: '',
        sources: null,
      },
    });

  const [successAlert, setSuccessAlert] = useState<SuccessAlert>({
    feedTitle: '',
    success: false,
  });
  const [disableCreateButton, setdisableCreateButton] = useState(false);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setTwitterFeedForm({
      ...twitterFeedForm,
      twitterFeed: {
        title: value,
        keyword: twitterFeedForm.twitterFeed.keyword,
        sources: twitterFeedForm.twitterFeed.sources,
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

  const onSourcesChange = (value: string) => {
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
          userId: currentUserId(),
        },
      },
    },
    onCompleted: ({ createTwitterFeed }) => {
      setSuccessAlert({
        ...successAlert,
        feedTitle: createTwitterFeed?.twitterFeed?.title as string,
        success: true,
      });
      setdisableCreateButton(true);
      history.push('/');
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
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
        margin="dense"
        size="small"
        required
        fullWidth
        onChange={onTitleChange}
      />
      <TextField
        id="Keywords"
        label="Keywords"
        placeholder="Keywords"
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        onChange={onKeywordChange}
      />
      <Autocomplete
        id="sources"
        disableClearable
        value={source}
        onChange={(event, newValue) => {
          setSource(newValue);
          onSourcesChange(newValue.username);
        }}
        size="small"
        options={accountSources}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <div className={classes.options}>
              <Typography>{option.label}</Typography>
              {option.label === 'All accounts' ? (
                <Typography>{option.username}</Typography>
              ) : (
                <Typography className={classes.optionsUsername}>
                  @{option.username}
                </Typography>
              )}
            </div>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            id="Sources"
            label="Sources"
            placeholder="Sources"
            variant="outlined"
            margin="dense"
            size="small"
            required
            fullWidth
          />
        )}
      />
      <div className={classes.button}>
        <Button
          style={{ textTransform: 'none', borderRadius: '12px' }}
          type="submit"
          variant="contained"
          color="secondary"
          disabled={disableCreateButton}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
      {successAlert.success ? (
        <Alert severity="success" className={classes.alert}>
          <AlertTitle>Success</AlertTitle>
          Feed <strong>{successAlert.feedTitle}</strong> was created —{' '}
          <strong>check it out!</strong>
        </Alert>
      ) : (
        <div />
      )}
    </div>
  );
};

export default AddTwitterFeedForm;
