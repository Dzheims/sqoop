import { gql } from 'graphile-utils';

export const columnResult = gql`
  union ColumnResult = NewsFeed | TwitterFeed | Collection
`;

export const collectionContent = gql`
  union CollectionContent =
      CollectionTweet
    | CollectionArticle
    | CollectionVeraFile
    | CollectionGoogleFactCheck
`;

export const typeDefs = gql`
  ${columnResult}
  ${collectionContent}
  extend type Query {
    getColumnResult: [ColumnResult!]!
    collectionContents(collectionId: Int!): [CollectionContent!]!
  }
`;

export default typeDefs;
