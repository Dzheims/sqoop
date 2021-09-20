/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button, InputBase, Paper } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { Title } from '../../../../pages/Boards/ColumnsStyle';

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

  return (
    <div className={classes.container}>
      {/* <Title>Fact Check</Title> */}
      <Paper variant="outlined" component="form" className={classes.search}>
        <InputBase className={classes.input} placeholder="Search" />
        <IconButton type="submit" className={classes.iconButton}>
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
    </div>
  );
};

export default FactCheckDrawerContent;
