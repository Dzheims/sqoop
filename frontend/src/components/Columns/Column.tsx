/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  ColumnWrapper,
} from '../../pages/Boards/ColumnsStyle';
// import ColumnsData from './ColumnsData';
import NewsAPIColumnData from '../../pages/Boards/NewsAPIColumnData';
import TwitterAPIColumnData from '../../pages/Boards/TwitterAPIColumnData';
import CategoriesButtons from '../Categories/CategoriesButtons';
import { GetColumnsQuery } from './query.generated';
import { Category } from '../../types.generated';

interface filtersProps {
  feedType: string | undefined;
  keyword: string | null;
  country: string;
  category: string | null;
  sources: string | null;
}

const getFeedType = (value: any) => {
  switch (value.__typename) {
    case 'NewsFeed':
      return (
        <NewsAPIColumnData
          keyword={value.keyword}
          country={value.country}
          category={value.category as Category}
          sources={value.sources}
        />
      );
    case 'TwitterFeed':
      return (
        <TwitterAPIColumnData keyword={value.keyword} sources={value.sources} />
      );
    case 'Collection':
      return <div />;
    default:
      return <div />;
  }
};

interface ColumnDataProps {
  data: GetColumnsQuery;
}

const Columns: React.FC<ColumnDataProps> = ({ data }: ColumnDataProps) => {
  // const [state, setState] = useState(ColumnsData);

  const onDragEnd = () => {};

  return (
    <ColumnWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.getColumnResult?.map(
          (value, index) => (
            // value.isVisible === true ? (
            <Droppable droppableId="droppable" key={value.id}>
              {(provided, snapshot) => (
                <ColumnContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Title>{value.title}</Title>
                  <ItemContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDraggingOver}
                  >
                    {/* {value.__typename === 'NewsFeed'
                      ? getFeedType({
                          feedType: value.__typename,
                          keyword: value.keyword || '',
                          sources: value.sources || '',
                          country: value.country || '',
                          category: value.category || null,
                        })
                      : getFeedType({
                          feedType: value.__typename || 'TwitterFeed',
                          keyword: value.keyword || null,
                          country: '',
                          category: null,
                          sources: value.sources || null,
                        })} */}
                    {getFeedType(value)}
                  </ItemContainer>
                </ColumnContainer>
              )}
            </Droppable>
          )
          // ) : (
          //   <div />
          // )
        )}
      </DragDropContext>
    </ColumnWrapper>
  );
};

export default Columns;
