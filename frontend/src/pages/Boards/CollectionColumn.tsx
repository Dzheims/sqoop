import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import { Item, useStyles } from './ColumnsStyle';
import TwitterCards from '../../components/Cards/TwitterCards';
import CollectionTweets from './CollectionTweetsData';
import NewsCards from '../../components/Cards/NewsCards';
import { ArticleProps } from '../../components/Buttons/NewsCardsAddToCollectionButton';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: any) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <CollectionTweets id={value.tweetId} />;
    case 'CollectionArticle':
      return <NewsCards data={value as ArticleProps} />;
  }
};

const CollectionColumn: React.FC<CollectionContentsDataProps> = ({
  data,
}: CollectionContentsDataProps) => (
  <div>
    {data?.collectionContents?.flatMap((value, index) => (
      <div>{getCollectionContentType(value)}</div>
    ))}
  </div>
);

export default CollectionColumn;
