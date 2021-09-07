import { gql } from 'graphile-utils';

export const column = gql`
  interface Column {
    id: Int!
    title: String!
  }
`;

export const newsFeed = gql`
  type NewsApiFeed implements Column {
    id: Int!
    title: String!
    category: Category
    country: String
    keyword: String
    sources: String
  }
`;

export const twitterFeed = gql`
  type TwitterApiFeed implements Column {
    id: Int!
    title: String!
    keyword: String
    sources: String
  }
`;

export const typeDefs = gql`
  ${column}
  ${newsFeed}
  ${twitterFeed}
  extend type Query {
    getCustomNewsApiFeed(id: Int!): JSON
    getColumns: JSON
  }
`;

export default typeDefs;
