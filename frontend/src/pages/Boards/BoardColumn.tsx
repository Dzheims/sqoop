import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BoardItem from './BoardItem';
import { GetNewsApiContentsQuery } from './query.generated';

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

const Container = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #f7fafc;
  border: 2px;
  border-radius: 4px;
  & + & {
    margin-left: 12px;
  }
  width: 100px;
`;

const Title = styled.h2`
  font: 18px sans-serif;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const Item = styled.div<BoardColumnContentStylesProps>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

type BoardColumnProps = {
  key: string;
  column: any;
  items: any;
  index: any;
};
const BoardColumn: React.FC<BoardColumnProps> = ({
  key,
  column,
  items,
  index,
}: BoardColumnProps) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided) => (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="items">
          {(provided, snapshot) => (
            <Item
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {items.map((item: any, index: number) => (
                <BoardItem key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </Item>
          )}
        </Droppable>
      </Container>
    )}
  </Draggable>
);

export default BoardColumn;
