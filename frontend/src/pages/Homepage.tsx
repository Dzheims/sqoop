/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/unbound-method */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Toolbar, Button } from '@material-ui/core';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { ColumnsData } from '../components/Columns/ColumnsData';
import NavigationBar from '../components/Navigation/NavigationBar';
import { Category } from '../types.generated';
import {
  ColumnContainer,
  DefaultItemContainer,
  Title,
} from './Boards/ColumnsStyle';
import NewsAPIColumnData from './Boards/NewsAPIColumnData';
import TwitterAPIColumnData from './Boards/TwitterAPIColumnData';
// import CategoriesButtons from '../components/Categories/CategoriesButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  defaultFeeds: {
    display: 'flex',
    marginLeft: '62px',
  },
  columnContainers: {
    position: 'absolute',
  },
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

const Homepage = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('GENERAL');

  const onDragEnd = () => {};

  const defaultColumns = [
    {
      title: 'News Feed',
      cards: (
        <NewsAPIColumnData
          country=""
          category={category as Category}
          keyword={null}
          sources={null}
        />
      ),
    },
    {
      title: 'Twitter Feed',
      cards: <TwitterAPIColumnData keyword={null} sources={null} />,
    },
  ];

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
    <div className={classes.root}>
      <NavigationBar />
      <Toolbar />
      <div className={classes.columnContainers}>
        <ScrollMenu>
          <div className={classes.defaultFeeds}>
            <DragDropContext onDragEnd={onDragEnd}>
              {defaultColumns.map((column) => (
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <ColumnContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Title>{column.title}</Title>
                      {column.title === 'News Feed' ? (
                        <ScrollContainer className="scroll-container">
                          <div className={classes.buttonContainer}>
                            {categories.map((value) => (
                              <Button
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
                      ) : (
                        <div />
                      )}
                      <DefaultItemContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDraggingOver}
                        feedType={column.title}
                      >
                        {column.cards}
                      </DefaultItemContainer>
                    </ColumnContainer>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
          <ColumnsData />
        </ScrollMenu>
      </div>
    </div>
  );
};

export default Homepage;
