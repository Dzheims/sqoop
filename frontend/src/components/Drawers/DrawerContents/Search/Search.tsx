/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Button,
  InputBase,
  Paper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Box,
} from '@material-ui/core';
import {
  Autocomplete,
  TextField,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from './SearchStyles';
import NewsAPIColumnData from '../../../../pages/Boards/NewsAPIColumnData';
import {
  Category,
  TwitterLocalSourcesOrderBy,
} from '../../../../types.generated';
import { ResultsContainer } from '../../../../pages/Boards/ColumnsStyle';
import NewsSourcesData from '../NewsApiFeedForm/NewsSourcesData';
import TwitterSourcesData from '../TwitterFeedForm/TwitterSourcesData';

const accordionStyle = {
  backgroundColor: '#f7fafc',
  boxShadow: 'none',
};

const Search = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState('GENERAL' as Category);
  const [currentSearch, setCurrentSearch] = useState('News');
  const [disable, setDisable] = useState({ news: false, twitter: true });
  const [newsSource, setNewsSource] = useState({
    name: '',
    id: '',
  });
  const [twitterSource, setTwitterSource] = useState({
    accountName: '',
    accountUsername: '',
  });

  const searchOptions = [
    {
      buttonTitle: 'News',
      onClick: () => {
        setCurrentSearch('News');
        setDisable({ news: false, twitter: true });
      },
    },
    {
      buttonTitle: 'Twitter',
      onClick: () => {
        setCurrentSearch('Twitter');
        setDisable({ news: true, twitter: false });
      },
    },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <Paper variant="outlined" component="form" className={classes.search}>
          <InputBase
            inputProps={{ 'aria-label': 'Search' }}
            className={classes.input}
            placeholder="Search"
            onChange={(e) => {
              setKeyword(e.target.value);
              setSearch(false);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setSearch(true);
              } else setSearch(false);
            }}
          />
        </Paper>
      </div>
      <div className={classes.buttonContainer}>
        {searchOptions.map((value) => (
          <Button
            role-="button"
            variant="outlined"
            className={
              value.buttonTitle !== currentSearch
                ? classes.button
                : classes.selectedButton
            }
            onClick={value.onClick}
          >
            {value.buttonTitle}
          </Button>
        ))}
      </div>
      <div>
        <Accordion style={accordionStyle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.summaryContainer}>
              <FilterListIcon className={classes.filterIcon} />
              <Typography className={classes.filterText}>Filters</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <FormControl
                variant="outlined"
                margin="dense"
                size="small"
                disabled={disable.news}
                fullWidth
                className={classes.formControl}
              >
                <InputLabel>Categories</InputLabel>
                <Select
                  defaultValue=""
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  <MenuItem value={Category.Business}>Business</MenuItem>
                  <MenuItem value={Category.Entertainment}>
                    Entertainment
                  </MenuItem>
                  <MenuItem value={Category.General}>General</MenuItem>
                  <MenuItem value={Category.Health}>Health</MenuItem>
                  <MenuItem value={Category.Science}>Science</MenuItem>
                  <MenuItem value={Category.Sports}>Sports</MenuItem>
                  <MenuItem value={Category.Technology}>Technology</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                id="Sources"
                disableClearable
                disabled={disable.news}
                value={newsSource}
                onChange={(event, newValue) => {
                  setNewsSource({ name: newValue.name, id: newValue.id });
                }}
                size="small"
                options={NewsSourcesData() || []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="News Sourcesces"
                    label="News Sources"
                    placeholder="News Sources"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                id="sources"
                disableClearable
                value={twitterSource}
                disabled={disable.twitter}
                onChange={(event, newValue) => {
                  setTwitterSource(newValue);
                }}
                size="small"
                options={TwitterSourcesData() || []}
                getOptionLabel={(option) => option.accountName}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <div className={classes.options}>
                      <Typography>{option.accountName}</Typography>
                      <Typography className={classes.optionsUsername}>
                        @{option.accountUsername}
                      </Typography>
                    </div>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="Twitter Sources"
                    label="Twitter Sources"
                    placeholder="Twitter Sources"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                  />
                )}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      {search ? (
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ResultsContainer
                // ref={provided.innerRef}
                className={classes.resultsContainer}
                {...provided.droppableProps}
                isDragging={snapshot.isDraggingOver}
              >
                <NewsAPIColumnData
                  country=""
                  category={category as Category}
                  keyword={keyword}
                  sources={newsSource.id === '' ? null : newsSource.id}
                />
              </ResultsContainer>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Search;
