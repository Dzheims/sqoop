/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, InputBase, Paper } from '@material-ui/core';
import addDays from 'date-fns/addDays';
import {
  Box,
  Autocomplete,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from './SearchStyles';
import { Category } from '../../../../types.generated';
import SearchNewsAPIColumnData from './SearchNewsApiColumnData';
import { ResultsContainer } from '../../../../pages/Boards/ColumnsStyle';
import NewsSourcesData from '../NewsApiFeedForm/NewsSourcesData';
import TwitterSourcesData from '../TwitterFeedForm/TwitterSourcesData';
import { truncateName } from '../../../Common/Functions/Functions';
import SearchAllTweetsColumnData from './SearchTwitterColumnData';

const accordionStyle = {
  backgroundColor: '#f7fafc',
  boxShadow: 'none',
};

const getDaysAfter = (date: Date | null, duration: number) => {
  return date ? addDays(date, duration) : undefined;
};

const Search = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [value, setValue] = React.useState<Date | null>(null);
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

  const getSearchResults = () => {
    if (currentSearch === 'News')
      return (
        <SearchNewsAPIColumnData
          from={null}
          to={null}
          keyword={keyword}
          sources={newsSource.id === '' ? null : newsSource.id}
        />
      );
    if (currentSearch === 'Twitter')
      return (
        <SearchAllTweetsColumnData
          toDate={null}
          fromDate={null}
          keyword={keyword}
          sources={twitterSource.accountUsername}
        />
      );
  };

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
            {disable.twitter ? (
              <div>
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
                      id="News Sources"
                      label="News Sources"
                      placeholder="News Sources"
                      variant="outlined"
                      size="small"
                      required
                      margin="dense"
                      fullWidth
                    />
                  )}
                />
              </div>
            ) : (
              <div>
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
                        <Typography>
                          {truncateName(option.accountName, 25)}
                        </Typography>
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
                      size="small"
                      required
                      margin="dense"
                      fullWidth
                    />
                  )}
                />
              </div>
            )}
            <div className={classes.datePickerContainer}>
              <TextField
                id="Start"
                label="Start Date"
                placeholder="Start Date"
                variant="outlined"
                size="small"
                margin="dense"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                fullWidth
              />
              <Box sx={{ mx: 1 }}> to </Box>
              <TextField
                id="End"
                label="End Date"
                placeholder="End Date"
                variant="outlined"
                size="small"
                margin="dense"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                fullWidth
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
                {getSearchResults()}
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
