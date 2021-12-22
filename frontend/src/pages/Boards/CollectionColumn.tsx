import React from 'react';
import { CollectionContentsQuery } from '../../components/Columns/query.generated';
import CollectionTweets from './CollectionTweetsData';
import NewsCards from '../../components/Cards/NewsCards';
import VeraFilesCards from '../../components/Cards/VeraFilesCards';
import GoogleFactCheckCards from '../../components/Cards/GoogleFactCheckCards';
import TwitterCards from '../../components/Cards/TwitterCards';

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
