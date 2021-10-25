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
    suggestedKeywords: [String]
  }
`;

export const source = gql`
  type Source {
    id: String!
    name: String!
    description: String
    url: String
    category: String
    language: String
    country: String
  }
`;
export const typeDefs = gql`
  ${article}
  ${source}
  extend type Query {
    topHeadlines(
      country: String = "ph"
      sources: String
      category: Category
      keyword: String
    ): [Article!]!
    topHeadlinesSources(country: String = "us", category: Category): [Source!]!
    searchArticles(
      keyword: String!
      sources: String
      from: String
      to: String
    ): [Article!]!
  }
`;

export default typeDefs;
