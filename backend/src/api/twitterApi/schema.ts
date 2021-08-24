import { gql } from 'graphile-utils';
export const tweet = gql`
  type Tweet {
    id: String
    text: String
  }
`;
export const typeDefs = gql`
  ${tweet}
  extend type Query {
    searchTweets(query: String): [Tweet!]!
  }
`;

export default typeDefs;
