/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@material-ui/core';
import {
  Alert,
  IconButton,
  AlertTitle,
  Autocomplete,
  TextField,
} from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import {
  CreateNewsFeedMutation,
  CreateNewsFeedMutationVariables,
} from './query.generated';
import { Category, CreateNewsFeedInput } from '../../../../types.generated';
import CREATE_NEWS_FEED from './query';
import { GET_COLUMNS_QUERY } from '../../../Columns/query';
import countries from './CountriesList';
import currentUserId from '../../../../authentication/currentUserId';
import NavDrawer from '../../../Navigation/NavDrawer';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignItems: 'center',
    maxWidth: '260px',
    margin: '10px',
  },
  formControl: {
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

  flags: {
    marginRight: '5px',
  },
}));

interface FormsDisabled {
  category: boolean;
  country: boolean;
  sources: boolean;
}

interface DrawerState {
  current: string;
  open: boolean;
}

interface SuccessAlert {
  type: string;
  feedTitle: string;
  success: boolean;
}

interface ParentState {
  drawerStateChanger: Dispatch<SetStateAction<DrawerState>>;
  snackbarStateChanger: Dispatch<SetStateAction<SuccessAlert>>;
}

const AddNewsAPIFeedForm = ({
  drawerStateChanger,
  snackbarStateChanger,
}: ParentState) => {
  const classes = useStyles();
  const history = useHistory();
  const [country, setCountry] = useState({ code: '', label: '' });

  const [newsFeedForm, setNewsFeedForm] = useState<CreateNewsFeedInput>({
    newsFeed: {
      title: '',
      category: undefined,
      country: '',
      keyword: '',
      sources: '',
    },
  });

  const [disableForm, setDisableForm] = useState<FormsDisabled>({
    category: false,
    country: false,
    sources: false,
  });

  const [disableCreateButton, setdisableCreateButton] = useState(false);

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

  useEffect(() => {
    if (newsFeedForm.newsFeed.sources) {
      setDisableForm({ ...disableForm, category: true, country: true });
    } else if (
      newsFeedForm.newsFeed.country ||
      newsFeedForm.newsFeed.category
    ) {
      setDisableForm({ ...disableForm, sources: true });
    } else {
      setDisableForm({
        ...disableForm,
        sources: false,
        category: false,
        country: false,
      });
    }
  }, [newsFeedForm.newsFeed]);

  const onCountryChange = (value: string) => {
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

  const [createFeed] = useMutation<
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
          userId: currentUserId(),
        },
      },
    },
    onCompleted: ({ createNewsFeed }) => {
      snackbarStateChanger({
        type: 'News feed',
        feedTitle: createNewsFeed?.newsFeed?.title as string,
        success: true,
      });
      setdisableCreateButton(true);
      history.push('/');
      drawerStateChanger({ open: false, current: '' });
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  const handleSubmit = () => {
    createFeed();
  };
  const handleClose = () => {};

  return (
    <div className={classes.formContainer}>
      <TextField
        id="FeedTitle"
        label="Feed Title"
        placeholder="Feed Title"
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        onChange={onTitleChange}
      />
      <FormControl
        variant="outlined"
        margin="dense"
        size="small"
        fullWidth
        className={classes.formControl}
        disabled={disableForm.category}
      >
        <InputLabel>Categories</InputLabel>
        <Select
          defaultValue=""
          label="Category"
          value={newsFeedForm.newsFeed.category}
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
      <Autocomplete
        id="countries"
        disableClearable
        value={country}
        onChange={(event, newValue) => {
          setCountry(newValue);
          onCountryChange(newValue.code);
        }}
        size="small"
        options={countries}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <img
              className={classes.flags}
              alt=""
              src={`https://flagcdn.com/w20/${option.code}.png`}
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            disabled={disableForm.country}
            id="Country"
            label="Country"
            placeholder="Country"
            variant="outlined"
            margin="dense"
            size="small"
            required
            fullWidth
          />
        )}
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
      <TextField
        disabled={disableForm.sources}
        id="Sources"
        label="Sources"
        placeholder="Sources"
        variant="outlined"
        margin="dense"
        size="small"
        required
        fullWidth
        onChange={onSourcesChange}
      />
      <div className={classes.button}>
        <Button
          style={{ textTransform: 'none', borderRadius: '12px' }}
          disabled={disableCreateButton}
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
