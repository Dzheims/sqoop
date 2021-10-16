import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GetTwitterApiContentsQuery } from './query.generated';
import { Item } from './ColumnsStyle';
import TwitterCards from '../../components/Cards/TwitterCards';
import { DrawerState } from '../../components/FactCheck/FactCheckDrawerState';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}

const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => (
  <div>
    {data?.searchTweets?.map((value) => (
      <TwitterCards data={value} />
    ))}
  </div>
);

export default TwitterAPIColumn;
