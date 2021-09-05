import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import { Typography, Avatar } from '@material-ui/core';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  Item,
  AccountNameContainer,
  NewsAPIContentContainer,
  NewsAPITitleContainer,
  useStyles,
} from './ColumnsStyle';

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
}
const NewsAPIColumn: React.FC<NewsAPIDataProps> = ({
  data,
}: NewsAPIDataProps) => {
  const classes = useStyles();

  const formatTimeAndDate = (date: any) => {
    const createdAtDate = new Date(date);
    const formattedCreateDate =
      createdAtDate.toLocaleTimeString() + ' ' + createdAtDate.toDateString();
    return formattedCreateDate;
  };

  return (
    <React.Fragment>
      {data?.topHeadlines?.map((value, index) => (
        <Draggable
          draggableId={value.publishedAt as string}
          index={index}
          key={index}
        >
          {(provided, snapshot) => (
            <Item
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <NewsAPITitleContainer>
                <Avatar className={classes.avatars}>
                  {value.sourceName?.charAt(0)}
                </Avatar>
                <AccountNameContainer>
                  <Typography style={{ fontWeight: 600 }}>
                    {value.sourceName}
                  </Typography>
                </AccountNameContainer>
              </NewsAPITitleContainer>
              <Typography variant="body2">{value.title}</Typography>
              {value.urlToImage === null ? (
                <div />
              ) : (
                <NewsAPIContentContainer>
                  <div
                    style={{
                      backgroundImage: `url(${value.urlToImage})`,
                    }}
                    className={classes.imageContainer}
                  />
                  <Typography className={classes.description}>
                    {value.description}
                  </Typography>
                </NewsAPIContentContainer>
              )}
              <br />
              <Typography className={classes.dateAndUserName}>
                {formatTimeAndDate(value.publishedAt)}
              </Typography>
            </Item>
          )}
        </Draggable>
      ))}
    </React.Fragment>
  );
};

export default NewsAPIColumn;
