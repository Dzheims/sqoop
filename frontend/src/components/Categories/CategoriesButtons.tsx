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
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
  },
}));

interface CategoriesProps {
  selectedCategory: string;
}

const CategoriesButtons: React.FC<CategoriesProps> = ({
  selectedCategory,
}: CategoriesProps) => {
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
          <Button variant="outlined" className={classes.button}>
            {value.title}
          </Button>
        ))}
      </div>
    </ScrollContainer>
  );
};

export default CategoriesButtons;
