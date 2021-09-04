import { gql } from 'graphile-utils';

export const article = gql`
  type Article {
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
    sourceId: String
    sourceName: String
  }
`;

export const categories = gql`
  enum Categories {
    business
    entertainment
    general
    health
    science
    sports
    technology
  }
`;

export const typeDefs = gql`
  ${article}
  ${categories}
  extend type Query {
    topHeadlines(
      country: String = "ph"
      sources: String
      category: Categories
      keyword: String
    ): [Article!]!
  }
`;

export default typeDefs;
