/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  InputBase,
  Paper,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { Autocomplete, TextField } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { CategorySharp } from '@material-ui/icons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SearchNewsAPIColumnData from './SearchNewsApiColumnData';
import { Category } from '../../../../types.generated';
import { ResultsContainer } from '../../../../pages/Boards/ColumnsStyle';
import NewsSourcesData from '../NewsApiFeedForm/NewsSourcesData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    alignItems: 'center',
    justify: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.secondary.main,
  },
  filterIcon: {
    color: 'gray',
  },
  filterText: { fontColor: 'gray', fontSize: '14px' },
  summaryContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    width: '260px',
    boxShadow: 'none',
    marginTop: '10px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justify: 'space-between',
  },
  resultsContainer: {
    minHeight: '100px',
    maxHeight: '400px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  formControl: {
    minWidth: 120,
  },
}));

const accordionStyle = {
  backgroundColor: '#f7fafc',
  boxShadow: 'none',
};

const Search = () => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState('GENERAL' as Category);
  const [newsSource, setNewsSource] = useState({
    name: '',
    id: '',
  });

  const submitSearch = () => {
    setSearch(true);
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
          />
          <IconButton onClick={submitSearch} className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
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
            <FormControl
              variant="outlined"
              margin="dense"
              size="small"
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
                  id="Sources"
                  label="Sources"
                  placeholder="Sources"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                />
              )}
            />
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
                <SearchNewsAPIColumnData
                  from={null}
                  to={null}
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
