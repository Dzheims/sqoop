/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import FactCheck from '../components/FactCheck/FactCheck';
import { DrawerStateProvider } from '../components/FactCheck/FactCheckDrawerState';
import { CollectionsListStateProvider } from '../components/Collections/CollectionsListState';
import {
  NavDrawerStateProvider,
  useNavDrawerState,
} from '../components/Navigation/NavDrawerState';

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
  columnElement: {
    '&:focus': {
      border: '2px solid #f04b4c',
      transition: 'border 0.10s ease-out',
    },
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
  const { drawerState, setDrawerState } = useNavDrawerState();
  const [isFirstElement, setIsFirstElement] = useState(true);
  const [isLastElement, setIsLastElement] = useState(false);
  const history = useHistory();

  if (!Cookies.get(AUTH_TOKEN)) {
    history.push('/signin');
    // return <Redirect to="/signin" />;
  }

  const onDragEnd = () => {};

  // const [drawerState, setDrawerState] = useState<DrawerState>({
  //   suggestedKeyWords: [],
  //   open: false,
  // });

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

  const buttonScroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: (ref.current.scrollLeft += scrollOffset),
        behavior: 'smooth',
      });
    }
  };

  // FIX

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollLeft += 200;
      if (ref.current.scrollLeft === 0) {
        setIsLastElement(true);
      } else {
        setIsLastElement(false);
      }
    }
    return () => {};
  }, []);

  const onScroll = () => {
    if (ref.current) {
      if (ref.current.scrollLeft === 0) {
        setIsFirstElement(true);
      } else {
        setIsFirstElement(false);
      }

      if (
        Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
        ref.current.offsetWidth
      ) {
        setIsLastElement(true);
      } else {
        setIsLastElement(false);
      }
    }
  };

  return (
    <div className={classes.root}>
      <DrawerStateProvider value={{ suggestedKeyWords: [], open: false }}>
        <CollectionsListStateProvider value={{ collectionId: 0 }}>
          <NavDrawerStateProvider value={{ isOpen: false, current: '' }}>
            <NavigationBar />
            <Toolbar />
            <FactCheck />
            <div style={{ overflow: 'hidden' }}>
              <div
                ref={ref}
                className={classes.columnContainers}
                onScroll={onScroll}
              >
                <div className={classes.defaultFeeds}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    {defaultColumns.map((column) => (
                      <div
                        id={column.title}
                        className={classes.columnElement}
                        tabIndex={-1}
                      >
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
                      </div>
                    ))}
                  </DragDropContext>
                </div>
                <ColumnsData />
                {!isFirstElement && (
                  <Fab
                    onClick={() => buttonScroll(-320)}
                    style={{
                      opacity: 0.9,
                      position: 'fixed',
                      left: drawerState.isOpen ? 65 : 360,
                      top: '50%',
                    }}
                  >
                    <ArrowLeftIcon className={classes.arrowIcon} />
                  </Fab>
                )}
                {!isLastElement && (
                  <Fab
                    onClick={() => buttonScroll(320)}
                    style={{
                      opacity: 0.9,
                      position: 'fixed',
                      right: 15,
                      top: '50%',
                    }}
                  >
                    <ArrowRightIcon className={classes.arrowIcon} />
                  </Fab>
                )}
              </div>
            </div>
          </NavDrawerStateProvider>
        </CollectionsListStateProvider>
      </DrawerStateProvider>
    </div>
  );
};

export default Homepage;
