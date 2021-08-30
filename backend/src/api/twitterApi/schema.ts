import { gql } from 'graphile-utils';
export const tweet = gql`
  type Tweet {
    author_id: String
    created_at: String
    id: String
    text: String
    name: String
    profile_image_url: String
    username: String
  }
`;
export const typeDefs = gql`
  ${tweet}
  extend type Query {
    searchTweets(query: String): [Tweet!]!
  }
`;

export default typeDefs;
