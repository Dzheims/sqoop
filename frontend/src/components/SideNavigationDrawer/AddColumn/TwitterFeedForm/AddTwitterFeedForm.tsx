/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { Autocomplete, TextField } from '@mui/material';
import {
  CreateTwitterFeedMutation,
  CreateTwitterFeedMutationVariables,
} from './query.generated';
import { CreateTwitterFeedInput } from '../../../../types.generated';
import { CREATE_TWITTER_FEED } from './query';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import accountSources from './SourcesList';
import currentUserId from '../../../../authentication/currentUserId';
import {
  NavDrawerState,
  useNavDrawerState,
} from '../../../SideNavigation/SideNavigationDrawerState';
import { validateTitle } from '../FormValidation/FormValidation';
import { scrollToElement } from '../../../Common/Functions/Functions';
import MutationLoader from '../../../Common/MutationLoader';

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
  formMessage: {
    color: 'gray',
    fontSize: '12px',
    margin: '5px 0 0 5px',
  },
}));

interface SuccessAlert {
  type: string;
  feedTitle: string;
  success: boolean;
}

interface ParentState {
  snackbarStateChanger: Dispatch<SetStateAction<SuccessAlert>>;
}

const AddTwitterFeedForm = ({ snackbarStateChanger }: ParentState) => {
  const history = useHistory();
  const classes = useStyles();
  const [source, setSource] = useState({ label: '', username: '' });
  const { drawerState, setDrawerState } = useNavDrawerState();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState<string>('');

  const setErrorInForm = (input: string | undefined): boolean => {
    if (input === '' || input === undefined) return false;
    return true;
  };

  const [twitterFeedForm, setTwitterFeedForm] =
    useState<CreateTwitterFeedInput>({
      twitterFeed: {
        title: '',
        keyword: '',
        sources: null,
      },
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

  const [createFeed, { error, loading: mutationLoading }] = useMutation<
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
      snackbarStateChanger({
        type: 'Twitter feed',
        feedTitle: createTwitterFeed?.twitterFeed?.title as string,
        success: true,
      });
      setdisableCreateButton(true);
      setDrawerState({
        ...drawerState,
        isOpen: false,
        current: '',
      });

      scrollToElement(
        new Date(createTwitterFeed?.twitterFeed?.createdAt).toUTCString()
      );
    },
    onError: () => {},
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  useEffect(() => {
    if (isSubmitting)
      setTitleError(validateTitle(twitterFeedForm.twitterFeed.title, error));
  }, [titleError, error]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    if (twitterFeedForm.twitterFeed.title) {
      createFeed();
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography className={classes.formMessage}>
        Discover news contents in the last 7 days.
      </Typography>
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
        error={setErrorInForm(titleError || '')}
        helperText={titleError}
      />
      <TextField
        id="Keywords"
        label="Keywords"
        placeholder="Keywords"
        variant="outlined"
        margin="dense"
        size="small"
        fullWidth
        onChange={onKeywordChange}
      />
      <Autocomplete
        id="sources"
        disableClearable
        // value={source}
        onChange={(event, newValue) => {
          setSource(newValue);
          onSourcesChange(newValue.username);
        }}
        size="small"
        options={accountSources}
        getOptionLabel={(option) => option.label}
        defaultValue={accountSources[0]}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <div className={classes.options}>
              <Typography>{option.label}</Typography>
              {option.label === 'All Accounts' ? (
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
            fullWidth
            defaultValue="All Accounts"
          />
        )}
      />
      <div className={classes.button}>
        <Button
          fullWidth
          style={{ textTransform: 'none' }}
          type="submit"
          variant="contained"
          color="secondary"
          disabled={disableCreateButton}
          onClick={handleSubmit}
        >
          {mutationLoading && <MutationLoader color="inherit" />}
          {mutationLoading ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </div>
  );
};

export default AddTwitterFeedForm;
