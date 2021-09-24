import { gql } from 'graphile-utils';
export const tweet = gql`
  type Tweet {
    author_id: String
    created_at: String
    text: String
    name: String
    profile_image_url: String
    username: String
    verified: Boolean
    photos: [TwitterPhoto]
  }
`;
export const twitterPhoto = gql`
  type TwitterPhoto {
    media_key: String
    type: String
    url: String
  }
`;
export const typeDefs = gql`
  ${tweet}
  ${twitterPhoto}
  extend type Query {
    searchTweets(keyword: [String], sources: [String]): [Tweet!]!
  }
`;

export default typeDefs;