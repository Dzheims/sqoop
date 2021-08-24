import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BoardItem from './BoardItem';

type BoardColumnProps = {
  key: string;
  column: any;
  items: any;
  index: any;
};

type BoardColumnContentStylesProps = {
  isDraggingOver: boolean;
};

const Container = styled.div`
  flex: 1;
  padding: 8px;
  background-color: lightblue;
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
    props.isDraggingOver ? 'skyblue' : null};
  transition: background-color 0.2s ease;
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const BoardColumn: React.FC<BoardColumnProps> = (props) => (
  <Draggable draggableId={props.column.id} index={props.index}>
    {(provided) => (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
        <Title {...provided.dragHandleProps}>{props.column.title}</Title>
        <Droppable droppableId={props.column.id} type="items">
          {(provided, snapshot) => (
            <Item
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.items.map((item: any, index: number) => (
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
