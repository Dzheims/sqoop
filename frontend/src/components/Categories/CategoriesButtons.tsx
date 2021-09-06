import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ScrollContainer from 'react-indiana-drag-scroll';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
  },
  button: {
    marginLeft: '10px',
    textTransform: 'none',
    fontSize: '12px',
    minWidth: 'auto',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
  },
}));

const CategoriesButtons = () => {
  const classes = useStyles();

  const categories = [
    {
      title: 'Business',
      onClick: () => {},
    },
    {
      title: 'Entertainment',
      onClick: () => {},
    },
    {
      title: 'General',
      onClick: () => {},
    },
    {
      title: 'Health',
      onClick: () => {},
    },
    {
      title: 'Science',
      onClick: () => {},
    },
    {
      title: 'Sports',
      onClick: () => {},
    },
    {
      title: 'Technology',
      onClick: () => {},
    },
  ];

  return (
    <ScrollContainer className="scroll-container">
      <div className={classes.buttonContainer}>
        {categories.map((value) => (
          <Button variant="outlined" className={classes.button}>
            {value.title}
          </Button>
        ))}
      </div>
    </ScrollContainer>
  );
};

export default CategoriesButtons;
