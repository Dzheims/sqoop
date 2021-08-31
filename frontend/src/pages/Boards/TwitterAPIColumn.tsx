import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetTwitterApiContentsQuery } from './query.generated';
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

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px;
`;
const AccountNameContainer = styled.div`
  display: block;
  padding: 5px;
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

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}
const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.destination.source) {
      return;
    }
  };

  const formatTimeAndDate = (date: any) => {
    const createdAtDate = new Date(date);
    const formattedCreateDate =
      createdAtDate.toLocaleTimeString() + ' ' + createdAtDate.toDateString();
    return formattedCreateDate;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
            <Title {...provided.droppableProps}>Twitter API Feed</Title>
            <ItemContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDraggingOver}
            >
              {data?.searchTweets?.map((value, index) => (
                <Draggable
                  draggableId={value.id as string}
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
                      <ContentContainer>
                        <Avatar
                          alt={value.name as string}
                          src={value.profile_image_url as string}
                          style={{
                            height: '40px',
                            width: '40px',
                            marginRight: '10px',
                          }}
                          variant="circle"
                        />
                        <div>
                          <AccountNameContainer>
                            <Typography style={{ fontWeight: 600 }}>
                              {value.name}
                            </Typography>
                            <Typography
                              style={{ fontSize: '14px', color: 'gray' }}
                            >
                              {'@' + value.username}
                            </Typography>
                          </AccountNameContainer>
                        </div>
                        <Avatar
                          alt={value.name as string}
                          src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg"
                          style={{
                            height: '20px',
                            width: '20px',
                            marginLeft: 'auto',
                          }}
                        />
                      </ContentContainer>
                      <Typography variant="body2">{value.text}</Typography>
                      <Typography
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          color: 'gray',
                        }}
                      >
                        {formatTimeAndDate(value.created_at)}
                      </Typography>
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

export default TwitterAPIColumn;
