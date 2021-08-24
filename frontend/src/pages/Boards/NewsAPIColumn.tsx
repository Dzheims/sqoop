import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import styled from 'styled-components';
import { Link } from '@material-ui/core';

type BoardColumnContentStylesProps = {
  isDragging: boolean;
};

const Item = styled.div<BoardColumnContentStylesProps>`
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

const Title = styled.h2`
  font: 18px sans-serif;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const ColumnContainer = styled.div`
  flex: 1;
  padding: 8px;
  background-color: skyblue;
  border-radius: 4px;
  & + & {
    margin-left: 12px;
  }
  width: 120px;
  margin-right: 15px;
`;
const ItemContainer = styled.div<BoardColumnContentStylesProps>`
  background-color: ${(props: any) =>
    props.isDraggingOver ? 'skyblue' : null};
  transition: background-color 0.2s ease;
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
}
const NewsAPIColumn: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.destination.source) {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Draggable draggableId="draggable" isDragDisabled={true} index={0}>
        {(provided) => (
          <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>News API Feed</Title>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <ItemContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDraggingOver}
                >
                  {data?.topHeadlines?.map((value, index) => (
                    <Draggable
                      draggableId={value.source?.name as string}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <div>{value.source?.name}</div>
                          {value.title}
                          <Link href={value?.url as string}>See Link</Link>
                        </Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ItemContainer>
              )}
            </Droppable>
          </ColumnContainer>
        )}
      </Draggable>
    </DragDropContext>
  );
};

export default NewsAPIColumn;
