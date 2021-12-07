/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, InputBase, Paper, Chip } from '@material-ui/core';
import VeraFilesData from '../../../FactCheck/VeraFilesData';
import GoogleFactCheckData from '../../../FactCheck/GoogleFactCheckData';

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    maxWidth: '270px',
    margin: '5px 10px 10px 10px',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    width: '250px',
    boxShadow: 'none',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  button: {
    marginLeft: '5px',
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
    marginLeft: '5px',
    textTransform: 'none',
    fontSize: '12px',
    minWidth: 'auto',
    borderRadius: '12px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  resultsContainer: {
    overflow: 'auto',
    maxHeight: '300px',
    padding: '5px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  chipsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
  },
  chips: {
    fontSize: '12px',
    color: 'gray',
    maxWidth: '100px',
    marginLeft: '5px',
    marginTop: '5px',
  },
  suggestedKeyword: {
    padding: '3px',
    fontSize: '11px',
    color: 'gray',
  },
}));

interface FactCheckDrawerContentsProps {
  suggestedKeyWords: string[];
}

const FactCheckDrawerContent = ({
  suggestedKeyWords,
}: FactCheckDrawerContentsProps) => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [search, setSearch] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('Google Fact Check');

  const getSearch = (searchType: string) => {
    if (searchType === 'Google Fact Check')
      return <GoogleFactCheckData keyword={searchKey} />;
    if (searchType === 'Vera Files')
      return <VeraFilesData keyword={searchKey} />;
    return <div />;
  };

  const searchOptions = [
    {
      buttonTitle: 'Google Fact Check',
      onClick: () => {
        setCurrentSearch('Google Fact Check');
      },
    },
    {
      buttonTitle: 'Vera Files',
      onClick: () => {
        setCurrentSearch('Vera Files');
      },
    },
  ];

  useEffect(() => {
    searchKey;
  });

  return (
    <div className={classes.container}>
      <Paper variant="outlined" component="form" className={classes.search}>
        <InputBase
          inputProps={{ 'aria-label': 'Search' }}
          className={classes.input}
          value={searchKey}
          placeholder="Search"
          onChange={(e) => {
            setSearchKey(e.target.value);
            setSearch(false);
            setCurrentSearch(currentSearch);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setSearch(true);
            } else setSearch(false);
          }}
        />
      </Paper>
      <div className={classes.chipsContainer}>
        <Typography className={classes.suggestedKeyword}>
          Suggested Keywords
        </Typography>
        {suggestedKeyWords ? (
          suggestedKeyWords.slice(0, 6).map((keyword: string) => (
            <Chip
              className={classes.chips}
              onClick={() => {
                setSearch(true);
                setSearchKey(keyword);
              }}
              variant="outlined"
              label={keyword}
            />
          ))
        ) : (
          <div />
        )}
      </div>
      <div className={classes.buttonContainer}>
        {searchOptions.map((value) => (
          <Button
            key={value.buttonTitle}
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
      <div className={classes.resultsContainer}>
        {search ? <div>{getSearch(currentSearch)}</div> : <div />}
      </div>
    </div>
  );
};

export default FactCheckDrawerContent;
