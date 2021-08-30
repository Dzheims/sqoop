import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
  border: thin solid lightgray;
`;
type BoardItemProps = {
  index: number;
  item: any;
};

const BoardItem = ({ index, item }: BoardItemProps) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {item.content}
      </Container>
    )}
  </Draggable>
);

export default BoardItem;
