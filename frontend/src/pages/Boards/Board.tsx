import * as React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BoardColumn from './BoardColumn';
import BoardData from './BoardData';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const BoardWrapper = styled.div`
  margin: 50px;
`;

class Board extends React.Component {
  state = BoardData;

  onDragStart = (result: any) => {
    const homeIndex = this.state.columnsOrder.indexOf(
      result.source.droppableId
    );
    this.setState({ homeIndex });
  };

  onDragEnd = (result: any) => {
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
      const newColumnOrder = Array.from(this.state.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      this.setState({
        ...this.state,
        columnsOrder: newColumnOrder,
      });
      return;
    }
    const columnStart = (this.state.columns as any)[source.droppableId];
    const columnFinish = (this.state.columns as any)[destination.droppableId];

    if (columnStart === columnFinish) {
      const newItemsIds = Array.from(columnStart.itemsIds);
      newItemsIds.splice(source.index, 1);
      newItemsIds.splice(destination.index, 0, draggableId);

      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
        },
      };
      this.setState(newState);
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
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish,
        },
      };

      this.setState(newState);
    }
  };

  render() {
    return (
      <BoardWrapper>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
        >
          <Droppable
            droppableId="all-column"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.columnsOrder.map((columnId, index) => {
                  const column = (this.state.columns as any)[columnId];
                  const items = column.itemsIds.map(
                    (itemId: string) => (this.state.items as any)[itemId]
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
      </BoardWrapper>
    );
  }
}

export default Board;
