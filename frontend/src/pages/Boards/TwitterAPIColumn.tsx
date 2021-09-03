import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GetTwitterApiContentsQuery } from './query.generated';
import {
  Typography,
  Avatar,
  ImageList,
  ImageListItem,
} from '@material-ui/core';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  Item,
  AccountNameContainer,
  TwitterContentContainer,
  TwitterTitleContainer,
  useStyles,
} from './ColumnsStyle';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}
const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => {
  const classes = useStyles();
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.destination.source) {
      return;
    }
  };
  const itemListCols = (length: any) => {
    if (undefined) return;
    if (length === 1) return 1;
    if (length > 2) return 2;
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
            <Title {...provided.droppableProps}>Twitter Sqoop</Title>
            <ItemContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDraggingOver}
            >
              {data?.searchTweets?.map((value, index) => (
                <Draggable
                  draggableId={value.author_id as string}
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
                      <TwitterContentContainer>
                        <Avatar
                          alt={value.name as string}
                          src={value.profile_image_url as string}
                          className={classes.avatars}
                          variant="circular"
                        />
                        <AccountNameContainer>
                          <TwitterTitleContainer>
                            <Typography style={{ fontWeight: 600 }}>
                              {value.name}
                            </Typography>
                            {value.verified ? (
                              <Avatar
                                alt="Verified"
                                src="https://www.pngitem.com/pimgs/m/3-38867_twitter-verified-badge-twitter-verified-icon-svg-hd.png"
                                className={classes.verifiedIcon}
                              />
                            ) : (
                              <div />
                            )}
                          </TwitterTitleContainer>
                          <Typography className={classes.dateAndUserName}>
                            {'@' + value.username}
                          </Typography>
                        </AccountNameContainer>
                        <Avatar
                          alt="Twitter-logo"
                          src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg"
                          className={classes.twitterIcon}
                        />
                      </TwitterContentContainer>
                      <Typography variant="body2">{value.text}</Typography>
                      {value.photos?.length === 0 ? (
                        <div />
                      ) : (
                        <ImageList
                          className={classes.imageList}
                          rowHeight={140}
                          cols={itemListCols(value.photos?.length)}
                        >
                          {value.photos?.map((photo) => (
                            <ImageListItem key={photo?.media_key} cols={1}>
                              <img
                                src={photo?.url as string}
                                alt={photo?.type as string}
                              />
                            </ImageListItem>
                          ))}
                        </ImageList>
                      )}
                      <Typography className={classes.dateAndUserName}>
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
