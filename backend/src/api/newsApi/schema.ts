import { gql } from 'graphile-utils';

export const article = gql`
  type Article {
    source: Source
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }
`;

export const source = gql`
  type Source {
    id: String
    name: String
  }
`;

export const typeDefs = gql`
  ${article}
  ${source}
  extend type Query {
    topHeadlines(
      country: String = "ph"
      sources: String
      category: String
      keyword: String
    ): [Article!]!
  }
`;

export default typeDefs;