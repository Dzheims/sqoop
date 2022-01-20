import React from 'react';
import { CollectionContentsQuery } from './query.generated';
import NewsCards from '../Cards/NewsCard';
import VeraFilesCards from '../Cards/VeraFilesCard';
import GoogleFactCheckCards from '../Cards/GoogleFactCheckCard';
import TwitterCards from '../Cards/TwitterCard';
import { CollectionContent } from '../../types.generated';

interface CollectionContentsDataProps {
  data: CollectionContentsQuery;
}

const getCollectionContentType = (value: CollectionContent) => {
  switch (value.__typename) {
    case 'CollectionTweet':
      return <TwitterCards data={value} />;
    case 'CollectionArticle':
      return <NewsCards data={value} />;
    case 'CollectionVeraFile':
      return <VeraFilesCards data={value} />;
    case 'CollectionGoogleFactCheck':
      return <GoogleFactCheckCards data={value} />;
    default:
      return <div />;
  }
};

const CollectionContents: React.FC<CollectionContentsDataProps> = ({
  data,
}: CollectionContentsDataProps) => (
  <div>
    {data?.collectionContents?.flatMap((value) => (
      <div>{getCollectionContentType(value as CollectionContent)}</div>
    ))}
  </div>
);

export default CollectionContents;
