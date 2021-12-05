import React from 'react';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import CollectionTweets from './CollectionTweetsData';
import NewsCards from '../../components/Cards/NewsCards';
import VeraFilesCards from '../../components/Cards/VeraFilesCards';
import GoogleFactCheckCards from '../../components/Cards/GoogleFactCheckCards';

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
      return <VeraFilesCards data={value} isUnderCollections={true} />;
    case 'CollectionGoogleFactCheck':
      return <GoogleFactCheckCards data={value} isUnderCollections={true} />;
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
