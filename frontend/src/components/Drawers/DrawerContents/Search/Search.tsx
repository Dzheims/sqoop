/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, InputBase, Paper, Chip } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    width: '280px',
    boxShadow: 'none',
    marginTop: '10px',
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant="outlined" component="form" className={classes.search}>
        <InputBase
          inputProps={{ 'aria-label': 'Search' }}
          className={classes.input}
          placeholder="Search"
          onChange={() => {}}
        />
        <IconButton onClick={() => {}} className={classes.iconButton}>
          <Search />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;
