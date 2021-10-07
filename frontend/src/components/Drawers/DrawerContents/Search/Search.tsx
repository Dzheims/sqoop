/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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
  filterContainer: {
    marginTop: '5px',
  },
}));

const accordionStyle = { backgroundColor: '#f7fafc', boxShadow: 'none' };

const Search = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);

  const filtersOnClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <Paper variant="outlined" component="form" className={classes.search}>
          <InputBase
            inputProps={{ 'aria-label': 'Search' }}
            className={classes.input}
            placeholder="Search"
            onChange={() => {}}
          />
          <IconButton onClick={() => {}} className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <IconButton onClick={filtersOnClick} className={classes.iconButton}>
          <FilterListIcon />
        </IconButton>
      </div>
      {showFilters ? (
        <div className={classes.filterContainer}>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>Sources</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Sources Here</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={accordionStyle}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
            >
              <Typography>Categories</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Categories Here</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Search;
