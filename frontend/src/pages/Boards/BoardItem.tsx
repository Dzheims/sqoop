import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

type BoardItemProps = {
  index: number;
  item: any;
};

type BoardItemStylesProps = {
  isDragging: boolean;
};

const Container = styled.div<BoardItemStylesProps>`
  padding: 8px;
  background-color: ${(props: any) => (props.isDragging ? '#d3e4ee' : '#fff')};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`;

const BoardItem = (props: BoardItemProps) => (
  <Draggable draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {props.item.content}
      </Container>
    )}
  </Draggable>
);

export default BoardItem;
