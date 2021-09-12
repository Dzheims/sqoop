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

interface filtersProps {
  feedType: string;
  keyword: string | null;
  country: string;
  category: string | null;
  sources: string | null;
}

const getFeedType = ({
  feedType,
  keyword,
  country,
  category,
  sources,
}: filtersProps) => {
  if (feedType === 'NewsFeed')
    return (
      <NewsAPIColumnData
        keyword={keyword}
        country={country}
        category={category as Category}
        sources={sources}
      />
    );
  if (feedType === 'TwitterFeed')
    return <TwitterAPIColumnData keyword={keyword} sources={sources} />;
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
          {data.twitterFeeds?.map(
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
                      {getFeedType({
                        feedType: value.__typename || 'NewsFeed',
                        keyword: value.keyword || null,
                        sources: value.sources || null,
                        country: '',
                        category: null,
                      })}
                      {/* {getFeedType(
                        value.__typename || 'NewsFeed',
                        value.keyword || '',
                        value.country || '',
                        value.category || null,
                        value.sources || ''
                      )} */}
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
