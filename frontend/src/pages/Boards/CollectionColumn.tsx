import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import { Item, useStyles } from './ColumnsStyle';
import TwitterCards from '../../components/Cards/TwitterCards';
import CollectionTweets from './CollectionTweetsData';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: any) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <CollectionTweets id={value.tweetId} />;
  }
};

const CollectionColumn: React.FC<CollectionContentsDataProps> = ({
  data,
}: CollectionContentsDataProps) => (
  <div>
    {data?.collectionContents?.flatMap((value, index) => (
      <Draggable draggableId={value.tweetId} index={index} key={index}>
        {(provided, snapshot) => (
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            {getCollectionContentType(value)}
          </Item>
        )}
      </Draggable>
    ))}
  </div>
);

export default CollectionColumn;
