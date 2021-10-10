import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GetTwitterApiContentsQuery } from './query.generated';
import { Item } from './ColumnsStyle';
import TwitterCards from '../../components/Cards/TwitterCards';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}
const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => (
  <div>
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
            <TwitterCards data={value} />
          </Item>
        )}
      </Draggable>
    ))}
  </div>
);

export default TwitterAPIColumn;
