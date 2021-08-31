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
const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px;
`;
const ContentContainer = styled.div`
  margin-top: 10px;
  border: thin solid lightgray;
  padding: 0px 0px 5px 0px;
`;
const AccountNameContainer = styled.div`
  display: block;
  padding: 5px;
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
                      <HeaderContainer>
                        <Avatar
                          style={{
                            height: '40px',
                            width: '40px',
                            marginRight: '10px',
                          }}
                        >
                          {value.sourceName?.charAt(0)}
                        </Avatar>
                        <AccountNameContainer>
                          <Typography style={{ fontWeight: 600 }}>
                            {value.sourceName}
                          </Typography>
                        </AccountNameContainer>
                      </HeaderContainer>
                      <Typography variant="body2">{value.title}</Typography>
                      {value.urlToImage === null ? (
                        <div />
                      ) : (
                        <ContentContainer>
                          <div
                            style={{
                              backgroundImage: `url(${value.urlToImage})`,
                              height: '120px',
                              width: 'auto',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                          <Typography
                            style={{
                              padding: '10px',
                              fontSize: '12px',
                              color: 'gray',
                            }}
                          >
                            {value.description}
                          </Typography>
                        </ContentContainer>
                      )}

                      <br />
                      <Typography
                        style={{
                          fontSize: '14px',
                          color: 'gray',
                        }}
                      >
                        {formatTimeAndDate(value.publishedAt)}
                      </Typography>
                      {/* <Link href={value?.url as string}>Visit Website</Link> */}
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
