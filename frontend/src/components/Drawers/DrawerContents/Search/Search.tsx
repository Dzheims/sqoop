/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer, useState } from 'react';
import { Button, InputBase, Paper } from '@material-ui/core';
import {
  Box,
  Autocomplete,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  TextField,
} from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from './SearchStyles';
import SearchNewsAPIColumnData from './SearchNewsApiColumnData';
import { ResultsContainer } from '../../../../pages/Boards/ColumnsStyle';
import NewsSourcesData from '../NewsApiFeedForm/NewsSourcesData';
import TwitterSourcesData from '../TwitterFeedForm/TwitterSourcesData';
import {
  convertDate,
  get30DaysPriorDate,
  truncateName,
} from '../../../Common/Functions/Functions';
import SearchAllTweetsColumnData from './SearchTwitterColumnData';

const accordionStyle = {
  backgroundColor: '#f7fafc',
  boxShadow: 'none',
};

interface DateProps {
  from: null | string;
  to: null | string;
}

const Search = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [currentSearch, setCurrentSearch] = useState('News');
  const [search, setSearch] = useState(false);
  const [date, setDate] = useState<DateProps>({
    from: null,
    to: null,
  });
  const [sources, setSources] = useState({
    twitterSource: { accountName: '', accountUsername: '' },
    newsSource: { name: '', id: '' },
  });

  const getSearchResults = (searchType: string) => {
    switch (searchType) {
      case 'Twitter':
        return (
          <SearchAllTweetsColumnData
            keyword={keyword}
            sources={
              !sources.twitterSource.accountUsername.length
                ? null
                : sources.twitterSource.accountUsername
            }
            fromDate={convertDate(date.from)}
            toDate={convertDate(date.to)}
          />
        );
      case 'News':
        return (
          <SearchNewsAPIColumnData
            from={date.from}
            to={date.to}
            keyword={keyword}
            sources={
              !sources.newsSource.id.length ? null : sources.newsSource.id
            }
          />
        );
    }
  };

  const dateRange = {
    min: get30DaysPriorDate(),
    max: new Date().toISOString().slice(0, 10),
  };

  const searchOptions = [
    {
      buttonTitle: 'News',
      onClick: () => {
        setCurrentSearch('News');
      },
    },
    {
      buttonTitle: 'Twitter',
      onClick: () => {
        setCurrentSearch('Twitter');
      },
    },
  ];

  useEffect(() => {
    keyword;
    search;
  });

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
            key={value.buttonTitle}
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            data-testid="expandFilters"
          >
            <div className={classes.summaryContainer}>
              <FilterListIcon className={classes.filterIcon} />
              <Typography className={classes.filterText}>Filters</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {currentSearch === 'News' ? (
              <div>
                <Autocomplete
                  id="Sources"
                  disableClearable
                  value={sources.newsSource}
                  onChange={(event, newValue) => {
                    setSources({
                      twitterSource: {
                        accountName: sources.twitterSource.accountName,
                        accountUsername: sources.twitterSource.accountUsername,
                      },
                      newsSource: { name: newValue.name, id: newValue.id },
                    });
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
                  value={sources.twitterSource}
                  onChange={(event, newValue) => {
                    setSources({
                      twitterSource: {
                        accountName: newValue.accountName,
                        accountUsername: newValue.accountUsername,
                      },
                      newsSource: {
                        name: sources.newsSource.name,
                        id: sources.newsSource.id,
                      },
                    });
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
            <TextField
              id="Start"
              label="Start Date"
              placeholder="Start Date"
              variant="outlined"
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true, required: true }}
              InputProps={{
                style: { color: 'gray' },
                inputProps: dateRange,
              }}
              type="date"
              onChange={(e) => {
                setDate({ from: e.target.value, to: date.to });
              }}
              fullWidth
            />
            <TextField
              id="End"
              label="End Date"
              placeholder="End Date"
              variant="outlined"
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true, required: true }}
              InputProps={{
                style: { color: 'gray' },
                inputProps: dateRange,
              }}
              onChange={(e) => {
                setDate({ from: date.from, to: e.target.value });
              }}
              type="date"
              fullWidth
            />
          </AccordionDetails>
        </Accordion>
      </div>
      {search ? (
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div className={classes.container}>
                <ResultsContainer
                  className={classes.resultsContainer}
                  {...provided.droppableProps}
                  isDragging={snapshot.isDraggingOver}
                >
                  {getSearchResults(currentSearch)}
                </ResultsContainer>
              </div>
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
