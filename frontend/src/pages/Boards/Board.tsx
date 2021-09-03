import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BoardColumn from './BoardColumn';
import BoardData from './BoardData';
import NewsAPIColumnData from './NewsAPIColumnData';
import TwitterAPIColumnData from './TwitterAPIColumnData';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 70px;
`;

const BoardWrapper = styled.div`
  margin: 50px;
`;

const Board: React.FC = () => {
  const [state, setState] = useState(BoardData);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({
        ...state,
        columnsOrder: newColumnOrder,
      });
      return;
    }
    const columnStart = (state.columns as any)[source.droppableId];
    const columnFinish = (state.columns as any)[destination.droppableId];

    if (columnStart === columnFinish) {
      const newItemsIds = Array.from(columnStart.itemsIds);
      newItemsIds.splice(source.index, 1);
      newItemsIds.splice(destination.index, 0, draggableId);

      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
        },
      };
      setState(newState);
    } else {
      const newStartItemsIds = Array.from(columnStart.itemsIds);
      newStartItemsIds.splice(source.index, 1);
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds,
      };

      const newFinishItemsIds = Array.from(columnFinish.itemsIds);
      newFinishItemsIds.splice(destination.index, 0, draggableId);
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };
      setState(newState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            <NewsAPIColumnData />
            <TwitterAPIColumnData />
            {state.columnsOrder.map((columnId, index) => {
              const column = (state.columns as any)[columnId];
              const items = column.itemsIds.map(
                (itemId: string) => (state.items as any)[itemId]
              );
              return (
                <BoardColumn
                  key={column.id}
                  column={column}
                  items={items}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
