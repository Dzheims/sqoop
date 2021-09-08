/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  ColumnWrapper,
} from '../../pages/Boards/ColumnsStyle';
import ColumnsData from './ColumnsData';
import NewsAPIColumnData from '../../pages/Boards/NewsAPIColumnData';
import TwitterAPIColumnData from '../../pages/Boards/TwitterAPIColumnData';
import CategoriesButtons from '../Categories/CategoriesButtons';
import Drawer from '../Drawers/Drawer';

const getFeedType = (feedType: string) => {
  if (feedType === 'news') return <NewsAPIColumnData />;
  if (feedType === 'twitter') return <TwitterAPIColumnData />;
  return <div />;
};

const Columns: React.FC = () => {
  const [state, setState] = useState(ColumnsData);

  const onDragEnd = () => {};

  return (
    <ScrollMenu>
      <ColumnWrapper>
        <Drawer />
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columns.map((value, index) =>
            value.isVisible === true ? (
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <ColumnContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Title>{value.title}</Title>
                    <CategoriesButtons />
                    <ItemContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDraggingOver}
                    >
                      {getFeedType(value.feedType)}
                    </ItemContainer>
                  </ColumnContainer>
                )}
              </Droppable>
            ) : (
              <div />
            )
          )}
        </DragDropContext>
      </ColumnWrapper>
    </ScrollMenu>
  );
};

export default Columns;
