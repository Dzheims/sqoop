/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, InputBase, Paper } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { Title } from '../../../../pages/Boards/ColumnsStyle';
import VeraFactCheckData from '../../../FactCheck/VeraFactCheckData';
import GoogleFactCheckData from '../../../FactCheck/GoogleFactCheckData';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    maxWidth: '270px',
    margin: '10px',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    width: '250px',
    boxShadow: 'none',
    marginTop: '10px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.secondary.main,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  button: {
    marginLeft: '3px',
    textTransform: 'none',
    fontSize: '12px',
    minWidth: 'auto',
    borderRadius: '12px',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'white',
    },
  },
  selectedButton: {
    marginLeft: '3px',
    textTransform: 'none',
    fontSize: '12px',
    minWidth: 'auto',
    borderRadius: '12px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  resultsContainer: {
    overflow: 'auto',
    maxHeight: '400px',
    padding: '8px',
  },
}));

const FactCheckDrawerContent = () => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [search, setSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    component: <GoogleFactCheckData keyword="Latest" />,
    title: 'Google Fact Check',
  });

  const searchOptions = [
    {
      buttonTitle: 'Google Fact Check',
      onClick: () => {
        setCurrentSearch({
          component: <GoogleFactCheckData keyword={searchKey} />,
          title: 'Google Fact Check',
        });
      },
    },
    {
      buttonTitle: 'Vera Files',
      onClick: () => {
        setCurrentSearch({
          component: <VeraFactCheckData keyword={searchKey} />,
          title: 'Vera Files',
        });
      },
    },
  ];

  const submitSearch = () => {
    setSearch(true);
  };

  return (
    <div className={classes.container}>
      {/* <Title>Fact Check</Title> */}
      <Paper variant="outlined" component="form" className={classes.search}>
        <InputBase
          inputProps={{ 'aria-label': 'Search' }}
          className={classes.input}
          value={searchKey}
          placeholder="Search"
          onChange={(e) => {
            setSearchKey(e.target.value);
            setSearch(false);
            setCurrentSearch({
              component: <GoogleFactCheckData keyword={searchKey} />,
              title: 'Google Fact Check',
            });
          }}
        />
        <IconButton onClick={submitSearch} className={classes.iconButton}>
          <Search />
        </IconButton>
      </Paper>
      <div className={classes.buttonContainer}>
        {searchOptions.map((value) => (
          <Button
            role-="button"
            variant="outlined"
            className={
              value.buttonTitle !== currentSearch.title
                ? classes.button
                : classes.selectedButton
            }
            onClick={value.onClick}
          >
            {value.buttonTitle}
          </Button>
        ))}
      </div>
      <div className={classes.resultsContainer}>
        {search ? currentSearch.component : <div />}
      </div>
    </div>
  );
};

export default FactCheckDrawerContent;
