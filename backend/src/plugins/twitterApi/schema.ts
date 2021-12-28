import { gql } from 'graphile-utils';
export const tweet = gql`
  type Tweet {
    tweetId: String
    authorId: String
    publishedAt: String
    text: String
    name: String
    profileImageUrl: String
    username: String
    verified: Boolean
    photos: [TwitterPhoto]
    suggestedKeywords: [String]
  }
`;
export const twitterPhoto = gql`
  type TwitterPhoto {
    mediaKey: String
    type: String
    url: String
  }
`;
export const typeDefs = gql`
  ${tweet}
  ${twitterPhoto}
  extend type Query {
    searchTweets(keyword: String, sources: String): [Tweet!]!
    searchAllTweets(
      keyword: [String!]!
      sources: [String]
      fromDate: String
      toDate: String
    ): [Tweet!]!
    tweetLookup(id: String!): Tweet!
  }
`;

export default typeDefs;
