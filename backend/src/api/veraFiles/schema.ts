import { gql } from 'graphile-utils';

export const veraFiles = gql`
  type VeraFiles {
    id: Int
    author: String
    description: String
    title: String
    date: String
    dateText: String
    category: String
    url: String
    imageStyle: String
    imageUrl: String
  }
`;

export const typeDefs = gql`
  ${veraFiles}
  extend type Query {
    veraFilesFactCheck(keyword: String): [VeraFiles!]!
  }
`;

export default typeDefs;
