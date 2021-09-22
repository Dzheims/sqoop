import { gql } from 'graphile-utils';

export const columnResult = gql`
  union ColumnResult = NewsFeed | TwitterFeed
`;

export const typeDefs = gql`
  ${columnResult}
  extend type Query {
    getColumnResult: [ColumnResult!]!
  }
`;

export default typeDefs;
