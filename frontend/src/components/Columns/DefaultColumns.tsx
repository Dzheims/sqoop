/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from '@material-ui/core';
import FeedIcon from '@mui/icons-material/Feed';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  DefaultColumnContainer,
  DefaultItemContainer,
  Title,
} from './ColumnsStyle';
import NewsContentsData from '../ColumnContents/NewsContentsData';
import TwitterContentsData from '../ColumnContents/TwitterContentsData';
import { Category } from '../../types.generated';

const useStyles = makeStyles((theme) => ({
  defaultFeeds: {
    display: 'flex',
    marginLeft: '7px',
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
  itemContainer: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  columnElement: {
    '&:focus': {
      border: '2px solid #f04b4c',
      transition: 'border 0.10s ease-out',
    },
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },
}));

const DefaultColumns: React.FC = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('GENERAL');

  const iconStyle = { color: '#0036e7', height: '18px', width: '18px' };

  const defaultColumns = [
    {
      title: 'News Feed',
      icon: <FeedIcon style={iconStyle} />,
      cards: (
        <NewsContentsData
          country=""
          category={category as Category}
          keyword=""
          sources=""
        />
      ),
    },
    {
      title: 'Twitter Feed',
      icon: <TwitterIcon style={iconStyle} />,
      cards: <TwitterContentsData keyword="" sources="" />,
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
    <div className={classes.defaultFeeds}>
      <DragDropContext onDragEnd={() => {}}>
        {defaultColumns.map((column) => (
          <div
            key={column.title}
            id={column.title}
            className={classes.columnElement}
            tabIndex={-1}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <DefaultColumnContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className={classes.columnHeader}>
                    <div>{column.icon}</div>
                    <Title>{column.title}</Title>
                  </div>

                  {column.title === 'News Feed' ? (
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
                  ) : (
                    <div />
                  )}
                  <DefaultItemContainer
                    className={classes.itemContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDraggingOver}
                    feedType={column.title}
                  >
                    {column.cards}
                  </DefaultItemContainer>
                </DefaultColumnContainer>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DefaultColumns;
