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

export const typeDefs = gql`
  ${article}
  extend type Query {
    topHeadlines(
      country: String = "ph"
      sources: String
      category: Category
      keyword: String
    ): [Article!]!
  }
`;

export default typeDefs;
