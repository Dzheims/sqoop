import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GetNewsApiContentsQuery } from './query.generated';
import { Item, useStyles } from './ColumnsStyle';
import NewsCards from '../../components/Cards/NewsCards';

// interface NewsAPIDataProps {
//   data: GetNewsApiContentsQuery;
// }

interface DrawerState {
  data: any;
  open: boolean;
}

interface NewsAPIDataProps {
  data: GetNewsApiContentsQuery;
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

const NewsAPIColumn: React.FC<NewsAPIDataProps> = ({
  setDrawerState,
  data,
}: NewsAPIDataProps) => {
  const classes = useStyles();

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
              <NewsCards data={value} setDrawerState={setDrawerState} />
            </Item>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default NewsAPIColumn;
