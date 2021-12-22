import React from 'react';
import { GetTwitterApiContentsQuery } from './query.generated';
import TwitterCards from '../../components/Cards/TwitterCards';

interface TwitterAPIDataProps {
  data: GetTwitterApiContentsQuery;
}

const TwitterAPIColumn: React.FC<TwitterAPIDataProps> = ({
  data,
}: TwitterAPIDataProps) => (
  <div>
    {data?.searchTweets?.map((value, index) => (
      <div key={index}>
        <TwitterCards data={value} />
      </div>
    ))}
  </div>
);

export default TwitterAPIColumn;
