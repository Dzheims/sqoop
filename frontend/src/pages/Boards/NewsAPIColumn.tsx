import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import { Typography, Avatar } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  Item,
  AccountNameContainer,
  NewsAPIContentContainer,
  NewsAPITitleContainer,
  useStyles,
} from './ColumnsStyle';
import FactCheck from '../../components/FactCheck/FactCheck';

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
    <div>
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
              <Typography variant="body2">{value.description}</Typography>
              {value.urlToImage === null ? (
                <a
                  target="_blank"
                  className={classes.link}
                  href={value?.url as string}
                >
                  <Typography variant="body2">{value.title}</Typography>
                </a>
              ) : (
                <NewsAPIContentContainer>
                  <div
                    style={{
                      backgroundImage: `url(${value.urlToImage})`,
                    }}
                    className={classes.imageContainer}
                  >
                    <a
                      target="_blank"
                      className={classes.link}
                      href={value?.url as string}
                    >
                      <OpenInNewIcon className={classes.linkIcon} />
                    </a>
                  </div>
                  <a
                    target="_blank"
                    className={classes.link}
                    href={value?.url as string}
                  >
                    <Typography className={classes.description}>
                      {value.title}
                    </Typography>
                  </a>
                </NewsAPIContentContainer>
              )}
              <br />
              <Typography className={classes.dateAndUserName}>
                {formatTimeAndDate(value.publishedAt)}
              </Typography>
              <FactCheck data={value.suggestedKeywords} />
            </Item>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default NewsAPIColumn;
