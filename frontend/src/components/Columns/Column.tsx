/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
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

const getFeedType = (
  feedType: string,
  keyword: string,
  country: string,
  category: string | null,
  sources: string
) => {
  if (feedType === 'NewsFeed')
    return (
      <NewsAPIColumnData
        keyword={keyword}
        country={country}
        category={category as Category}
        sources={sources}
      />
    );
  if (feedType === 'twitter') return <TwitterAPIColumnData />;
  return <div />;
};

interface ColumnDataProps {
  data: GetColumnsQuery;
}

const Columns: React.FC<ColumnDataProps> = ({ data }: ColumnDataProps) => {
  // const [state, setState] = useState(ColumnsData);

  const onDragEnd = () => {};

  return (
    <ScrollMenu>
      <ColumnWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {data.newsFeeds?.map(
            (value, index) => (
              // value.isVisible === true ? (
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <ColumnContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Title>{value.title}</Title>
                    <CategoriesButtons />
                    <ItemContainer
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDraggingOver}
                    >
                      {getFeedType(
                        value.__typename || 'NewsFeed',
                        value.keyword || '',
                        value.country || '',
                        value.category || null,
                        value.sources || ''
                      )}
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
    </ScrollMenu>
  );
};

export default Columns;
