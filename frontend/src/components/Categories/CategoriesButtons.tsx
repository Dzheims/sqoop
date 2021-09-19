import React, { useState } from 'react';
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
    backgroundColor: 'white',
    borderRadius: '12px',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      backgroundColor: 'white',
    },
  },
  selectedButton: {
    marginLeft: '10px',
    textTransform: 'none',
    fontSize: '12px',
    minWidth: 'auto',
    borderRadius: '12px',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

interface CategoriesProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoriesButtons: React.FC = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('GENERAL');

  const categories = [
    {
      title: 'General',
      onClick: () => {
        setCategory('GENERAL');
      },
    },
    {
      title: 'Business',
      onClick: () => {
        setCategory('BUSINESS');
      },
    },
    {
      title: 'Entertainment',
      onClick: () => {
        setCategory('ENTERTAINMENT');
      },
    },
    {
      title: 'Health',
      onClick: () => {
        setCategory('HEALTH');
      },
    },
    {
      title: 'Science',
      onClick: () => {
        setCategory('SCIENCE');
      },
    },
    {
      title: 'Sports',
      onClick: () => {
        setCategory('SPORTS');
      },
    },
    {
      title: 'Technology',
      onClick: () => {
        setCategory('TECHNOLOGY');
      },
    },
  ];

  return (
    <ScrollContainer className="scroll-container">
      <div className={classes.buttonContainer}>
        {categories.map((value) => (
          <Button
            key={value.title}
            aria-label={value.title}
            role-="button"
            variant="outlined"
            className={
              value.title.toUpperCase() !== category
                ? classes.button
                : classes.selectedButton
            }
            onClick={value.onClick}
          >
            {value.title}
          </Button>
        ))}
      </div>
    </ScrollContainer>
  );
};

export default CategoriesButtons;
