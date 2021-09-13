/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Toolbar } from '@material-ui/core';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { ColumnsData } from '../components/Columns/ColumnsData';
import NavigationBar from '../components/Navigation/NavigationBar';
import { Category } from '../types.generated';
import { ColumnContainer, ItemContainer, Title } from './Boards/ColumnsStyle';
import NewsAPIColumnData from './Boards/NewsAPIColumnData';
import TwitterAPIColumnData from './Boards/TwitterAPIColumnData';
import CategoriesButtons from '../components/Categories/CategoriesButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  defaultFeeds: {
    display: 'flex',
    marginLeft: '80px',
  },
  columnContainers: {
    position: 'absolute',
  },
}));

const Homepage = () => {
  const classes = useStyles();

  const onDragEnd = () => {};

  const defaultColumns = [
    {
      title: 'News Feed',
      cards: (
        <NewsAPIColumnData
          country=""
          category={'GENERAL' as Category}
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
                      <CategoriesButtons />
                      <ItemContainer
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDraggingOver}
                      >
                        {column.cards}
                      </ItemContainer>
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
