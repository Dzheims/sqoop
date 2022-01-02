import React from 'react';
import { CollectionContentsQuery } from './query.generated';
import NewsCards from '../Cards/NewsCard';
import VeraFilesCards from '../Cards/VeraFilesCard';
import GoogleFactCheckCards from '../Cards/GoogleFactCheckCard';
import TwitterCards from '../Cards/TwitterCard';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: any) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <TwitterCards data={value} />;
    case 'CollectionArticle':
      return <NewsCards data={value} />;
    case 'CollectionVeraFile':
      return <VeraFilesCards data={value} />;
    case 'CollectionGoogleFactCheck':
      return <GoogleFactCheckCards data={value} />;
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
