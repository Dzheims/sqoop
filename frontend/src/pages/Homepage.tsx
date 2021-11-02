/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useRef, useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Toolbar, Button, Typography } from '@material-ui/core';
import Fab from '@mui/material/Fab';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import Cookies from 'js-cookie';
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
import AUTH_TOKEN from '../constants';
// import CategoriesButtons from '../components/Categories/CategoriesButtons';
import FactCheck from '../components/FactCheck/FactCheck';
import {
  DrawerStateProvider,
  useDrawerState,
  GlobalDrawerContext,
} from '../components/FactCheck/FactCheckDrawerState';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    scrollBehavior: 'smooth',
  },
  defaultFeeds: {
    display: 'flex',
  },
  columnContainers: {
    margin: '5px',
    display: 'flex',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '10px',
      width: '1em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'lightGray',
      borderRadius: 8,
    },
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
  arrowIcon: {
    color: theme.palette.primary.main,
  },
}));

export interface DrawerState {
  suggestedKeyWords: Array<string>;
  open: boolean;
}

const Homepage = () => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState('GENERAL');
  const [isScrollVisible, setIsScrollVisible] = useState({
    left: true,
    right: true,
  });
  const history = useHistory();

  if (!Cookies.get(AUTH_TOKEN)) {
    history.push('/signin');
    // return <Redirect to="/signin" />;
  }

  const onDragEnd = () => {};

  const [drawerState, setDrawerState] = useState<DrawerState>({
    suggestedKeyWords: [],
    open: false,
  });

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

  const handleScroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
      const maxScrollLeft = ref.current.scrollWidth - ref.current.clientWidth;
      if (ref.current.scrollLeft >= 200)
        setIsScrollVisible({ left: true, right: true });
      if (Math.ceil(ref.current.scrollLeft) === maxScrollLeft)
        setIsScrollVisible({ left: true, right: false });
      if (ref.current.scrollLeft === 0)
        setIsScrollVisible({ left: false, right: true });
    }
  };

  // useEffect(() => {
  //   if (ref.current) {
  //     if (ref.current.offsetWidth <= 620)
  //       setIsScrollVisible({ left: false, right: false });
  //     else setIsScrollVisible({ left: false, right: true });
  //   }
  // });

  const isLastElement = () => {
    if (ref.current) {
      return (
        ref.current.scrollLeft + ref.current.clientWidth ===
        ref.current.scrollWidth
      );
    }
    return false;
  };

  const isFirstlement = () => {
    if (ref.current) {
      return ref.current.scrollWidth === 0;
    }
    return false;
  };

  return (
    <div className={classes.root}>
      <DrawerStateProvider value={{ suggestedKeyWords: [], open: false }}>
        <NavigationBar />
        <Toolbar />
        <FactCheck />
        <div ref={ref} className={classes.columnContainers}>
          <Fab
            onClick={() => handleScroll(-200)}
            style={
              isScrollVisible.left
                ? {
                    opacity: 0.9,
                    position: 'fixed',
                    left: 65,
                    top: '50%',
                    visibility: 'visible',
                  }
                : { visibility: 'hidden' }
            }
          >
            <ArrowLeftIcon className={classes.arrowIcon} />
          </Fab>
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
                        className={classes.itemContainer}
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
          <Fab
            onClick={() => handleScroll(200)}
            style={
              isScrollVisible.right
                ? {
                    opacity: 0.9,
                    position: 'fixed',
                    right: 15,
                    top: '50%',
                    visibility: 'visible',
                  }
                : { visibility: 'hidden' }
            }
          >
            <ArrowRightIcon className={classes.arrowIcon} />
          </Fab>
        </div>
      </DrawerStateProvider>
    </div>
  );
};

export default Homepage;
