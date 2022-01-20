import { gql } from '@apollo/client';

export const VERA_FACTCHECK_SEARCH_QUERY = gql`
  query veraFactCheckSearchResult($keyword: String!) {
    veraFilesFactCheck(keyword: $keyword) {
      id
      author
      category
      dateText
      description
      title
      url
      imageUrl
      imageStyle
      date
    }
  }
`;
export const GOOGLE_FACTCHECK_SEARCH_QUERY = gql`
  query googleFactCheckSearchResult($keyword: String!) {
    googleFactCheckSearch(keyword: $keyword) {
      claimDate
      claimant
      languageCode
      publisherName
      publisherSite
      reviewDate
      text
      textualRating
      title
      url
    }
  }
`;
