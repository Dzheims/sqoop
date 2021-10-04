/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  ColumnWrapper,
  useStyles,
} from '../../pages/Boards/ColumnsStyle';
import CloseIcon from '@material-ui/icons/Close';
// import ColumnsData from './ColumnsData';
import NewsAPIColumnData from '../../pages/Boards/NewsAPIColumnData';
import TwitterAPIColumnData from '../../pages/Boards/TwitterAPIColumnData';
import CategoriesButtons from '../Categories/CategoriesButtons';
import { GetColumnsQuery } from './query.generated';
import { Category } from '../../types.generated';
import { Grid, IconButton } from '@material-ui/core';

interface filtersProps {
  feedType: string | undefined;
  keyword: string | null;
  country: string;
  category: string | null;
  sources: string | null;
}

const getFeedType = (value: any) => {
  switch (value.__typename) {
    case 'NewsFeed':
      return (
        <NewsAPIColumnData
          keyword={value.keyword}
          country={value.country}
          category={value.category as Category}
          sources={value.sources}
        />
      );
    case 'TwitterFeed':
      return (
        <TwitterAPIColumnData keyword={value.keyword} sources={value.sources} />
      );
    case 'Collection':
      return <div />;
  }
};

interface ColumnDataProps {
  data: GetColumnsQuery;
}

const Columns: React.FC<ColumnDataProps> = ({ data }: ColumnDataProps) => {
  const classes = useStyles();
  // const [state, setState] = useState(ColumnsData);

  const onDragEnd = () => {};

  return (
    <ColumnWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.getColumnResult?.map(
          (value, index) => (
            // value.isVisible === true ? (
            <Droppable droppableId="droppable" key={value.id}>
              {(provided, snapshot) => (
                <ColumnContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    className={classes.grid}
                  >
                    <Title>{value.title}</Title>
                    <IconButton aria-label="close" size="small">
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                  <ItemContainer
                    className={classes.itemContainer}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDraggingOver}
                  >
                    {getFeedType(value)}
                  </ItemContainer>
                </ColumnContainer>
              )}
            </Droppable>
          )
          // ) : (
          //   <div />
          // )
        )}
      </DragDropContext>
    </ColumnWrapper>
  );
};

export default Columns;
