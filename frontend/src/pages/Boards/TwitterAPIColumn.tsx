import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GetTwitterApiContentsQuery } from './query.generated';
import { Item, useStyles } from './ColumnsStyle';
import TwitterCards from '../../components/Cards/TwitterCards';

// interface TwitterAPIDataProps {
//   data: GetTwitterApiContentsQuery;
// }

interface DrawerState {
  data: any;
  open: boolean;
}

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  setDrawerState,
  data,
}: TwitterAPIDataProps) => {
  const classes = useStyles();

  return (
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
              <TwitterCards data={value} setDrawerState={setDrawerState} />
            </Item>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TwitterAPIColumn;
