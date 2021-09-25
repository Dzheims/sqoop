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
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '300px',
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
    marginRight: '10px',
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
}));

const FactCheckDrawerContent = () => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState('');
  const [search, setSearch] = useState(false);

  const searchOptions = [
    {
      title: 'Google Fact Check',
      onClick: () => {},
    },
    {
      title: 'Vera Files',
      onClick: () => {},
    },
  ];

  const handleSearch = () => {
    setSearch(true);
  };

  return (
    <div className={classes.container}>
      {/* <Title>Fact Check</Title> */}
      <Paper variant="outlined" component="form" className={classes.search}>
        <InputBase
          className={classes.input}
          value={searchKey}
          placeholder="Search"
          onChange={(e) => {
            setSearchKey(e.target.value);
            setSearch(false);
          }}
        />
        <IconButton onClick={handleSearch} className={classes.iconButton}>
          <Search />
        </IconButton>
      </Paper>
      <div className={classes.buttonContainer}>
        {searchOptions.map((value) => (
          <Button
            role-="button"
            variant="outlined"
            className={classes.button}
            onClick={value.onClick}
          >
            {value.title}
          </Button>
        ))}
      </div>
      {search ? <GoogleFactCheckData keyword={searchKey} /> : <div />}
    </div>
  );
};

export default FactCheckDrawerContent;
