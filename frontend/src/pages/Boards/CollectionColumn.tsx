import React from 'react';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import CollectionTweets from './CollectionTweetsData';
import NewsCards from '../../components/Cards/NewsCards';
import VeraFactCheckResultsCards from '../../components/FactCheck/VeraFactCheckResultsCards';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: any) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <CollectionTweets dataProps={value} />;
    case 'CollectionArticle':
      const { articleTitle: title, ...collectionArticle } = value;
      return (
        <NewsCards
          data={{ title, ...collectionArticle }}
          isUnderCollections={true}
        />
      );
    case 'CollectionVeraFile':
      return <VeraFactCheckResultsCards data={value} />;
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
