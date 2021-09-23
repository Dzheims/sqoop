import { gql } from 'graphile-utils';

export const claim = gql`
  type Claim {
    text: String
    claimant: String
    claimDate: String
    claimReview: [ClaimReview]
  }
`;

export const claimReview = gql`
  type ClaimReview {
    publisher: Publisher
    url: String
    title: String
    reviewDate: String
    textualRating: String
    languageCode: String
  }
`;

export const publisher = gql`
  type Publisher {
    name: String
    site: String
  }
`;

export const typeDefs = gql`
  ${claim}
  ${claimReview}
  ${publisher}
  extend type Query {
    googleFactCheckSearch(keyword: String): [Claim!]!
  }
`;

export default typeDefs;
