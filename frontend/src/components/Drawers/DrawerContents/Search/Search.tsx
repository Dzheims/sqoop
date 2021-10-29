/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
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

const Search = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('News');
  const [twitterDate, setTwitterDate] = useState({ from: '', to: '' });
  const [newsDate, setNewsDate] = useState({ from: '', to: '' });
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

  useEffect(() => {
    disable;
  });

  const getSearchResults = () => {
    if (currentSearch === 'News')
      return (
        <SearchNewsAPIColumnData
          from={newsDate.from}
          to={newsDate.to}
          keyword={keyword}
          sources={newsSource.id === '' ? null : newsSource.id}
        />
      );
    if (currentSearch === 'Twitter')
      return (
        <SearchAllTweetsColumnData
          toDate={
            twitterDate.to === ''
              ? null
              : twitterDate.to.replace(/-/g, '') + '0000'
          }
          fromDate={
            twitterDate.from === ''
              ? null
              : twitterDate.from.replace(/-/g, '') + '0000'
          }
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
            <TextField
              id="Start"
              label="Start Date"
              placeholder="Start Date"
              variant="outlined"
              size="small"
              margin="dense"
              InputLabelProps={{ shrink: true, required: true }}
              InputProps={{ style: { color: 'gray' } }}
              type="date"
              onChange={(e) => {
                currentSearch === 'News'
                  ? setNewsDate({ from: e.target.value, to: newsDate.to })
                  : setTwitterDate({
                      from: e.target.value,
                      to: twitterDate.to,
                    });
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
              InputProps={{ style: { color: 'gray' } }}
              onChange={(e) => {
                currentSearch === 'News'
                  ? setNewsDate({ from: newsDate.from, to: e.target.value })
                  : setTwitterDate({
                      from: twitterDate.from,
                      to: e.target.value,
                    });
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
                  // ref={provided.innerRef}
                  className={classes.resultsContainer}
                  {...provided.droppableProps}
                  isDragging={snapshot.isDraggingOver}
                >
                  {getSearchResults()}
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
