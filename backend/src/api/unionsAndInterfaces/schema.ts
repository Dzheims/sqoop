import { gql } from 'graphile-utils';

export const typeDefs = gql`
  extend type Query {
    getCustomNewsApiFeed(id: Int!): JSON
  }
`;

export default typeDefs;
