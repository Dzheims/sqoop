/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, InputBase, Paper, Chip } from '@material-ui/core';
import ScrollContainer from 'react-indiana-drag-scroll';
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
    maxHeight: '340px',
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
    marginTop: '5px',
    marginLeft: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chips: {
    fontSize: '12px',
    color: 'gray',
    maxWidth: '100px',
  },
}));

interface FactCheckDrawerContentsProps {
  suggestedKeyWords: any;
}

const FactCheckDrawerContent = ({
  suggestedKeyWords,
}: FactCheckDrawerContentsProps) => {
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
      <ScrollContainer className="scroll-container">
        <div className={classes.chipsContainer}>
          {suggestedKeyWords.slice(0, 5).map((keyword: string) => (
            <Chip
              className={classes.chips}
              onClick={() => setSearchKey(keyword)}
              variant="outlined"
              label={keyword}
            />
          ))}
        </div>
      </ScrollContainer>
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
