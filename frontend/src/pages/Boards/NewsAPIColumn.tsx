import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import styled from 'styled-components';
import { Link, Typography, Avatar } from '@material-ui/core';

type BoardColumnContentStylesProps = {
  isDragging: boolean;
};

const Item = styled.div`
  padding: 15px;
  background-color: ${(isDragging: BoardColumnContentStylesProps) =>
    isDragging ? '#fff' : '#d3e4ee'};
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
const Title = styled.h2`
  font: 18px sans-serif;
  margin-bottom: 12px;
  margin-left: 12px;
`;
const ColumnContainer = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #f7fafc;
  border-radius: 4px;
  & + & {
    margin-left: 12px;
  }
  width: 120px;
  margin-right: 15px;
`;
const ItemContainer = styled.div`
  background-color: ${(isDraggingOver: BoardColumnContentStylesProps) =>
    isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  max-height: 450px;
  overflow: auto;
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
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
            <Title {...provided.droppableProps}>News API Feed</Title>

            <ItemContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDraggingOver}
            >
              {data?.topHeadlines?.map((value, index) => (
                <Draggable
                  draggableId={value.publishedAt as string}
                  index={index}
                  key={index}
                >
                  {(provided, snapshot) => (
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      <Typography variant="h6">{value.source?.name}</Typography>
                      <Typography variant="caption">
                        {value.publishedAt}
                      </Typography>
                      <br />
                      <Typography variant="body2">{value.title}</Typography>
                      <div
                        data-testid="Image"
                        style={{
                          backgroundImage: `url(${value.urlToImage})`,
                          height: '120px',
                          width: 'auto',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          marginTop: '10px',
                        }}
                      />
                      <br />
                      <Link href={value?.url as string}>See Link</Link>
                    </Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ItemContainer>
          </ColumnContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NewsAPIColumn;
