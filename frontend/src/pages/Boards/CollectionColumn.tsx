import React from 'react';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import CollectionTweets from './CollectionTweetsData';
import NewsCards from '../../components/Cards/NewsCards';
import VeraFactCheckResultsCards from '../../components/FactCheck/VeraFactCheckResultsCards';
import GoogleFactCheckResultsCards from '../../components/FactCheck/GoogleFactCheckResultsCards';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: any) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <CollectionTweets dataProps={value} />;
    case 'CollectionArticle':
      return <NewsCards data={value} isUnderCollections={true} />;
    case 'CollectionVeraFile':
      return (
        <VeraFactCheckResultsCards data={value} isUnderCollections={true} />
      );
    case 'CollectionGoogleFactCheck':
      return <GoogleFactCheckResultsCards data={value} />;
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
